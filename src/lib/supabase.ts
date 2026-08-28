import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
// Podržava i novi `sb_publishable_...` i stari JWT `anon` ključ
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] VITE_SUPABASE_URL ili VITE_SUPABASE_ANON_KEY / VITE_SUPABASE_PUBLISHABLE_KEY nisu postavljeni. " +
      "Pogledaj .env.example i supabase/README.md za uputstvo."
  );
}

// Kreira Supabase klijent. Ako env varijable fale, koristi placeholder
// da app ne puca na import-u — pravi error će se videti tek pri pozivu.
export const supabase = createClient(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseAnonKey ?? "placeholder-anon-key"
);

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
