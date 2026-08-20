import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { hero } from "../data/content";

const { messages, confirmation, name, status } = hero.chat;

type Phase = "typing" | "shown";

export default function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (visibleCount < messages.length) {
      if (phase === "typing") {
        timeout = setTimeout(() => setPhase("shown"), 1100);
      } else {
        timeout = setTimeout(() => {
          setVisibleCount((c) => c + 1);
          setPhase("typing");
        }, 900);
      }
    } else if (!showConfirmation) {
      timeout = setTimeout(() => setShowConfirmation(true), 500);
    } else {
      timeout = setTimeout(() => {
        setShowConfirmation(false);
        setVisibleCount(0);
        setPhase("typing");
      }, 3200);
    }

    return () => clearTimeout(timeout);
  }, [visibleCount, phase, showConfirmation]);

  const nextIsBot = messages[visibleCount]?.from === "bot";

  return (
    <div className="relative rounded-3xl border border-white/10 bg-[--surface] shadow-2xl shadow-black/40 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
        <div className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-[--accent-2] to-[--accent-deep] text-white font-display font-semibold text-[13px]">
          SD
        </div>
        <div className="flex-1">
          <p className="text-[14px] font-semibold text-white leading-tight">{name}</p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-[--success]" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[--success]" />
            </span>
            <span className="text-[12px] text-[--text-faint]">{status}</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 min-h-[340px] flex flex-col justify-end gap-3">
        {messages.slice(0, visibleCount).map((m, i) => (
          <div
            key={i}
            className={`animate-fade-up max-w-[82%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-snug ${
              m.from === "client"
                ? "self-end bg-[--accent-deep] text-white rounded-br-md"
                : "self-start bg-[--surface-2] text-[--text] rounded-bl-md border border-white/[0.06]"
            }`}
          >
            {m.text}
          </div>
        ))}

        {visibleCount < messages.length && phase === "typing" && (
          <div
            className={`flex items-center gap-1 rounded-2xl px-4 py-3 border border-white/[0.06] ${
              nextIsBot ? "self-start bg-[--surface-2] rounded-bl-md" : "self-end bg-[--accent-deep]/40 rounded-br-md"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-pulse-dot" />
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-pulse-dot [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-pulse-dot [animation-delay:0.4s]" />
          </div>
        )}

        {showConfirmation && (
          <div className="animate-fade-up self-center mt-1 flex items-center gap-2 rounded-full bg-[--success-soft] border border-[--success]/30 px-4 py-2 text-[13px] font-medium text-[--success]">
            <CircleCheck size={15} />
            {confirmation}
          </div>
        )}
      </div>
    </div>
  );
}
