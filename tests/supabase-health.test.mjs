import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { createClient } from "@supabase/supabase-js";

const source = readFileSync(new URL("../src/app/api/cron/supabase-health/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function setup({ secret = "test-secret", mode = "success" } = {}) {
  const requests = [];
  const logs = [];
  let clients = 0;
  const exports = {};
  const client = createClient("https://example.supabase.co", "fake-service-key", {
    auth: { persistSession: false },
    global: {
      fetch: async (url, options) => {
        requests.push(String(url));
        if (mode === "timeout") {
          return new Promise((resolve, reject) => {
            options.signal.addEventListener("abort", () => reject(options.signal.reason), { once: true });
          });
        }
        if (mode === "error") {
          return new Response(JSON.stringify({ message: "private database detail" }), { status: 500 });
        }
        return new Response(JSON.stringify(mode === "empty" ? [] : [{ id: "private-record" }]), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  });
  vm.runInNewContext(compiled, {
    exports,
    require: () => ({ getSupabaseAdmin: () => {
      clients++;
      if (mode === "missing-config") throw new Error("private configuration detail");
      return client;
    } }),
    process: { env: { CRON_SECRET: secret } },
    Response,
    Date,
    AbortSignal: { timeout: (ms) => {
      assert.equal(ms, 10_000);
      const controller = new AbortController();
      if (mode === "timeout") setTimeout(() => controller.abort(), 5);
      return controller.signal;
    } },
    console: { info: (...args) => logs.push(args) },
  });
  return { exports, requests, logs, clients: () => clients };
}

const request = (token = "test-secret") => new Request("http://localhost/api/cron/supabase-health", {
  headers: token === null ? {} : { authorization: `Bearer ${token}` },
});

test("rejects missing secrets and invalid authorization before database access", async () => {
  for (const [secret, token] of [["", "undefined"], ["test-secret", null], ["test-secret", "wrong"]]) {
    const app = setup({ secret });
    assert.equal((await app.exports.GET(request(token))).status, 401);
    assert.equal(app.clients(), 0);
    assert.equal(app.requests.length, 0);
  }
});

for (const mode of ["success", "empty", "error", "timeout", "missing-config"]) {
  test(`handles ${mode} without disclosing data`, async () => {
    const app = setup({ mode });
    const response = await app.exports.GET(request());
    const ok = mode === "success" || mode === "empty";
    assert.equal(response.status, ok ? 200 : 503);
    assert.deepEqual(await response.json(), { ok });
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.doesNotMatch(JSON.stringify(app.logs), /private|fake-service-key|test-secret/);
    if (mode !== "missing-config") {
      const url = new URL(app.requests[0]);
      assert.equal(url.pathname, "/rest/v1/silver_bars");
      assert.equal(url.searchParams.get("select"), "id");
      assert.equal(url.searchParams.get("limit"), "1");
    }
  });
}

test("each authorized call queries Supabase and route disables caching", async () => {
  const app = setup();
  await app.exports.GET(request());
  await app.exports.GET(request());
  assert.equal(app.requests.length, 2);
  assert.equal(app.exports.dynamic, "force-dynamic");
  assert.equal(app.exports.fetchCache, "force-no-store");
});
