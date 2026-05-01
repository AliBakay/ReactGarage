import { Link } from "react-router-dom";
import { Car, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-garage-border bg-garage-surface mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-garage-accent rounded-lg flex items-center justify-center">
              <Car size={18} className="text-black" />
            </div>
            <span className="font-display font-bold text-lg">ORC <span className="text-garage-accent">Garage</span></span>
          </div>
          <p className="text-sm text-garage-sub leading-relaxed">
            Premium pre-owned vehicles. Professionally inspected, competitively priced.
          </p>
        </div>
        {/* Contact */}
        <div>
          <h3 className="font-semibold text-garage-text mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-garage-sub">
            <li className="flex items-center gap-2"><MapPin size={14} className="text-garage-accent" /> Belgium</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-garage-accent" /> +32 000 000 000</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-garage-accent" /> info@orcgarage.be</li>
          </ul>
        </div>
        {/* Links */}
        <div>
          <h3 className="font-semibold text-garage-text mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-garage-sub">
            {[["Home", "/"], ["Inventory", "/inventory"], ["Contact", "/contact"]].map(([label, href]) => (
              <li key={href}>
                <Link to={href} className="hover:text-garage-accent transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-garage-border text-center py-4 text-xs text-garage-muted">
        © {new Date().getFullYear()} ORC BV Autohandel. All rights reserved.
      </div>
    </footer>
  );
}
