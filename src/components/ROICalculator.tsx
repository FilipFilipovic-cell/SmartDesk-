import { useMemo, useState } from "react";
import { roi } from "../data/content";

// Procenat poruka koje realno postaju plaćeni termin — konzervativna demo
// pretpostavka, jasno označena kao procena, ne obećanje.
const CONVERSION_RATE = 0.18;

export default function ROICalculator() {
  const [messagesPerDay, setMessagesPerDay] = useState(12);
  const [appointmentValue, setAppointmentValue] = useState(35);

  const monthlyProtected = useMemo(() => {
    const monthlyMessages = messagesPerDay * 30;
    const convertedAppointments = monthlyMessages * CONVERSION_RATE;
    return Math.round(convertedAppointments * appointmentValue);
  }, [messagesPerDay, appointmentValue]);

  return (
    <section className="py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-display text-[32px] sm:text-[42px] font-semibold tracking-tight text-white">
              {roi.title}
            </h2>
            <p className="mt-4 text-[16px] sm:text-[17px] text-[--text-muted] leading-relaxed max-w-md">
              {roi.text}
            </p>
            <p className="mt-4 text-[13px] text-[--text-faint]">{roi.disclaimer}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[--surface] p-6 sm:p-8">
            <div className="flex flex-col gap-7">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="messages" className="text-[13.5px] font-medium text-white">
                    {roi.calculator.messagesLabel}
                  </label>
                  <span className="font-mono text-[13.5px] text-[--accent-2]">
                    {messagesPerDay}
                  </span>
                </div>
                <input
                  id="messages"
                  type="range"
                  min={1}
                  max={60}
                  value={messagesPerDay}
                  onChange={(e) => setMessagesPerDay(Number(e.target.value))}
                  className="w-full accent-[--accent]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="value" className="text-[13.5px] font-medium text-white">
                    {roi.calculator.valueLabel}
                  </label>
                  <span className="font-mono text-[13.5px] text-[--accent-2]">
                    {appointmentValue} €
                  </span>
                </div>
                <input
                  id="value"
                  type="range"
                  min={10}
                  max={150}
                  step={5}
                  value={appointmentValue}
                  onChange={(e) => setAppointmentValue(Number(e.target.value))}
                  className="w-full accent-[--accent]"
                />
              </div>

              <div className="rounded-xl bg-[--accent-soft] border border-[--accent-line] p-5">
                <p className="text-[12.5px] text-[--text-muted]">{roi.calculator.resultLabel}</p>
                <p className="font-display mt-1 text-[30px] sm:text-[34px] font-semibold text-white">
                  ~{monthlyProtected.toLocaleString("sr-RS")} €
                </p>
                <p className="mt-1 text-[12px] text-[--text-faint]">
                  Procena zasnovana na demo vrednostima, ne garancija prihoda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
