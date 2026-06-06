import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isLightPage = pathname.startsWith('/beheerpaneel') || pathname.startsWith('/login') || pathname.startsWith('/contact');
  const isNavScrolled = scrolled || isLightPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t('nav.home') },
    { href: "/inventory", label: t('nav.inventory') },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isNavScrolled
          ? "bg-garage-bg/95 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img src="/logo.png" alt="Garage van Hozeham" className="h-12 w-auto group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map(l => (
            <Link
              key={l.href}
              to={l.href}
              className={cn(
                "text-sm font-medium transition-all hover:text-garage-accent relative",
                pathname === l.href
                  ? "text-garage-accent after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-garage-accent after:rounded-full"
                  : "text-white/80"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="tel:+32492440514"
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <Phone size={15} className="text-garage-accent" />
            <span>+32 492 44 05 14</span>
          </a>
          <Link to="/inventory" className="btn-primary text-sm py-2.5 px-5">
            {t('home.btn_inventory')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-garage-bg/98 backdrop-blur-xl border-t border-white/10 px-4 py-6 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-sm font-medium py-2 transition-colors",
                pathname === l.href ? "text-garage-accent" : "text-white/80"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/inventory" className="btn-primary text-sm text-center mt-2">
            {t('home.btn_inventory')}
          </Link>
          <div className="mt-2 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
