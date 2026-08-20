import {
  LayoutGrid,
  MessagesSquare,
  CalendarDays,
  Users,
  BookOpen,
  Settings,
  TrendingUp,
  Activity,
} from "lucide-react";
import { dashboardDemo } from "../data/content";

const sidebarIcons = [LayoutGrid, MessagesSquare, CalendarDays, Users, BookOpen, Settings];

export default function DashboardPreview() {
  return (
    <section className="py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-[32px] sm:text-[42px] font-semibold tracking-tight text-white">
            Iza svake poruke stoji pravi proizvod.
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[--text-muted] leading-relaxed">
            Kompletan pregled razgovora, termina i klijenata na jednom mestu — u realnom vremenu.
          </p>
        </div>

        <div className="mt-14 rounded-3xl border border-white/[0.08] bg-[--surface] overflow-hidden shadow-2xl shadow-black/30">
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden md:flex w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[--bg-soft] py-6 px-4">
              <div className="flex items-center gap-2 px-2 mb-8">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[--accent-2] to-[--accent-deep]" />
                <span className="font-display text-[14px] font-semibold text-white">SmartDesk</span>
              </div>
              <nav className="flex flex-col gap-1">
                {dashboardDemo.sidebar.map((item, i) => {
                  const Icon = sidebarIcons[i];
                  const active = i === 0;
                  return (
                    <div
                      key={item}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] ${
                        active
                          ? "bg-[--accent-soft] text-white font-medium"
                          : "text-[--text-muted]"
                      }`}
                    >
                      <Icon size={16} />
                      {item}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Main */}
            <div className="flex-1 min-w-0 p-5 sm:p-8">
              <h3 className="font-display text-[19px] sm:text-[22px] font-semibold text-white">
                {dashboardDemo.greeting}
              </h3>

              <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {dashboardDemo.cards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-xl border border-white/[0.07] bg-[--surface-2] p-4"
                  >
                    <p className="text-[12px] text-[--text-faint]">{card.label}</p>
                    <p className="font-mono mt-1.5 text-[20px] sm:text-[22px] font-medium text-white">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1 rounded-xl border border-white/[0.07] bg-[--surface-2] p-5">
                  <p className="text-[13px] font-semibold text-white mb-4">Nedavni razgovori</p>
                  <div className="flex flex-col gap-3.5">
                    {dashboardDemo.conversations.map((c) => (
                      <div key={c.name} className="flex items-center gap-3">
                        <div className="grid place-items-center w-8 h-8 rounded-full bg-[--accent-soft] text-[--accent-2] text-[11px] font-semibold shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] text-white truncate">{c.name}</p>
                          <p className="text-[12px] text-[--text-faint] truncate">{c.preview}</p>
                        </div>
                        <span className="font-mono text-[11px] text-[--text-faint] shrink-0">
                          {c.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1 rounded-xl border border-white/[0.07] bg-[--surface-2] p-5">
                  <p className="text-[13px] font-semibold text-white mb-4">Kalendar termina</p>
                  <div className="flex flex-col gap-3.5">
                    {dashboardDemo.appointments.map((a) => (
                      <div key={a.time} className="flex items-center gap-3">
                        <span className="font-mono text-[12px] text-[--accent-2] shrink-0 w-11">
                          {a.time}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] text-white truncate">{a.client}</p>
                          <p className="text-[12px] text-[--text-faint] truncate">{a.service}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1 rounded-xl border border-white/[0.07] bg-[--surface-2] p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity size={14} className="text-[--accent-2]" />
                    <p className="text-[13px] font-semibold text-white">AI aktivnost</p>
                  </div>
                  <div className="flex flex-col gap-3.5">
                    {dashboardDemo.activity.map((a, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[--success] shrink-0" />
                        <p className="text-[12.5px] text-[--text-muted] leading-snug">{a}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-white/[0.06] text-[--success]">
                    <TrendingUp size={13} />
                    <span className="text-[11.5px] font-medium">Aktivno u realnom vremenu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
