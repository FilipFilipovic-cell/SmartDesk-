import { trustBar } from "../data/content";

export default function TrustBar() {
  return (
    <section className="border-y border-white/[0.06] bg-[--bg-soft]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
        <p className="text-center text-[13px] font-medium uppercase tracking-[0.14em] text-[--text-faint] mb-6">
          {trustBar.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {trustBar.categories.map((c) => (
            <span
              key={c}
              className="font-display text-[15px] sm:text-[16px] text-[--text-muted]"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="text-center mt-6 text-[14px] text-[--text-faint]">{trustBar.note}</p>
      </div>
    </section>
  );
}
