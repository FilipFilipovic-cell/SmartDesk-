// Tipovi i servis za tabelu `salons`
// Kolone: id, ime, slika, opis, kategorija, grad, created_at, updated_at

import { supabase } from "./supabase";

export type SalonKategorija =
  | "Frizerski salon"
  | "Berbernica"
  | "Salon za nokte"
  | "Salon lepote"
  | "Spa centar"
  | "Ostalo";

export const SALON_KATEGORIJE: SalonKategorija[] = [
  "Frizerski salon",
  "Berbernica",
  "Salon za nokte",
  "Salon lepote",
  "Spa centar",
  "Ostalo",
];

export type Salon = {
  id: string;
  ime: string;
  slika: string | null; // public URL iz storage-a
  opis: string | null;
  kategorija: SalonKategorija;
  grad: string | null;
  radno_vreme: string | null;
  owner_id: string | null;
  created_at: string;
  updated_at: string;
};

export type SalonInsert = {
  ime: string;
  slika?: string | null;
  opis?: string | null;
  kategorija: SalonKategorija;
  grad?: string | null;
  radno_vreme?: string | null;
};

export type SalonUpdate = Partial<SalonInsert>;

// Naziv bucket-a za slike salona
export const SALON_IMAGES_BUCKET = "salon-images";

// ----- CRUD -----

export async function getSalons(): Promise<Salon[]> {
  const { data, error } = await supabase
    .from("salons")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Salon[];
}

export async function getMySalons(): Promise<Salon[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("salons")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Salon[];
}

export async function getSalonById(id: string): Promise<Salon | null> {
  const { data, error } = await supabase
    .from("salons")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as Salon;
}

export async function createSalon(payload: SalonInsert): Promise<Salon> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Morate biti prijavljeni kao vlasnik.");
  const { data, error } = await supabase
    .from("salons")
    .insert({ ...payload, owner_id: user.id } as unknown as Record<string, unknown>)
    .select()
    .single();
  if (error) throw error;
  return data as Salon;
}

export async function updateSalon(
  id: string,
  payload: SalonUpdate
): Promise<Salon> {
  const { data, error } = await supabase
    .from("salons")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Salon;
}

export async function deleteSalon(id: string): Promise<void> {
  const { error } = await supabase.from("salons").delete().eq("id", id);
  if (error) throw error;
}

// ----- Storage (upload slike) -----

/**
 * Uploaduje fajl u bucket `salon-images` i vraća public URL.
 * Fajl se čuva kao: <salonId | random>/<filename>
 * Za public bucket, URL je odmah dostupan.
 */
export async function uploadSalonImage(
  file: File,
  prefix?: string
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;
  const path = prefix ? `${prefix}/${fileName}` : fileName;

  const { error: uploadError } = await supabase.storage
    .from(SALON_IMAGES_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from(SALON_IMAGES_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * Briše fajl iz storage-a na osnovu public URL-a.
 * Ako URL nije iz našeg bucket-a, ignoriše.
 */
export async function deleteSalonImageByUrl(publicUrl: string): Promise<void> {
  try {
    const marker = `/${SALON_IMAGES_BUCKET}/`;
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return;
    const path = publicUrl.slice(idx + marker.length).split("?")[0];
    if (!path) return;
    const { error } = await supabase.storage
      .from(SALON_IMAGES_BUCKET)
      .remove([path]);
    if (error) throw error;
  } catch (e) {
    console.warn("[Supabase] deleteSalonImageByUrl failed:", e);
  }
}

/**
 * Helper: upload + kreiranje salona u jednom koraku
 */
export async function createSalonWithImage(
  payload: Omit<SalonInsert, "slika">,
  imageFile: File | null
): Promise<Salon> {
  let slika: string | null = null;
  if (imageFile) {
    slika = await uploadSalonImage(imageFile, "salons");
  }
  return createSalon({ ...payload, slika });
}

/**
 * Helper: upload nove slike + update salona
 * Ako postoji stara slika, briše je iz storage-a (best-effort).
 */
export async function updateSalonWithImage(
  id: string,
  payload: SalonUpdate,
  newImageFile: File | null,
  oldImageUrl: string | null
): Promise<Salon> {
  let slika = payload.slika;
  if (newImageFile) {
    const newUrl = await uploadSalonImage(newImageFile, `salons/${id}`);
    slika = newUrl;
    if (oldImageUrl) {
      await deleteSalonImageByUrl(oldImageUrl);
    }
  }
  return updateSalon(id, { ...payload, slika: slika ?? payload.slika });
}
