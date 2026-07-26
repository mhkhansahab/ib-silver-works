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
          Register new bars
        </h2>
        <p className="text-sm text-[var(--silver)]">
          SKUs are generated automatically with IB-####### format.
        </p>
      </div>
      <form action={action} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Weight Field with Unit Selection */}
        <label className="text-sm text-[var(--silver)] lg:col-span-1">
          Weight
          <div className="mt-2 flex">
            <input
              required
              name="weight"
              type="number"
              step="0.001"
              min="0"
              className="w-full min-w-0 flex-1 rounded-l-2xl border-y border-l border-[var(--border)] bg-[var(--dark-gray)] px-4 py-3 text-base text-[var(--light-silver)] focus:border-[var(--silver)] focus:outline-none focus:ring-2 focus:ring-[var(--silver)]/30"
            />
            <select
              name="weight_unit"
              className="shrink-0 rounded-r-2xl border border-[var(--border)] bg-[var(--dark-gray)] px-4 py-3 text-base text-[var(--light-silver)] focus:border-[var(--silver)] focus:outline-none focus:ring-2 focus:ring-[var(--silver)]/30"
            >
              <option value="grams">Grams</option>
              <option value="tola">Tola</option>
            </select>
          </div>
        </label>

        {[
          { name: "purity", label: "Purity (‰)", type: "number", step: "0.1", min: "0" },
          { name: "quantity", label: "Quantity", type: "number", step: "1", min: "1", defaultValue: "1" },
        ].map((field) => (
          <label key={field.name} className="text-sm text-[var(--silver)] lg:col-span-1">
            {field.label}
            <input
              required
              name={field.name}
              type={field.type}
              step={field.step}
              min={field.min}
              defaultValue={field.defaultValue}
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--dark-gray)] px-4 py-3 text-base text-[var(--light-silver)] focus:border-[var(--silver)] focus:outline-none focus:ring-2 focus:ring-[var(--silver)]/30"
            />
          </label>
        ))}
        <div className="md:col-span-2 lg:col-span-2">
          <Button
            type="submit"
            className="w-full justify-center"
            disabled={pending}
          >
            {pending ? "Saving..." : "Generate SKUs"}
          </Button>
        </div>
      </form>
      {state.status === "error" && (
        <p className="mt-4 text-sm text-rose-400">{state.message}</p>
      )}
      {state.status === "success" && (
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--dark-gray)] p-4 text-sm">
          <span className="font-mono text-base text-[var(--silver)]">
            {state.message}
          </span>
        </div>
      )}
    </div>
  );
}
