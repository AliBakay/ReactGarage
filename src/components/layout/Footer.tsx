import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Share2, ExternalLink, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

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
            {[Share2, Globe, ExternalLink].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-garage-accent transition-colors"
              >
                <Icon size={16} className="text-white" />
              </a>
            ))}
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
