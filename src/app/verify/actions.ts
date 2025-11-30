"use server";

import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const schema = z.object({
  sku: z
    .string()
    .transform((value) => value.trim().toUpperCase())
    .pipe(
      z.string().regex(/^SLV-\d{4}-\d{8}$/, {
        message: "Use SLV-YYYY-######## format.",
      }),
    ),
});

export type VerifyActionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | {
      status: "success";
      record: {
        sku: string;
        weight: number;
        purity: number;
        karat: number;
        created_at: string;
      };
    };

export async function verifySkuAction(
  _prevState: VerifyActionState,
  formData: FormData,
): Promise<VerifyActionState> {
  try {
    const parsed = schema.safeParse({
      sku: formData.get("sku")?.toString() ?? "",
    });

    if (!parsed.success) {
      return { status: "error", message: parsed.error.errors[0]?.message };
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("silver_bars")
      .select("sku, weight, purity, karat, created_at")
      .eq("sku", parsed.data.sku)
      .maybeSingle();

    if (error) {
      console.error("Supabase verify error", error);
      return { status: "error", message: "Lookup failed. Try again shortly." };
    }

    if (!data) {
      return { status: "error", message: "No bar registered with that SKU." };
    }

    return { status: "success", record: data };
  } catch (error) {
    console.error("Unexpected verify error", error);
    return { status: "error", message: "Unexpected error. Please retry." };
  }
}

