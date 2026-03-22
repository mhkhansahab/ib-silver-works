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
    <div className="overflow-hidden rounded-4xl border border-gold/20 bg-[#120f0b] shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
      <div className="border-b border-gold/10 bg-linear-to-b from-[#1b1510] to-[#120f0b] px-8 py-10 text-center md:px-10">
        <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-gold/65">
          Serial Verification
        </p>
        <h2 className="mt-3 font-display text-3xl font-light text-cream md:text-4xl">
          Verify Bar
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-pewter md:text-base">
          Enter the serial number engraved on your bar to confirm its recorded
          details.
        </p>
      </div>

      <div className="p-8 md:p-10">
        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <label className="font-sans text-[10px] uppercase tracking-[0.22em] text-gold/65">
              Serial Number
            </label>
            <input
              required
              name="sku"
              placeholder="e.g., SLV-2025-12345678"
              className="w-full rounded-2xl border border-gold/15 bg-[#1a1410] px-5 py-4 font-mono text-base uppercase tracking-[0.18em] text-cream placeholder:text-pewter/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15 md:text-lg"
              autoComplete="off"
            />
          </div>
          <Button
            type="submit"
            variant="gold"
            className="h-13 w-full rounded-2xl text-sm font-medium tracking-[0.18em] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
            disabled={pending}
          >
            {pending ? "Checking..." : "Verify Now"}
          </Button>
        </form>

        <div className="mt-8">
          {state.status === "error" && (
            <div className="rounded-2xl border border-rose-500/25 bg-rose-500/8 p-4 text-center text-sm text-rose-300">
              {state.message}
            </div>
          )}

          {state.status === "success" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="mb-6 flex items-center justify-center gap-2 text-gold">
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
                <span className="font-sans text-sm font-medium uppercase tracking-[0.18em]">
                  Verified Authentic
                </span>
              </div>

              <dl className="grid gap-3 text-sm">
                <div className="flex justify-between rounded-2xl border border-gold/10 bg-[#17120d] px-4 py-4">
                  <dt className="text-pewter">Serial Number</dt>
                  <dd className="font-mono font-medium text-cream">
                    {state.record.sku}
                  </dd>
                </div>
                <div className="flex justify-between rounded-2xl border border-gold/10 bg-[#17120d] px-4 py-4">
                  <dt className="text-pewter">Weight</dt>
                  <dd className="font-medium text-cream">
                    {state.record.weight} g
                  </dd>
                </div>
                <div className="flex justify-between rounded-2xl border border-gold/10 bg-[#17120d] px-4 py-4">
                  <dt className="text-pewter">Purity</dt>
                  <dd className="font-medium text-cream">
                    {state.record.purity / 10}%
                  </dd>
                </div>
                <div className="flex justify-between rounded-2xl border border-gold/10 bg-[#17120d] px-4 py-4">
                  <dt className="text-pewter">Registration Date</dt>
                  <dd className="font-medium text-cream">
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
