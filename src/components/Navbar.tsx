import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { nav } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const id = href.slice(1);
    // Ako nismo na landing stranici, prvo idi na "/" pa onda scroll
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080a12]/85 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="focus-visible:outline-none">
          <Logo />
        </a>

        <div className="hidden md:flex items-center gap-9">
          {nav.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                to={item.href}
                className="text-[14.5px] text-[--text-muted] hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchor(e, item.href)}
                className="text-[14.5px] text-[--text-muted] hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/prijava"
            className="text-[14.5px] font-medium text-[--text-muted] hover:text-white transition-colors px-3 py-2"
          >
            Prijavite se
          </Link>
          <Link
            to="/registracija"
            className="text-[14.5px] font-semibold bg-white text-[#0b0d16] px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors"
          >
            Počnite besplatno
          </Link>
        </div>

        <button
          className="md:hidden text-white p-2 -mr-2"
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#0a0d17] border-t border-white/[0.06] px-5 pb-6 pt-2 flex flex-col gap-1 animate-fade-up">
          {nav.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="text-[15px] text-[--text-muted] hover:text-white py-3 border-b border-white/[0.05]"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchor(e, item.href)}
                className="text-[15px] text-[--text-muted] hover:text-white py-3 border-b border-white/[0.05] cursor-pointer"
              >
                {item.label}
              </a>
            )
          )}
          <div className="flex flex-col gap-3 pt-4">
            <Link
              to="/prijava"
              onClick={() => setOpen(false)}
              className="text-center text-[15px] font-medium text-white border border-white/15 rounded-full py-3"
            >
              Prijavite se
            </Link>
            <Link
              to="/registracija"
              onClick={() => setOpen(false)}
              className="text-center text-[15px] font-semibold bg-white text-[#0b0d16] rounded-full py-3"
            >
              Počnite besplatno
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
