import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "../data/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="pitanja" className="py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-[32px] sm:text-[42px] font-semibold tracking-tight text-white text-center">
          Česta pitanja
        </h2>

        <div className="mt-12 flex flex-col gap-3">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-white/[0.08] bg-[--surface] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium text-white">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[--text-faint] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[14px] text-[--text-muted] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
