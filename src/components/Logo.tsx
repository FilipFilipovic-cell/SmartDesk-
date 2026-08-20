type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

// Minimalistički simbol: spoj table (recepcija) + govornog oblačića (chat) +
// tačke koja predstavlja AI/potvrdu termina. Namerno bez previše detalja
// kako bi ostao čitljiv u malim dimenzijama (navbar, favicon, mobile).
export default function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="9" fill="url(#sd-grad)" />
        <path
          d="M8.5 12.5C8.5 10.567 10.067 9 12 9H20C21.933 9 23.5 10.567 23.5 12.5V17.5C23.5 19.433 21.933 21 20 21H14.5L11 24V21H12C10.067 21 8.5 19.433 8.5 17.5V12.5Z"
          fill="white"
          fillOpacity="0.96"
        />
        <circle cx="13" cy="15" r="1.15" fill="#6E5EF5" />
        <circle cx="16.3" cy="15" r="1.15" fill="#6E5EF5" />
        <circle cx="19.6" cy="15" r="1.15" fill="#6E5EF5" />
        <defs>
          <linearGradient id="sd-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B7CF8" />
            <stop offset="1" stopColor="#4C3FD6" />
          </linearGradient>
        </defs>
      </svg>
      {showWordmark && (
        <span className="font-display text-[19px] font-semibold tracking-tight text-white">
          SmartDesk
        </span>
      )}
    </div>
  );
}
