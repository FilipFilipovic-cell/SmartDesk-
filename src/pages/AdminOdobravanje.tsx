import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import type { Salon } from "../lib/salons";
import { Loader2, Check, X, Shield } from "lucide-react";

export default function AdminOdobravanje() {
  const { user } = useAuth();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.email === "filipovicfilip865@gmail.com";

  const refresh = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("salons").select("*").eq("odobren", false).order("created_at", { ascending: false });
    if (!error && data) setSalons(data as Salon[]);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const approve = async (id: string) => {
    const { error } = await supabase.from("salons").update({ odobren: true }).eq("id", id);
    if (!error) refresh();
    else alert(error.message);
  };
  const reject = async (id: string) => {
    if (!confirm("Odbaci salon? Biće obrisan.")) return;
    const { error } = await supabase.from("salons").delete().eq("id", id);
    if (!error) refresh();
    else alert(error.message);
  };

  if (!isAdmin) {
    return (
      <div className="bg-[--bg] min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <Shield className="mx-auto mb-3 text-[--text-faint]" />
          <h1 className="text-xl font-bold">Samo admin</h1>
          <p className="text-sm text-[--text-muted] mt-2">Ovu stranicu može da vidi samo filipovicfilip865@gmail.com.</p>
          <Link to="/" className="inline-block mt-4 text-sm underline">Nazad</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[--bg] min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h1 className="font-display text-2xl font-bold flex items-center gap-2"><Shield size={20} /> Odobravanje salona</h1>
          <p className="text-sm text-[--text-muted] mt-1">Saloni na čekanju — odobri da budu javni na /saloni ili odbaci.</p>

          {loading ? (
            <div className="mt-6 flex items-center gap-2 text-[--text-muted]"><Loader2 className="animate-spin" size={16} /> Učitavanje...</div>
          ) : salons.length === 0 ? (
            <div className="mt-6 text-center py-12 bg-[--surface] border border-[--border] rounded-2xl text-[--text-muted]">Nema salona na čekanju.</div>
          ) : (
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {salons.map((s) => (
                <div key={s.id} className="bg-[--surface] border border-[--border] rounded-2xl overflow-hidden">
                  <div className="h-36 bg-[#0e1120] relative">
                    {s.slika ? <img src={s.slika} alt={s.ime} className="w-full h-full object-cover" /> : <div className="w-full h-full grid place-items-center text-[--text-faint] text-xs">Bez slike</div>}
                    <span className="absolute top-2 left-2 text-xs bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2 py-1 rounded-full">Na čekanju</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{s.ime} — {s.grad || "—"} • {s.kategorija}</h3>
                    <p className="text-sm text-[--text-muted] mt-1 line-clamp-2">{s.opis || "Bez opisa."}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => approve(s.id)} className="flex-1 inline-flex items-center justify-center gap-1 bg-white text-[#0b0d16] rounded-full py-2 text-xs font-semibold"><Check size={14} /> Odobri</button>
                      <button onClick={() => reject(s.id)} className="inline-flex items-center justify-center gap-1 border border-red-500/20 bg-red-500/10 text-red-300 rounded-full px-4 py-2 text-xs"><X size={14} /> Odbaci</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
