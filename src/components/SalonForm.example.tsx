// Primer komponente za dodavanje salona sa upload-om slike
// Ovo je EXAMPLE — kopiraj/prilagodi u pravu admin stranicu kada zatreba.
// Koristi servis iz src/lib/salons.ts koji već komunicira sa Supabase tabelom + storage-om

import { useState } from "react";
import {
  SALON_KATEGORIJE,
  type SalonKategorija,
  createSalonWithImage,
} from "../lib/salons";
import { isSupabaseConfigured } from "../lib/supabase";

export default function SalonFormExample() {
  const [ime, setIme] = useState("");
  const [opis, setOpis] = useState("");
  const [kategorija, setKategorija] = useState<SalonKategorija>("Frizerski salon");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  const onFileChange = (f: File | null) => {
    setFile(f);
    if (f) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ime.trim()) {
      setMsg("Ime je obavezno.");
      return;
    }
    if (!configured) {
      setMsg("Supabase nije konfigurisan — proveri .env (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).");
      return;
    }
    setLoading(true);
    setMsg(null);
    try {
      const salon = await createSalonWithImage(
        { ime: ime.trim(), opis: opis.trim() || null, kategorija },
        file
      );
      setMsg(`Sačuvano: ${salon.ime} (${salon.kategorija})`);
      setIme("");
      setOpis("");
      setFile(null);
      setPreview(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMsg(`Greška: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-lg mx-auto space-y-4 p-6 border rounded-xl bg-white shadow-sm"
    >
      <h2 className="text-xl font-semibold">Dodaj salon (Supabase primer)</h2>

      {!configured && (
        <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded">
          Supabase nije konfigurisan. Dodaj <code>.env</code> sa <code>VITE_SUPABASE_URL</code> i{" "}
          <code>VITE_SUPABASE_ANON_KEY</code>. Vidi <code>supabase/README.md</code>.
        </p>
      )}

      <label className="block space-y-1">
        <span className="text-sm font-medium">Ime *</span>
        <input
          value={ime}
          onChange={(e) => setIme(e.target.value)}
          placeholder="npr. Elite Hair Studio"
          className="w-full border rounded px-3 py-2"
          maxLength={120}
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium">Kategorija *</span>
        <select
          value={kategorija}
          onChange={(e) => setKategorija(e.target.value as SalonKategorija)}
          className="w-full border rounded px-3 py-2"
        >
          {SALON_KATEGORIJE.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium">Opis</span>
        <textarea
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          placeholder="Kratak opis salona..."
          rows={3}
          maxLength={1000}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium">Slika (storage: salon-images)</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          className="w-full"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 h-40 w-full object-cover rounded border"
          />
        )}
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white rounded py-2 font-medium disabled:opacity-50"
      >
        {loading ? "Čuvanje..." : "Sačuvaj salon"}
      </button>

      {msg && <p className="text-sm text-center p-2 bg-gray-50 rounded">{msg}</p>}
    </form>
  );
}
