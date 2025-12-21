"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      variant="ghost"
      className="text-sm text-[var(--silver)] hover:text-[var(--light-silver)]"
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
}

