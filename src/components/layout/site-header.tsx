"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/button";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--border)] bg-[var(--charcoal)]/95 backdrop-blur">
      <div className="section-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight text-[var(--ink)]">
          <span className="text-[0.65rem] uppercase tracking-[0.4em] text-[var(--slate)]">
            IB
          </span>
          <span className="text-xl font-semibold">Gold & Silver Works</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/admin" 
            className={cn(
              "text-sm font-medium text-[var(--slate)] transition-colors hover:text-[var(--ink)]",
              pathname.startsWith("/admin") && "text-[var(--ink)]"
            )}
          >
            Admin
          </Link>
          <Link
            href="/verify"
            className={buttonStyles("secondary", "hidden md:inline-flex")}
          >
            Verify Bar
          </Link>
        </div>
      </div>
    </header>
  );
}
