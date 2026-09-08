import { supabase } from "./supabase";

export type Recenzija = {
  id: string;
  salon_id: string;
  klijent_ime: string;
  ocena: number;
  komentar: string | null;
  created_at: string;
};

export async function getRecenzije(salon_id: string): Promise<Recenzija[]> {
  const { data, error } = await supabase.from("recenzije").select("*").eq("salon_id", salon_id).order("created_at", { ascending: false });
  if (error) throw error;
  return data as Recenzija[];
}

export async function createRecenzija(payload: { salon_id: string; klijent_ime: string; ocena: number; komentar?: string | null }): Promise<Recenzija> {
  if (!payload.klijent_ime.trim()) throw new Error("Ime je obavezno.");
  if (payload.ocena < 1 || payload.ocena > 5) throw new Error("Ocena 1-5.");
  const { data, error } = await supabase
    .from("recenzije")
    .insert({ salon_id: payload.salon_id, klijent_ime: payload.klijent_ime.trim(), ocena: payload.ocena, komentar: payload.komentar?.trim() || null })
    .select()
    .single();
  if (error) throw error;
  return data as Recenzija;
}

export function prosecnaOcena(recenzije: Recenzija[]): { avg: number | null; count: number } {
  if (recenzije.length === 0) return { avg: null, count: 0 };
  const sum = recenzije.reduce((a, r) => a + r.ocena, 0);
  return { avg: Math.round((sum / recenzije.length) * 10) / 10, count: recenzije.length };
}
