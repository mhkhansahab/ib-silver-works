"use server";

import { z } from "zod";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth/options";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const formSchema = z.object({
  weight: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => value > 0, "Weight must be greater than zero."),
  purity: z
    .string()
    .transform((value) => Number(value))
    .refine(
      (value) => value >= 500 && value <= 999.9,
      "Purity must be between 500 and 999.9‰",
    ),
  karat: z
    .string()
    .transform((value) => Number(value))
    .refine(
      (value) => value >= 1 && value <= 24,
      "Karat must be between 1 and 24.",
    ),
});

export type AdminActionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; sku: string };

export async function registerBarAction(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return { status: "error", message: "Unauthorized." };
  }

  const parsed = formSchema.safeParse({
    weight: formData.get("weight"),
    purity: formData.get("purity"),
    karat: formData.get("karat"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  try {
    const supabase = getSupabaseAdmin();
    const currentYear = new Date().getFullYear();

    const { data: latestSequenceData, error: sequenceError } = await supabase
      .from("silver_bars")
      .select("sequence")
      .eq("year", currentYear)
      .order("sequence", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (sequenceError) {
      throw new Error(sequenceError.message);
    }

    const nextSequence = (latestSequenceData?.sequence ?? 0) + 1;
    const sku = `SLV-${currentYear}-${nextSequence
      .toString()
      .padStart(8, "0")}`;

    const { error } = await supabase.from("silver_bars").insert({
      sku,
      weight: parsed.data.weight,
      purity: parsed.data.purity,
      karat: parsed.data.karat,
      year: currentYear,
      sequence: nextSequence,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin");
    return { status: "success", sku };
  } catch (error) {
    console.error("Admin action failed", error);
    return { status: "error", message: "Failed to register bar." };
  }
}

