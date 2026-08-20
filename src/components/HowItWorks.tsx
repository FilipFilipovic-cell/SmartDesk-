import { motion } from "framer-motion";
import { MessageCircle, Bot, CalendarCheck2, ArrowRight } from "lucide-react";
import { howItWorks } from "../data/content";

const flowIcons = [MessageCircle, Bot, CalendarCheck2];

export default function HowItWorks() {
  return (
    <section id="kako-funkcionise" className="py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-[32px] sm:text-[42px] font-semibold tracking-tight text-white">
            {howItWorks.title}
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 md:gap-6">
          {howItWorks.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-mono text-[13px] text-[--accent-2]">{step.number}</span>
              <h3 className="mt-3 font-display text-[19px] font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] text-[--text-muted] leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 rounded-2xl border border-white/[0.07] bg-[--surface] px-6 py-8 sm:px-10 sm:py-10"
        >
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {howItWorks.flow.map((label, i) => {
              const Icon = flowIcons[i];
              return (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center gap-2.5">
                    <div className="grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[--accent-soft] border border-[--accent-line] text-[--accent-2]">
                      <Icon size={20} />
                    </div>
                    <span className="text-[12px] sm:text-[13px] font-medium text-[--text-muted] text-center whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                  {i < howItWorks.flow.length - 1 && (
                    <ArrowRight
                      size={18}
                      className="mx-2 sm:mx-5 mb-6 text-[--text-faint] shrink-0"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
