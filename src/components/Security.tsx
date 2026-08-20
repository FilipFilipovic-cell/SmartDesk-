import { ShieldCheck, Lock, KeyRound, UserCog, EyeOff } from "lucide-react";
import { security } from "../data/content";

const icons = [Lock, ShieldCheck, KeyRound, UserCog, EyeOff];

export default function Security() {
  return (
    <section className="py-20 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="rounded-2xl border border-white/[0.07] bg-[--surface] px-6 py-10 sm:px-12 sm:py-12">
          <div className="max-w-lg">
            <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-white">
              {security.title}
            </h2>
            <p className="mt-3 text-[14.5px] text-[--text-muted] leading-relaxed">
              {security.text}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {security.points.map((p, i) => {
              const Icon = icons[i];
              return (
                <div key={p} className="flex items-center gap-2.5">
                  <Icon size={16} className="text-[--accent-2]" />
                  <span className="text-[13.5px] text-[--text-muted]">{p}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
