"use client";

import { useActionState } from "react";
import { registerBarAction, type AdminActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

const initialState: AdminActionState = { status: "idle" };

export function RegisterBarForm() {
  const [state, action, pending] = useActionState(
    registerBarAction,
    initialState,
  );

  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--charcoal)] p-10 text-[var(--light-silver)] shadow-sm">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--silver)]">
          Log inventory
        </p>
        <h2 className="text-3xl font-semibold">
          Register a new bar
        </h2>
        <p className="text-sm text-[var(--silver)]">
          SKU is generated automatically with SLV-YYYY-######## format.
        </p>
      </div>
      <form action={action} className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { name: "weight", label: "Weight (grams)" },
          { name: "purity", label: "Purity (‰)" },
          { name: "karat", label: "Karat" },
        ].map((field) => (
          <label key={field.name} className="text-sm text-[var(--silver)]">
            {field.label}
            <input
              required
              name={field.name}
              type="number"
              step="0.1"
              min="0"
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--dark-gray)] px-4 py-3 text-base text-[var(--light-silver)] focus:border-[var(--silver)] focus:outline-none focus:ring-2 focus:ring-[var(--silver)]/30"
            />
          </label>
        ))}
        <div className="md:col-span-3">
          <Button
            type="submit"
            className="w-full justify-center"
            disabled={pending}
          >
            {pending ? "Saving..." : "Generate SKU"}
          </Button>
        </div>
      </form>
      {state.status === "error" && (
        <p className="mt-4 text-sm text-rose-400">{state.message}</p>
      )}
      {state.status === "success" && (
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--dark-gray)] p-4 text-sm">
          Bar registered as{" "}
          <span className="font-mono text-base text-[var(--silver)]">
            {state.sku}
          </span>
          .
        </div>
      )}
    </div>
  );
}

