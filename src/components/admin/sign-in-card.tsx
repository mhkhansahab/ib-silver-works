"use client";

import { signIn } from "next-auth/react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignInCard() {
  return (
    <div className="mx-auto max-w-md rounded-[28px] border border-[var(--border)] bg-[var(--charcoal)] p-10 text-[var(--light-silver)] shadow-sm">
      <ShieldCheck className="h-10 w-10 text-[var(--silver)]" />
      <h1 className="mt-6 text-3xl font-semibold">Admin console</h1>
      <p className="mt-2 text-[var(--silver)]">
        Sign in with a Google account that has been allowlisted to register new
        silver bars.
      </p>
      <Button
        className="mt-8 w-full justify-center"
        onClick={() => signIn("google")}
      >
        Continue with Google
      </Button>
    </div>
  );
}

