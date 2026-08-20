import { useState } from "react";
import PlaceholderLayout from "./PlaceholderLayout";

// Placeholder stranica — kontakt forma još nije povezana sa pravim backendom
// ili email servisom.
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PlaceholderLayout
      title="Kontaktirajte nas"
      subtitle="Javite nam se za Business plan ili bilo koje pitanje — odgovaramo u najkraćem roku."
    >
      {submitted ? (
        <div className="rounded-xl bg-[--success-soft] border border-[--success]/30 px-4 py-4 text-[14px] text-[--success]">
          Hvala na poruci! Ovo je demo stranica — tim će vas kontaktirati kada bude aktivna.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
              Ime i prezime
            </label>
            <input
              id="name"
              type="text"
              placeholder="Vaše ime"
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
            <label htmlFor="message" className="block text-[13px] font-medium text-[--text-muted] mb-1.5">
              Poruka
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Kako možemo da pomognemo?"
              className="w-full rounded-xl bg-[--surface-2] border border-white/10 px-4 py-3 text-[14px] text-white placeholder:text-[--text-faint] focus:border-[--accent] outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-full bg-white text-[#0b0d16] font-semibold text-[14.5px] py-3.5 hover:bg-white/90 transition-colors"
          >
            Pošaljite poruku
          </button>
        </form>
      )}
    </PlaceholderLayout>
  );
}
