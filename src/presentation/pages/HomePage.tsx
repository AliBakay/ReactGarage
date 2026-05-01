import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, TrendingDown, Zap } from "lucide-react";
import { AuroraBackground } from "../../components/ui/aceternity";
import { CarCard } from "../../components/inventory/CarCard";
import { useCars } from "../hooks/useCars";

const stats = [
  { label: "Cars Available", value: "55+", icon: <Zap size={18} /> },
  { label: "Brands", value: "20+", icon: <Star size={18} /> },
  { label: "Inspected", value: "100%", icon: <Shield size={18} /> },
  { label: "Best Prices", value: "Always", icon: <TrendingDown size={18} /> },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

export default function HomePage() {
  const { featured, loading } = useCars();

  return (
    <div className="pt-16">
      {/* ── Hero ── */}
      <AuroraBackground className="min-h-[92vh]">
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="label-tag mb-4"
          >
            ORC BV Autohandel — Belgium's Premier Selection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-extrabold text-garage-text leading-tight"
          >
            Drive Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-garage-accent to-garage-accent2">
              Dream Car
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="mt-5 text-lg text-garage-sub max-w-xl mx-auto"
          >
            Discover 55+ professionally inspected pre-owned vehicles at competitive prices.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link to="/inventory" className="btn-primary flex items-center gap-2 text-base">
              Browse Inventory <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-ghost text-base">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </AuroraBackground>

      {/* ── Stats Bar ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <div className="glass rounded-2xl border border-garage-border grid grid-cols-2 md:grid-cols-4 divide-x divide-garage-border overflow-hidden">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center py-6 gap-2">
              <div className="text-garage-accent">{s.icon}</div>
              <p className="font-display font-bold text-2xl text-garage-text">{s.value}</p>
              <p className="text-xs text-garage-sub">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Cars ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label-tag mb-2">Hand-Picked Selection</p>
            <h2 className="section-heading">Featured Vehicles</h2>
          </div>
          <Link to="/inventory" className="hidden md:flex items-center gap-2 text-sm text-garage-accent hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 glass rounded-2xl animate-pulse bg-garage-card" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {(featured.length > 0 ? featured : []).map(car => (
              <motion.div key={car.id} variants={item}>
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-10 md:hidden">
          <Link to="/inventory" className="btn-primary inline-flex items-center gap-2">
            View all cars <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="border-t border-garage-border bg-garage-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="text-center mb-12">
            <p className="label-tag mb-2">Why ORC Garage?</p>
            <h2 className="section-heading">Quality You Can Trust</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Shield size={28} />, title: "Inspected & Certified", body: "Every vehicle undergoes a rigorous multi-point inspection before listing." },
              { icon: <Star size={28} />, title: "Premium Selection", body: "Carefully curated inventory from top European and luxury brands." },
              { icon: <TrendingDown size={28} />, title: "Competitive Pricing", body: "Fair market prices with no hidden fees. What you see is what you pay." },
            ].map(f => (
              <div key={f.title} className="glass rounded-2xl p-6 border border-garage-border text-center space-y-3">
                <div className="w-12 h-12 bg-garage-accent/10 rounded-xl flex items-center justify-center text-garage-accent mx-auto">{f.icon}</div>
                <h3 className="font-display font-bold text-lg">{f.title}</h3>
                <p className="text-sm text-garage-sub leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
