import { useState } from "react";
import { Link } from "react-router-dom";
import PlaceholderLayout from "./PlaceholderLayout";

// Placeholder stranica — registracija još nije povezana sa pravim backendom.
// Zameniti handleSubmit pravim API pozivom kada bude spreman.
export default function Signup() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PlaceholderLayout
      title="Napravite SmartDesk nalog"
      subtitle="Registracija uskoro biće u potpunosti dostupna. Ostavite podatke i javićemo vam se."
      footer={
        <>
          Već imate nalog?{" "}
          <Link to="/prijava" className="text-[--accent-2] font-medium">
            Prijavite se
          </Link>
        </>
      }
    >
      {submitted ? (
        <div className="rounded-xl bg-[--success-soft] border border-[--success]/30 px-4 py-4 text-[14px] text-[--success]">
          Hvala! Ovo je demo stranica — pravi tok registracije stiže uskoro.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="salon" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
              Naziv salona
            </label>
            <input
              id="salon"
              type="text"
              placeholder="npr. Salon Bella"
              className="w-full rounded-xl bg-[--surface-2] border border-white/10 px-4 py-3 text-[14px] text-white placeholder:text-[--text-faint] focus:border-[--accent] outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
              Email adresa
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="ime@salon.com"
              className="w-full rounded-xl bg-[--surface-2] border border-white/10 px-4 py-3 text-[14px] text-white placeholder:text-[--text-faint] focus:border-[--accent] outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
              Lozinka
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl bg-[--surface-2] border border-white/10 px-4 py-3 text-[14px] text-white placeholder:text-[--text-faint] focus:border-[--accent] outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-full bg-white text-[#0b0d16] font-semibold text-[14.5px] py-3.5 hover:bg-white/90 transition-colors"
          >
            Kreirajte nalog
          </button>
        </form>
      )}
    </PlaceholderLayout>
  );
}
