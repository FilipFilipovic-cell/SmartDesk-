import { Link } from "react-router-dom";
import { CalendarCheck2, CircleCheck, Sparkles } from "lucide-react";
import { hero } from "../data/content";
import ChatDemo from "./ChatDemo";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_0%,black,transparent)]" />
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-14 grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-[--accent-line] bg-[--accent-soft] px-3.5 py-1.5 text-[13px] font-medium text-[--accent-2]">
            <Sparkles size={14} strokeWidth={2.5} />
            {hero.eyebrow}
          </div>

          <h1 className="font-display mt-6 text-[40px] leading-[1.08] sm:text-[54px] lg:text-[58px] font-semibold tracking-tight text-white">
            {hero.title}
          </h1>

          <p className="mt-6 text-[17px] sm:text-[18.5px] leading-relaxed text-[--text-muted] max-w-[540px]">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
            <Link
              to="/registracija"
              className="text-center rounded-full bg-white text-[#0b0d16] font-semibold text-[15px] px-7 py-3.5 hover:bg-white/90 transition-colors"
            >
              {hero.ctaPrimary}
            </Link>
            <a
              href="#kako-funkcionise"
              className="text-center rounded-full border border-white/15 text-white font-medium text-[15px] px-7 py-3.5 hover:bg-white/5 transition-colors"
            >
              {hero.ctaSecondary}
            </a>
          </div>

          <p className="mt-5 text-[13.5px] text-[--text-faint]">{hero.microcopy}</p>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <ChatDemo />

          <div className="hidden lg:flex absolute -top-8 -left-12 items-center gap-2.5 rounded-2xl border border-white/10 bg-[--surface]/95 backdrop-blur px-4 py-3 shadow-xl animate-float-slow z-10">
            <div className="grid place-items-center w-8 h-8 rounded-lg bg-[--success-soft] text-[--success]">
              <CalendarCheck2 size={16} />
            </div>
            <span className="font-mono text-[12.5px] text-white whitespace-nowrap">
              {hero.floatingCards[0].label}
            </span>
          </div>

          <div className="hidden lg:flex absolute -right-12 top-8 items-center gap-2.5 rounded-2xl border border-white/10 bg-[--surface]/95 backdrop-blur px-4 py-3 shadow-xl animate-float-slower z-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-[--success]" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[--success]" />
            </span>
            <span className="font-mono text-[12.5px] text-white whitespace-nowrap">
              {hero.floatingCards[1].label}
            </span>
          </div>

          <div className="hidden lg:flex absolute -left-10 -bottom-8 items-center gap-2.5 rounded-2xl border border-white/10 bg-[--surface]/95 backdrop-blur px-4 py-3 shadow-xl animate-float-slow [animation-delay:1.2s] z-10">
            <div className="grid place-items-center w-8 h-8 rounded-lg bg-[--accent-soft] text-[--accent-2]">
              <CircleCheck size={16} />
            </div>
            <span className="font-mono text-[12.5px] text-white whitespace-nowrap">
              {hero.floatingCards[2].label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
