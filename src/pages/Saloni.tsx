import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSalons } from "../hooks/useSalons";
import { SALON_KATEGORIJE, type SalonKategorija } from "../lib/salons";
import { isSupabaseConfigured } from "../lib/supabase";
import { Store, ImageOff, ArrowLeft } from "lucide-react";

type Filter = SalonKategorija | "Sve";

export default function Saloni() {
  const { salons, loading, error } = useSalons();
  const [filter, setFilter] = useState<Filter>("Sve");
  const [gradFilter, setGradFilter] = useState<string>("Sve");
  const [search, setSearch] = useState("");
  const [sortGrad, setSortGrad] = useState<"none" | "asc" | "desc">("none");
  const configured = isSupabaseConfigured();

  const gradovi = useMemo(() => {
    const set = new Set<string>();
    salons.forEach((s) => {
      if (s.grad) set.add(s.grad);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "sr"));
  }, [salons]);

  const filtered = useMemo(() => {
    let out = salons.filter((s) => {
      const katOk = filter === "Sve" || s.kategorija === filter;
      const gradOk = gradFilter === "Sve" || s.grad === gradFilter;
      const q = search.trim().toLowerCase();
      const searchOk = !q || s.ime.toLowerCase().includes(q) || (s.opis && s.opis.toLowerCase().includes(q)) || (s.grad && s.grad.toLowerCase().includes(q));
      return katOk && gradOk && searchOk;
    });
    if (sortGrad !== "none") {
      out = [...out].sort((a, b) => {
        const ga = (a.grad || "").localeCompare(b.grad || "", "sr");
        return sortGrad === "asc" ? ga : -ga;
      });
    }
    return out;
  }, [salons, filter, gradFilter, search, sortGrad]);

  return (
    <div className="bg-[--bg] min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[--text-muted] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Nazad na početnu
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                Saloni
              </h1>
              <p className="text-[--text-muted] mt-2 max-w-xl">
                Pronađite frizerske salone, berbernice i salone lepote u svom gradu. Filtrirajte po kategoriji i gradu.
              </p>
            </div>
            <Link
              to="/admin/saloni"
              className="inline-flex items-center justify-center font-semibold bg-white text-[#0b0d16] px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors text-sm shrink-0"
            >
              Admin — upravljaj salonima
            </Link>
          </div>

          {!configured && (
            <div className="mb-6 text-sm text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              Supabase nije konfigurisan — proveri <code>.env</code> (VITE_SUPABASE_URL). Podaci neće biti učitani.
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {(["Sve", ...SALON_KATEGORIJE] as Filter[]).map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  filter === k
                    ? "bg-white text-[#0b0d16] border-white"
                    : "bg-transparent text-[--text-muted] border-white/15 hover:text-white hover:border-white/30"
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <label htmlFor="grad-filter" className="text-sm text-[--text-muted]">
              Grad:
            </label>
            <select
              id="grad-filter"
              value={gradFilter}
              onChange={(e) => setGradFilter(e.target.value)}
              className="bg-[#0e1120] border border-[--border] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[--accent] min-w-[160px]"
            >
              <option value="Sve">Svi gradovi</option>
              {gradovi.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {gradFilter !== "Sve" && (
              <button
                onClick={() => setGradFilter("Sve")}
                className="text-xs text-[--text-faint] hover:text-white underline"
              >
                Poništi grad
              </button>
            )}
            <label htmlFor="sort-grad" className="text-sm text-[--text-muted] ml-2">
              Sort:
            </label>
            <select
              id="sort-grad"
              value={sortGrad}
              onChange={(e) => setSortGrad(e.target.value as typeof sortGrad)}
              className="bg-[#0e1120] border border-[--border] rounded-full px-3 py-2 text-sm focus:outline-none focus:border-[--accent]"
            >
              <option value="none">Bez sortiranja</option>
              <option value="asc">Grad A-Z</option>
              <option value="desc">Grad Z-A</option>
            </select>
            <input
              type="search"
              placeholder="Pretraga po imenu, opisu, gradu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-auto bg-[#0e1120] border border-[--border] rounded-full px-4 py-2 text-sm placeholder:text-[--text-faint] focus:outline-none focus:border-[--accent] min-w-[220px] flex-1 max-w-[320px]"
            />
            {gradovi.length === 0 && !loading && (
              <span className="text-xs text-[--text-faint]">Još nema gradova (dodajte salone sa gradom)</span>
            )}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[--surface] border border-[--border] rounded-2xl p-4 animate-pulse">
                  <div className="h-44 bg-white/[0.06] rounded-xl mb-4" />
                  <div className="h-5 bg-white/[0.06] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-white/[0.06] rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-200">
              <p className="font-medium">Greška pri učitavanju salona</p>
              <p className="text-sm text-red-300/80 mt-1 break-words">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-[--surface] border border-[--border] rounded-2xl">
              <Store className="mx-auto text-[--text-faint] mb-3" size={28} />
              <p className="text-[--text-muted]">
                Nema salona za {filter !== "Sve" ? `kategoriju “${filter}”` : ""}{" "}
                {gradFilter !== "Sve" ? `u gradu “${gradFilter}”` : ""}
                {filter === "Sve" && gradFilter === "Sve" ? "ovaj filter" : ""}.
              </p>
              <p className="text-sm text-[--text-faint] mt-1">
                Pokušajte drugim filterom ili dodajte salon u adminu.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[--text-faint] mb-4">
                Prikazano {filtered.length} od {salons.length}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((s) => (
                  <Link
                    key={s.id}
                    to={`/saloni/${s.id}`}
                    className="bg-[--surface] border border-[--border] rounded-2xl overflow-hidden hover:border-white/10 transition-colors flex flex-col"
                  >
                    <div className="h-48 bg-[#0e1120] relative overflow-hidden">
                      {s.slika ? (
                        <img
                          src={s.slika}
                          alt={s.ime}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[--text-faint] gap-2">
                          <ImageOff size={28} />
                          <span className="text-xs">Bez slike</span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-xs font-medium bg-black/60 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
                        {s.kategorija}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-[17px] leading-tight">{s.ime}</h3>
                      {(s.grad || s.radno_vreme) && (
                        <p className="text-xs text-[--text-faint] mt-1.5 flex flex-wrap gap-2">
                          {s.grad && <span>📍 {s.grad}</span>}
                          {s.radno_vreme && <span>🕒 {s.radno_vreme}</span>}
                        </p>
                      )}
                      <p className="text-sm text-[--text-muted] mt-1.5 line-clamp-3 flex-1">
                        {s.opis || "Bez opisa."}
                      </p>
                      <p className="text-xs text-[--text-faint] mt-3">
                        {new Date(s.created_at).toLocaleDateString("sr-RS")} • Klik za AI chat →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
