import { Link } from "react-router-dom";
import { finalCta } from "../data/content";

export default function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 border-t border-white/[0.06] relative overflow-hidden">
      <div className="absolute inset-0 hero-glow opacity-70 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <h2 className="font-display text-[32px] sm:text-[46px] font-semibold tracking-tight text-white leading-[1.1]">
          {finalCta.title}
        </h2>
        <p className="mt-5 text-[16px] sm:text-[17px] text-[--text-muted]">{finalCta.text}</p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/registracija"
            className="rounded-full bg-white text-[#0b0d16] font-semibold text-[15px] px-8 py-3.5 hover:bg-white/90 transition-colors"
          >
            {finalCta.ctaPrimary}
          </Link>
          <Link
            to="/kontakt"
            className="rounded-full border border-white/15 text-white font-medium text-[15px] px-8 py-3.5 hover:bg-white/5 transition-colors"
          >
            {finalCta.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
