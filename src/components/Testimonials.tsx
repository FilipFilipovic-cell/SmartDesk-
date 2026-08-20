import { Quote } from "lucide-react";
import { testimonials } from "../data/content";

// NAPOMENA: DEMO sadržaj — placeholder testimoniali dok se ne prikupe pravi
// izjave klijenata. Vidi src/data/content.ts.
export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-[32px] sm:text-[42px] font-semibold tracking-tight text-white">
            Ono što bi mogli reći vlasnici salona.
          </h2>
          <p className="mt-3 text-[14px] text-[--text-faint]">
            Ilustrativni primeri — prikupljamo prve stvarne priče korisnika.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-white/[0.07] bg-[--surface] p-6 flex flex-col"
            >
              <Quote size={20} className="text-[--accent-2] mb-4" />
              <p className="text-[14.5px] text-[--text] leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-5 pt-5 border-t border-white/[0.06]">
                <p className="text-[13.5px] font-semibold text-white">{t.name}</p>
                <p className="text-[12.5px] text-[--text-faint]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
