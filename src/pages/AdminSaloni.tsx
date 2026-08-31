import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSalons } from "../hooks/useSalons";
import {
  SALON_KATEGORIJE,
  type Salon,
  type SalonKategorija,
  createSalonWithImage,
  updateSalonWithImage,
  deleteSalon,
  deleteSalonImageByUrl,
} from "../lib/salons";
import { isSupabaseConfigured } from "../lib/supabase";
import { ArrowLeft, Trash2, Pencil, Plus, X, ImageOff, Loader2 } from "lucide-react";

type FormState = {
  ime: string;
  opis: string;
  kategorija: SalonKategorija;
  file: File | null;
  preview: string | null;
};

const emptyForm: FormState = {
  ime: "",
  opis: "",
  kategorija: "Frizerski salon",
  file: null,
  preview: null,
};

export default function AdminSaloni() {
  const { salons, loading, error, refresh } = useSalons();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editing, setEditing] = useState<Salon | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (form.preview) URL.revokeObjectURL(form.preview);
    };
  }, [form.preview]);

  const onFile = (f: File | null) => {
    if (form.preview) URL.revokeObjectURL(form.preview);
    if (!f) {
      setForm((v) => ({ ...v, file: null, preview: null }));
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setMsg("Slika je prevelika (max 5MB).");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(f.type)) {
      setMsg("Dozvoljeni formati: jpg, png, webp, avif.");
      return;
    }
    setForm((v) => ({ ...v, file: f, preview: URL.createObjectURL(f) }));
  };

  const startEdit = (s: Salon) => {
    setEditing(s);
    setForm({
      ime: s.ime,
      opis: s.opis ?? "",
      kategorija: s.kategorija,
      file: null,
      preview: s.slika,
    });
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    if (form.preview && editing?.slika !== form.preview) URL.revokeObjectURL(form.preview);
    setEditing(null);
    setForm(emptyForm);
    setMsg(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ime.trim()) {
      setMsg("Ime je obavezno (2-120 karaktera).");
      return;
    }
    if (!configured) {
      setMsg("Supabase nije konfigurisan.");
      return;
    }
    setSubmitting(true);
    setMsg(null);
    try {
      if (editing) {
        await updateSalonWithImage(
          editing.id,
          { ime: form.ime.trim(), opis: form.opis.trim() || null, kategorija: form.kategorija },
          form.file,
          editing.slika
        );
        setMsg(`Izmenjeno: ${form.ime}`);
      } else {
        await createSalonWithImage(
          { ime: form.ime.trim(), opis: form.opis.trim() || null, kategorija: form.kategorija },
          form.file
        );
        setMsg(`Dodato: ${form.ime}`);
      }
      setEditing(null);
      setForm(emptyForm);
      await refresh();
    } catch (err: unknown) {
      setMsg(`Greška: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (s: Salon) => {
    if (!confirm(`Obriši salon "${s.ime}"?`)) return;
    setDeleteId(s.id);
    try {
      await deleteSalon(s.id);
      if (s.slika) await deleteSalonImageByUrl(s.slika);
      setMsg(`Obrisano: ${s.ime}`);
      await refresh();
    } catch (err: unknown) {
      setMsg(`Greška pri brisanju: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="bg-[--bg] min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            to="/saloni"
            className="inline-flex items-center gap-2 text-sm text-[--text-muted] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Nazad na salone
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Forma */}
            <div className="lg:w-[420px] shrink-0">
              <div className="bg-[--surface] border border-[--border] rounded-2xl p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold flex items-center gap-2">
                  {editing ? <Pencil size={18} /> : <Plus size={18} />}
                  {editing ? "Izmeni salon" : "Dodaj salon"}
                </h2>
                <p className="text-sm text-[--text-muted] mt-1">
                  Polja: <span className="text-white">ime*</span>, slika (storage), opis, kategorija*
                </p>

                {!configured && (
                  <div className="mt-4 text-sm text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                    Supabase nije konfigurisan.
                  </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4 mt-5">
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium">Ime *</span>
                    <input
                      value={form.ime}
                      onChange={(e) => setForm((v) => ({ ...v, ime: e.target.value }))}
                      placeholder="npr. Elite Hair Studio"
                      maxLength={120}
                      className="w-full bg-[#0e1120] border border-[--border] rounded-xl px-3 py-2.5 text-sm placeholder:text-[--text-faint] focus:outline-none focus:border-[--accent]"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium">Kategorija *</span>
                    <select
                      value={form.kategorija}
                      onChange={(e) => setForm((v) => ({ ...v, kategorija: e.target.value as SalonKategorija }))}
                      className="w-full bg-[#0e1120] border border-[--border] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[--accent]"
                    >
                      {SALON_KATEGORIJE.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium">Opis</span>
                    <textarea
                      value={form.opis}
                      onChange={(e) => setForm((v) => ({ ...v, opis: e.target.value }))}
                      placeholder="Kratak opis salona..."
                      rows={3}
                      maxLength={1000}
                      className="w-full bg-[#0e1120] border border-[--border] rounded-xl px-3 py-2.5 text-sm placeholder:text-[--text-faint] focus:outline-none focus:border-[--accent] resize-none"
                    />
                    <span className="text-xs text-[--text-faint]">{form.opis.length}/1000</span>
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium">Slika (storage: salon-images, max 5MB)</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                      className="w-full text-sm file:mr-3 file:bg-white file:text-[#0b0d16] file:border-0 file:rounded-full file:px-4 file:py-1.5 file:text-sm file:font-medium hover:file:bg-white/90 file:cursor-pointer cursor-pointer text-[--text-muted]"
                    />
                  </label>

                  {form.preview ? (
                    <div className="relative">
                      <img
                        src={form.preview}
                        alt="Preview"
                        className="w-full h-44 object-cover rounded-xl border border-[--border]"
                      />
                      <button
                        type="button"
                        onClick={() => onFile(null)}
                        className="absolute top-2 right-2 bg-black/60 backdrop-blur p-1.5 rounded-full border border-white/10 hover:bg-black/80"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="h-28 flex flex-col items-center justify-center gap-1.5 bg-[#0e1120] border border-dashed border-[--border] rounded-xl text-[--text-faint]">
                      <ImageOff size={20} />
                      <span className="text-xs">Nema slike</span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-[#0b0d16] font-semibold rounded-full py-2.5 text-sm hover:bg-white/90 disabled:opacity-50"
                    >
                      {submitting && <Loader2 size={16} className="animate-spin" />}
                      {editing ? "Sačuvaj izmene" : "Dodaj salon"}
                    </button>
                    {editing && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-2.5 rounded-full border border-white/15 text-sm font-medium hover:bg-white/5"
                      >
                        Otkaži
                      </button>
                    )}
                  </div>

                  {msg && (
                    <p className="text-sm text-center bg-white/[0.06] border border-white/10 rounded-xl p-2.5 break-words">
                      {msg}
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* Lista */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="font-semibold">
                  Svi saloni{" "}
                  <span className="text-[--text-muted] font-normal">({salons.length})</span>
                </h3>
                <button
                  onClick={refresh}
                  disabled={loading}
                  className="text-xs border border-white/15 rounded-full px-3 py-1.5 hover:bg-white/5 disabled:opacity-50"
                >
                  Osveži
                </button>
              </div>

              {loading ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-[--surface] border border-[--border] rounded-2xl p-4 animate-pulse">
                      <div className="h-36 bg-white/[0.06] rounded-xl mb-3" />
                      <div className="h-4 bg-white/[0.06] rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-200 text-sm">
                  {error}
                </div>
              ) : salons.length === 0 ? (
                <div className="text-center py-14 bg-[--surface] border border-[--border] rounded-2xl text-[--text-muted] text-sm">
                  Još nema salona. Dodaj prvi preko forme levo.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {salons.map((s) => (
                    <article
                      key={s.id}
                      className={`bg-[--surface] border rounded-2xl overflow-hidden flex flex-col ${
                        editing?.id === s.id ? "border-[--accent] ring-1 ring-[--accent]/30" : "border-[--border]"
                      }`}
                    >
                      <div className="h-40 bg-[#0e1120] relative">
                        {s.slika ? (
                          <img src={s.slika} alt={s.ime} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[--text-faint] gap-2">
                            <ImageOff size={22} /> <span className="text-xs">Bez slike</span>
                          </div>
                        )}
                        <span className="absolute top-2.5 left-2.5 text-xs bg-black/60 backdrop-blur px-2 py-1 rounded-full border border-white/10">
                          {s.kategorija}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-semibold leading-tight">{s.ime}</h4>
                        <p className="text-sm text-[--text-muted] mt-1 line-clamp-2 flex-1">
                          {s.opis || "Bez opisa."}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => startEdit(s)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white/[0.07] border border-white/10 rounded-full py-2 text-xs font-medium hover:bg-white/10"
                          >
                            <Pencil size={13} /> Izmeni
                          </button>
                          <button
                            onClick={() => onDelete(s)}
                            disabled={deleteId === s.id}
                            className="inline-flex items-center justify-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full px-4 py-2 text-xs font-medium hover:bg-red-500/15 disabled:opacity-50"
                          >
                            {deleteId === s.id ? (
                              <Loader2 size={13} className="animate-spin" />
                            ) : (
                              <Trash2 size={13} />
                            )}{" "}
                            Obriši
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
