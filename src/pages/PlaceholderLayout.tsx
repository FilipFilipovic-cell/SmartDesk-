import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function PlaceholderLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[--bg] flex flex-col">
      <div className="absolute inset-0 bg-grid opacity-[0.4] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] pointer-events-none" />
      <header className="relative px-6 sm:px-8 py-6">
        <Link to="/" className="inline-flex">
          <Logo />
        </Link>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[--surface] p-8 sm:p-10">
          <h1 className="font-display text-[24px] font-semibold text-white">{title}</h1>
          <p className="mt-2 text-[14px] text-[--text-muted]">{subtitle}</p>

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-6 text-center text-[13.5px] text-[--text-muted]">{footer}</div>}
        </div>
      </main>
    </div>
  );
}
