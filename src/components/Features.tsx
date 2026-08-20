import {
  MessagesSquare,
  CalendarCheck2,
  Clock,
  CircleHelp,
  UserRound,
  BellRing,
  Share2,
  Handshake,
} from "lucide-react";
import { features } from "../data/content";

const icons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  MessagesSquare,
  CalendarCheck2,
  Clock,
  CircleHelp,
  UserRound,
  BellRing,
  Share2,
  Handshake,
};

export default function Features() {
  return (
    <section id="mogucnosti" className="py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-[32px] sm:text-[42px] font-semibold tracking-tight text-white">
            Sve što radi vaš recepcioner. Bez recepcionera.
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => {
            const Icon = icons[f.icon];
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-white/[0.07] bg-[--surface] p-6 hover:border-white/[0.14] hover:bg-[--surface-2] transition-colors"
              >
                <div className="grid place-items-center w-10 h-10 rounded-xl bg-[--accent-soft] text-[--accent-2] mb-5">
                  <Icon size={19} strokeWidth={2} />
                </div>
                <h3 className="text-[15px] font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-[13.5px] text-[--text-muted] leading-relaxed">{f.text}</p>
                {f.note && (
                  <p className="mt-3 text-[12.5px] text-[--text-faint] leading-relaxed border-t border-white/[0.06] pt-3">
                    {f.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
