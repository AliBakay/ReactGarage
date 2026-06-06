import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.28 6.28 0 005.4 15.6a6.28 6.28 0 006.28 6.29 6.27 6.27 0 006.28-6.25V9.44a8.27 8.27 0 004.7 1.48V7.5a4.77 4.77 0 01-3.07-.81z"/>
  </svg>
);

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-garage-bg text-white border-t border-white/10">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-5">
            <img src="/logo.png" alt="Garage van Hozeham" className="h-14 w-auto" />
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-sm">
            {t('footer.desc')}
          </p>
          {/* Social */}
          <div className="flex items-center gap-4 mt-6">
            {[
              { icon: FacebookIcon, href: "https://www.facebook.com/salim04oruc/", label: "Facebook" },
              { icon: InstagramIcon, href: "https://www.instagram.com/salim_oruc04/", label: "Instagram" },
              { icon: TikTokIcon, href: "https://www.tiktok.com/discover/garage-van-hozeham", label: "TikTok" }
            ].map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-garage-accent transition-colors"
                >
                  <Icon size={16} className="text-white" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white mb-5">{t('footer.contact')}</h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="text-garage-accent mt-0.5 shrink-0" />
              <a href="https://www.google.com/maps/search/?api=1&query=Slakweidestraat+40G+1A,+3630+Maasmechelen" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Slakweidestraat 40G 1A<br />3630 Maasmechelen
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-garage-accent shrink-0 text-[10px] font-bold border border-garage-accent px-1 rounded">{t('footer.vat')}</span>
              <span>BE0676463449</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-garage-accent shrink-0" />
              <a href="tel:+32492440514" className="hover:text-white transition-colors">+32 492 44 05 14</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-garage-accent shrink-0" />
              <a href="mailto:info@garagevanhozeham.be" className="hover:text-white transition-colors">info@garagevanhozeham.be</a>
            </li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-white mb-5">{t('footer.nav')}</h3>
          <ul className="space-y-2.5 text-sm text-white/60">
            {[
              [t('nav.home'), "/"],
              [t('nav.inventory'), "/inventory"],
              [t('nav.contact'), "/contact"],
              [t('footer.privacy'), "/privacy"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link to={href} className="hover:text-garage-accent transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Garage van Hozeham. {t('footer.rights')}
          </p>
          <div className="flex gap-4 text-[10px] text-white/20">
            <Link to="/auto-kopen-maasmechelen" className="hover:text-white/40">{t('footer.links.buy')}</Link>
            <Link to="/tweedehands-auto-limburg" className="hover:text-white/40">{t('footer.links.second_hand')}</Link>
            <Link to="/betrouwbare-occasions" className="hover:text-white/40">{t('footer.links.reliable')}</Link>
          </div>
          <p className="text-xs text-white/40">
            {t('footer.slogan')}
          </p>
        </div>
      </div>
    </footer>
  );
}
