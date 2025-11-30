"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase browser credentials are missing. Client helpers will fail until NEXT_PUBLIC_SUPABASE_* env vars are set.",
  );
}

export function getSupabaseBrowser() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase browser credentials are not configured.");
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      detectSessionInUrl: true,
      persistSession: true,
    },
  });
}

