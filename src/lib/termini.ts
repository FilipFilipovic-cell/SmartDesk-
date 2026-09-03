// Servis za automatsko zakazivanje termina
import { supabase } from "./supabase";

export type Termin = {
  id: string;
  salon_id: string;
  klijent_ime: string;
  klijent_telefon: string | null;
  usluga: string;
  pocetak: string;
  kraj: string;
  status: "zakazan" | "potvrdjen" | "otkazan" | "zavrsen";
  izvor: "ai" | "rucno";
  napomena: string | null;
  created_at: string;
};

export type TerminInsert = {
  salon_id: string;
  klijent_ime: string;
  klijent_telefon?: string | null;
  usluga: string;
  pocetak: string; // ISO
  kraj: string; // ISO
  napomena?: string | null;
};

// AI automatski kreira termin — public insert (RLS dozvoljava public)
export async function createTerminAI(payload: TerminInsert): Promise<Termin> {
  // Provera preklapanja pre upisa (AI logika)
  const { data: existing } = await supabase
    .from("termini")
    .select("pocetak,kraj")
    .eq("salon_id", payload.salon_id)
    .in("status", ["zakazan", "potvrdjen"]);

  const newStart = new Date(payload.pocetak).getTime();
  const newEnd = new Date(payload.kraj).getTime();
  if (existing) {
    for (const t of existing as { pocetak: string; kraj: string }[]) {
      const s = new Date(t.pocetak).getTime();
      const e = new Date(t.kraj).getTime();
      if (newStart < e && newEnd > s) {
        throw new Error("Termin se preklapa sa postojećim. AI predlaže drugi slot.");
      }
    }
  }

  const { data, error } = await supabase
    .from("termini")
    .insert({ ...payload, status: "zakazan", izvor: "ai" } as unknown as Record<string, unknown>)
    .select()
    .single();
  if (error) throw error;
  return data as Termin;
}

export async function getTerminiForSalon(salon_id: string): Promise<Termin[]> {
  const { data, error } = await supabase
    .from("termini")
    .select("*")
    .eq("salon_id", salon_id)
    .order("pocetak", { ascending: true });
  if (error) throw error;
  return data as Termin[];
}

export async function getMyTermini(): Promise<Termin[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];
  // prvo uzmi moje salone
  const { data: saloni } = await supabase.from("salons").select("id").eq("owner_id", user.id);
  if (!saloni || saloni.length === 0) return [];
  const ids = (saloni as { id: string }[]).map((s) => s.id);
  const { data, error } = await supabase.from("termini").select("*").in("salon_id", ids).order("pocetak", { ascending: true });
  if (error) throw error;
  return data as Termin[];
}

export async function updateTerminStatus(id: string, status: Termin["status"]): Promise<Termin> {
  const { data, error } = await supabase.from("termini").update({ status }).eq("id", id).select().single();
  if (error) throw error;
  return data as Termin;
}

export async function deleteTermin(id: string): Promise<void> {
  const { error } = await supabase.from("termini").delete().eq("id", id);
  if (error) throw error;
}

// Helper: AI predlaže sledeća 2 slobodna slot-a (naivno: svaki dan 09-17, 30min)
export async function predloziSlobodne(salon_id: string, datumISO: string): Promise<{ pocetak: string; kraj: string }[]> {
  const dan = new Date(datumISO);
  dan.setHours(9, 0, 0, 0);
  const slotovi: { pocetak: string; kraj: string }[] = [];
  for (let h = 9; h < 17; h++) {
    for (const m of [0, 30]) {
      const p = new Date(dan);
      p.setHours(h, m, 0, 0);
      const k = new Date(p.getTime() + 30 * 60000);
      slotovi.push({ pocetak: p.toISOString(), kraj: k.toISOString() });
    }
  }
  const { data: zauzeti } = await supabase.from("termini").select("pocetak,kraj").eq("salon_id", salon_id).in("status", ["zakazan", "potvrdjen"]);
  const zauzetiSet = new Set((zauzeti as { pocetak: string }[] | null)?.map((t) => new Date(t.pocetak).getTime()) ?? []);
  return slotovi.filter((s) => !zauzetiSet.has(new Date(s.pocetak).getTime())).slice(0, 2);
}
