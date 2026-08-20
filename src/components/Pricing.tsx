import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { pricingPlans } from "../data/content";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="cene" className="py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-[32px] sm:text-[42px] font-semibold tracking-tight text-white">
            Jednostavne cene. Jedna briga manje.
          </h2>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-[14px] font-medium ${!yearly ? "text-white" : "text-[--text-faint]"}`}>
            Mesečno
          </span>
          <button
            role="switch"
            aria-checked={yearly}
            aria-label="Prebaci na godišnju pretplatu"
            onClick={() => setYearly((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              yearly ? "bg-[--accent]" : "bg-[--surface-2]"
            } border border-white/10`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5.5 w-5.5 rounded-full bg-white transition-transform ${
                yearly ? "translate-x-5" : "translate-x-0"
              }`}
              style={{ height: 22, width: 22 }}
            />
          </button>
          <span className={`text-[14px] font-medium ${yearly ? "text-white" : "text-[--text-faint]"}`}>
            Godišnje
          </span>
          <span className="text-[12px] font-semibold text-[--success] bg-[--success-soft] rounded-full px-2.5 py-1">
            Uštedite 20%
          </span>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.highlighted
                  ? "bg-[--surface] border-2 border-[--accent] shadow-2xl shadow-[--accent-soft]"
                  : "bg-[--surface] border border-white/[0.08]"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11.5px] font-semibold text-white bg-[--accent] rounded-full px-3.5 py-1">
                  {plan.badge}
                </span>
              )}

              <h3 className="font-display text-[19px] font-semibold text-white">{plan.name}</h3>
              <p className="mt-1 text-[13.5px] text-[--text-faint]">{plan.description}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-[36px] font-semibold text-white">
                  ${yearly ? plan.priceYearly : plan.priceMonthly}
                </span>
                <span className="text-[13.5px] text-[--text-faint]">/mesečno</span>
              </div>

              <ul className="mt-6 flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-[--text-muted]">
                    <Check size={16} className="text-[--accent-2] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.id === "business" ? "/kontakt" : "/registracija"}
                className={`mt-7 text-center rounded-full py-3 text-[14px] font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-white text-[#0b0d16] hover:bg-white/90"
                    : "border border-white/15 text-white hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
