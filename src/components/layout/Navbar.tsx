import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Car, Phone } from "lucide-react";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/inventory", label: "Inventory" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-heavy border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-garage-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Car size={18} className="text-black" />
          </div>
          <span className="font-display font-bold text-lg text-garage-text">
            ORC <span className="text-garage-accent">Garage</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              to={l.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-garage-accent",
                pathname === l.href ? "text-garage-accent" : "text-garage-sub"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+32000000000" className="flex items-center gap-2 text-sm text-garage-sub hover:text-garage-accent transition-colors">
            <Phone size={15} />
            <span>+32 000 000 000</span>
          </a>
          <Link to="/inventory" className="btn-primary text-sm py-2 px-4">
            Browse Cars
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-garage-sub hover:text-garage-text transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-heavy border-t border-white/5 px-4 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-sm font-medium py-2 transition-colors",
                pathname === l.href ? "text-garage-accent" : "text-garage-sub"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/inventory" className="btn-primary text-sm text-center">
            Browse Cars
          </Link>
        </div>
      )}
    </header>
  );
}
