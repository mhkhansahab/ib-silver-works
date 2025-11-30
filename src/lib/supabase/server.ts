import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    "Supabase environment variables are missing. Certain features will fail until they are provided.",
  );
}

export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase credentials are not configured.");
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

