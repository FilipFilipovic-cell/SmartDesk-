import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSalonById, type Salon } from "../lib/salons";
import { createTerminAI, predloziSlobodne } from "../lib/termini";
import { ArrowLeft, MapPin, Clock, Send, Loader2, Bot } from "lucide-react";

type Msg = { from: "bot" | "user"; text: string; slots?: { pocetak: string; kraj: string }[] };

export default function SalonDetail() {
  const { id } = useParams();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    getSalonById(id)
      .then((s) => {
        setSalon(s);
        if (s) {
          setMsgs([
            {
              from: "bot",
              text: `Zdravo! Ja sam SmartDesk AI za ${s.ime} (${s.grad || "—"}). Kako mogu da pomognem? Možete pitati za slobodan termin, npr. "ima li slobodno sutra u 10h?"`,
            },
          ]);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text || !salon) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setAiLoading(true);

    // Naivna AI logika: ako korisnik pita za termin, predloži slotove
    const lower = text.toLowerCase();
    const traziTermin = /termin|slobodan|zakaz|rezerv/i.test(lower);

    try {
      if (traziTermin) {
        const sutra = new Date();
        sutra.setDate(sutra.getDate() + 1);
        // ako pomene datum, probaj da izvučeš — za demo uvek sutra
        const slots = await predloziSlobodne(salon.id, sutra.toISOString());
        if (slots.length === 0) {
          setMsgs((m) => [...m, { from: "bot", text: "Nažalost nema slobodnih termina sutra. Pokušajte drugi dan." }]);
        } else {
          setMsgs((m) => [
            ...m,
            {
              from: "bot",
              text: `Naravno! Slobodni termini za sutra u ${salon.ime}:`,
              slots,
            },
          ]);
        }
      } else {
        // fallback AI odgovor koristi opis/radno vreme
        const odgovor = `Hvala na pitanju! ${salon.opis ? salon.opis.slice(0, 120) + "... " : ""}Radno vreme: ${salon.radno_vreme || "09:00-20:00"}. Za zakazivanje recite "želim termin sutra u 10h".`;
        setMsgs((m) => [...m, { from: "bot", text: odgovor }]);
      }
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "message" in err ? String((err as { message: unknown }).message) : err instanceof Error ? err.message : String(err);
      setMsgs((m) => [...m, { from: "bot", text: `Greška AI: ${msg}` }]);
    } finally {
      setAiLoading(false);
    }
  };

  const bookSlot = async (slot: { pocetak: string; kraj: string }) => {
    if (!salon) return;
    const ime = prompt("Vaše ime za rezervaciju?");
    if (!ime) return;
    const telefon = prompt("Broj telefona (opciono)") || null;
    setAiLoading(true);
    try {
      const t = await createTerminAI({
        salon_id: salon.id,
        klijent_ime: ime,
        klijent_telefon: telefon,
        usluga: "Standardna usluga",
        pocetak: slot.pocetak,
        kraj: slot.kraj,
      });
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text: `Sjajno! Zakazani ste za ${new Date(t.pocetak).toLocaleString("sr-RS")} u ${salon.ime} ✨ Potvrda će stići vlasniku.`,
        },
      ]);
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "message" in err ? String((err as { message: unknown }).message) : err instanceof Error ? err.message : String(err);
      setMsgs((m) => [...m, { from: "bot", text: `Greška pri zakazivanju: ${msg}` }]);
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen grid place-items-center bg-[--bg] text-[--text-muted]"><Loader2 className="animate-spin" /> Učitavanje salona...</div>;
  if (error || !salon) return <div className="min-h-screen bg-[--bg] p-8 text-red-300">{error || "Salon nije pronađen"} — <Link to="/saloni" className="underline">nazad</Link></div>;

  return (
    <div className="bg-[--bg] min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Link to="/saloni" className="inline-flex items-center gap-2 text-sm text-[--text-muted] hover:text-white mb-6">
            <ArrowLeft size={16} /> Nazad na salone
          </Link>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
            <div>
              <div className="h-64 bg-[#0e1120] rounded-2xl overflow-hidden border border-[--border]">
                {salon.slika ? <img src={salon.slika} alt={salon.ime} className="w-full h-full object-cover" /> : <div className="w-full h-full grid place-items-center text-[--text-faint]">Bez slike</div>}
              </div>
              <h1 className="font-display text-3xl font-bold mt-6">{salon.ime}</h1>
              <p className="text-sm text-[--text-faint] mt-2 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1"><MapPin size={14} /> {salon.grad || "—"} • {salon.kategorija}</span>
                <span className="inline-flex items-center gap-1"><Clock size={14} /> {salon.radno_vreme || "—"}</span>
              </p>
              <p className="text-[--text-muted] mt-4 leading-relaxed">{salon.opis || "Bez opisa."}</p>
            </div>

            <div className="bg-[--surface] border border-[--border] rounded-2xl flex flex-col h-[560px]">
              <div className="p-4 border-b border-white/[0.06] flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[--accent] grid place-items-center text-white"><Bot size={16} /></span>
                <div>
                  <p className="text-sm font-semibold">SmartDesk AI — {salon.ime}</p>
                  <p className="text-xs text-[--text-faint]">Automatsko zakazivanje • odgovara odmah</p>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-3">
                {msgs.map((m, i) => (
                  <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "ml-auto bg-white text-[#0b0d16]" : "bg-[#0e1120] border border-[--border] text-white"}`}>
                    <p>{m.text}</p>
                    {m.slots && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.slots.map((s) => (
                          <button
                            key={s.pocetak}
                            onClick={() => bookSlot(s)}
                            className="text-xs bg-[--accent] text-white px-3 py-1.5 rounded-full hover:bg-[--accent-2]"
                          >
                            {new Date(s.pocetak).toLocaleString("sr-RS", { hour: "2-digit", minute: "2-digit" })} — rezerviši
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {aiLoading && <div className="text-xs text-[--text-faint]">AI kuca...</div>}
              </div>

              <form onSubmit={handleSend} className="p-3 border-t border-white/[0.06] flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Npr. Ima li slobodno sutra u 10h?"
                  className="flex-1 bg-[#0e1120] border border-[--border] rounded-full px-4 py-2.5 text-sm placeholder:text-[--text-faint] focus:outline-none focus:border-[--accent]"
                />
                <button type="submit" disabled={aiLoading || !input.trim()} className="w-10 h-10 rounded-full bg-white text-[#0b0d16] grid place-items-center disabled:opacity-50">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
