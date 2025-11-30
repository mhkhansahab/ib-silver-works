"use client";

import { useActionState } from "react";
import { verifySkuAction, type VerifyActionState } from "@/app/verify/actions";
import { Button } from "@/components/ui/button";

const initialState: VerifyActionState = { status: "idle" };

export function VerifyForm() {
  const [state, action, pending] = useActionState(
    verifySkuAction,
    initialState,
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-xl shadow-[var(--ink)]/5">
      <div className="bg-[var(--sand)]/30 px-8 py-10 text-center">
        <h1 className="text-2xl font-medium text-[var(--ink)]">
          Verify Bar
        </h1>
        <p className="mt-2 text-[var(--slate)]">
          Enter the serial number found on your silver bar to confirm its origin and details.
        </p>
      </div>

      <div className="p-8">
        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ink)]">
              Serial Number
            </label>
            <input
              required
              name="sku"
              placeholder="e.g., SLV-2025-12345678"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--sand)]/20 px-4 py-3 font-mono text-lg uppercase tracking-wider text-[var(--ink)] placeholder:text-[var(--slate)]/40 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/10"
              autoComplete="off"
            />
          </div>
          <Button
            type="submit"
            className="h-12 w-full rounded-xl text-base font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            disabled={pending}
          >
            {pending ? "Checking..." : "Verify Now"}
          </Button>
        </form>

        <div className="mt-8">
          {state.status === "error" && (
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-center text-sm text-rose-600">
              {state.message}
            </div>
          )}

          {state.status === "success" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="mb-6 flex items-center justify-center gap-2 text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Verified Authentic</span>
              </div>

              <dl className="grid gap-3 text-sm">
                <div className="flex justify-between rounded-lg bg-[var(--sand)]/20 px-4 py-3">
                  <dt className="text-[var(--slate)]">Serial Number</dt>
                  <dd className="font-mono font-medium text-[var(--ink)]">
                    {state.record.sku}
                  </dd>
                </div>
                <div className="flex justify-between rounded-lg bg-[var(--sand)]/20 px-4 py-3">
                  <dt className="text-[var(--slate)]">Weight</dt>
                  <dd className="font-medium text-[var(--ink)]">
                    {state.record.weight} g
                  </dd>
                </div>
                <div className="flex justify-between rounded-lg bg-[var(--sand)]/20 px-4 py-3">
                  <dt className="text-[var(--slate)]">Purity</dt>
                  <dd className="font-medium text-[var(--ink)]">
                    {state.record.purity / 10}%
                  </dd>
                </div>
                <div className="flex justify-between rounded-lg bg-[var(--sand)]/20 px-4 py-3">
                  <dt className="text-[var(--slate)]">Registration Date</dt>
                  <dd className="font-medium text-[var(--ink)]">
                    {new Date(state.record.created_at).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
