import Logo from "./Logo";
import { footer } from "../data/content";
import { InstagramIcon, FacebookIcon, LinkedInIcon } from "./SocialIcons";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  LinkedIn: LinkedInIcon,
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[--bg-soft]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-[14px] text-[--text-muted] max-w-xs">{footer.tagline}</p>
            <div className="flex items-center gap-3 mt-6">
              {footer.social.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid place-items-center w-9 h-9 rounded-full border border-white/10 text-[--text-muted] hover:text-white hover:border-white/25 transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[13px] font-semibold text-white mb-4">Proizvod</p>
            <ul className="flex flex-col gap-3">
              {footer.productLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] text-[--text-muted] hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-semibold text-white mb-4">Kompanija</p>
            <ul className="flex flex-col gap-3">
              {footer.companyLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] text-[--text-muted] hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[--text-faint]">{footer.copyright}</p>
          <p className="text-[12px] text-[--text-faint]">
            Linkovi obeleženi sa "#" su placeholder — zamenite pravim URL-ovima pre lansiranja.
          </p>
        </div>
      </div>
    </footer>
  );
}
