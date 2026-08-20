import { MessageSquareOff, Repeat, CalendarX, MoonStar } from "lucide-react";
import { problem } from "../data/content";

const icons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  MessageSquareOff,
  Repeat,
  CalendarX,
  MoonStar,
};

export default function Problem() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-[32px] sm:text-[42px] font-semibold tracking-tight text-white">
            {problem.title}
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[--text-muted] leading-relaxed">
            {problem.subtitle}
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problem.cards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-white/[0.07] bg-[--surface] p-6 hover:border-white/[0.14] transition-colors"
              >
                <div className="grid place-items-center w-10 h-10 rounded-xl bg-[--accent-soft] text-[--accent-2] mb-5">
                  <Icon size={19} strokeWidth={2} />
                </div>
                <h3 className="text-[15.5px] font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-[14px] text-[--text-muted] leading-relaxed">{card.text}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-center font-display text-[18px] sm:text-[20px] font-medium text-white">
          {problem.closing}
        </p>
      </div>
    </section>
  );
}
