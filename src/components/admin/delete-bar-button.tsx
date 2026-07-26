"use client";

import { useTransition } from "react";
import { deleteBarAction } from "@/app/admin/actions";
import { Trash2 } from "lucide-react";

export function DeleteBarButton({ sku }: { sku: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm(`Are you sure you want to delete ${sku}?`)) {
          startTransition(async () => {
            await deleteBarAction(sku);
          });
        }
      }}
      disabled={isPending}
      className="rounded p-2 text-[var(--silver)] transition-colors hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-50"
      title="Delete bar"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
