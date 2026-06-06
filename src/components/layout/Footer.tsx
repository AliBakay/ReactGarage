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

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
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
            <li className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-garage-accent shrink-0" />
                <a href="tel:+32492440514" className="hover:text-white transition-colors">+32 492 44 05 14</a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon size={15} className="text-[#25D366] shrink-0" />
                <a href="https://wa.me/32492440514" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">WhatsApp Bericht</a>
              </div>
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
