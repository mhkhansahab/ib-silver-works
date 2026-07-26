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
  weight_unit: z
    .enum(["grams", "tola"])
    .default("grams"),
  purity: z
    .string()
    .transform((value) => Number(value))
    .refine(
      (value) => value >= 500 && value <= 999.9,
      "Purity must be between 500 and 999.9‰",
    ),
  quantity: z
    .string()
    .transform((value) => Number(value) || 1)
    .refine(
      (value) => value >= 1 && value <= 500,
      "Quantity must be between 1 and 500.",
    ),
});

export type AdminActionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

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
    weight_unit: formData.get("weight_unit") || "grams",
    purity: formData.get("purity"),
    quantity: formData.get("quantity"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  // Convert to grams if the system is tola. (1 Tola = 11.6638 grams)
  const weightInGrams =
    parsed.data.weight_unit === "tola"
      ? Number((parsed.data.weight * 11.6638).toFixed(3))
      : Number(parsed.data.weight.toFixed(3));

  try {
    const supabase = getSupabaseAdmin();
    const currentYear = new Date().getFullYear();

    const { data: latestSequenceData, error: sequenceError } = await supabase
      .from("silver_bars")
      .select("sequence")
      .order("sequence", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (sequenceError) {
      throw new Error(sequenceError.message);
    }

    const startSequence = latestSequenceData?.sequence ? latestSequenceData.sequence + 1 : 7860001;
    const recordsToInsert = [];

    for (let i = 0; i < parsed.data.quantity; i++) {
      const nextSequence = startSequence + i;
      recordsToInsert.push({
        sku: `IB-${nextSequence}`,
        weight: weightInGrams,
        purity: parsed.data.purity,
        karat: 24,
        year: currentYear,
        sequence: nextSequence,
      });
    }

    const { error } = await supabase.from("silver_bars").insert(recordsToInsert);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin");

    const successMessage =
      parsed.data.quantity === 1
        ? `Bar registered as IB-${startSequence}.`
        : `Successfully registered ${parsed.data.quantity} bars (IB-${startSequence} to IB-${startSequence + parsed.data.quantity - 1}).`;

    return { status: "success", message: successMessage };
  } catch (error) {
    console.error("Admin action failed", error);
    return { status: "error", message: "Failed to register bar(s)." };
  }
}

export async function deleteBarAction(sku: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("silver_bars")
      .delete()
      .eq("sku", sku);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin");
  } catch (error) {
    console.error("Failed to delete bar", error);
    throw new Error("Failed to delete bar");
  }
}
