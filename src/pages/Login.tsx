import { useState } from "react";
import { Link } from "react-router-dom";
import PlaceholderLayout from "./PlaceholderLayout";

// Placeholder stranica — prijava još nije povezana sa pravim backendom.
export default function Login() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PlaceholderLayout
      title="Prijavite se na SmartDesk"
      subtitle="Prijava uskoro biće u potpunosti dostupna."
      footer={
        <>
          Nemate nalog?{" "}
          <Link to="/registracija" className="text-[--accent-2] font-medium">
            Registrujte se besplatno
          </Link>
        </>
      }
    >
      {submitted ? (
        <div className="rounded-xl bg-[--success-soft] border border-[--success]/30 px-4 py-4 text-[14px] text-[--success]">
          Hvala! Ovo je demo stranica — pravi tok prijave stiže uskoro.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Prijavite se
          </button>
        </form>
      )}
    </PlaceholderLayout>
  );
}
