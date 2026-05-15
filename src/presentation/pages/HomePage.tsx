import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, Star, TrendingDown, CheckCircle,
  Car, Users, Award, Phone, ChevronRight
} from "lucide-react";
import { AuroraBackground } from "../../components/ui/aceternity";
import { CarCard } from "../../components/inventory/CarCard";
import { useCars } from "../hooks/useCars";

// ── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

// ── Stats data ──────────────────────────────────────────────────────────────
const stats = [
  { value: "250+",  label: "Verkochte Auto's",  icon: <Car size={20} /> },
  { value: "20+",   label: "Merken",             icon: <Star size={20} /> },
  { value: "100%",  label: "Professioneel Gekeurd", icon: <Shield size={20} /> },
  { value: "99%",   label: "Tevreden Klanten",   icon: <Users size={20} /> },
];

// ── Why us features ─────────────────────────────────────────────────────────
const features = [
  {
    icon: <Shield size={28} />,
    title: "Gekeurd & Gecertificeerd",
    body:  "Elk voertuig ondergaat een strenge meerpunts-inspectie voordat het wordt aangeboden.",
  },
  {
    icon: <Award size={28} />,
    title: "Premium Selectie",
    body:  "Zorgvuldig geselecteerde voorraad van de beste Europese en internationale merken.",
  },
  {
    icon: <TrendingDown size={28} />,
    title: "Scherpe Prijzen",
    body:  "Eerlijke marktprijzen zonder verborgen kosten. Wat u ziet is wat u betaalt.",
  },
];

// ── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Jan Vermeersch",
    role: "Aankoop BMW M4",
    text: "Uitstekende ervaring van begin tot einde. De auto was precies zoals beschreven en de service was top.",
    avatar: "JV",
  },
  {
    name: "Sarah Desmet",
    role: "Aankoop Tesla Model S",
    text: "Professioneel team, eerlijke prijzen en een vlotte afhandeling. Ik raad AutoDeal aan iedereen aan!",
    avatar: "SD",
  },
  {
    name: "Thomas Claes",
    role: "Aankoop Porsche 911",
    text: "Geweldige selectie en geen verrassingen achteraf. Ze hebben het inspectieproces volledig transparent gemaakt.",
    avatar: "TC",
  },
];

export default function HomePage() {
  const { featured, loading } = useCars();

  return (
    <div>
      {/* ── HERO (dark blue, Aurora) ─────────────────────────────────────── */}
      <AuroraBackground className="min-h-screen pt-20">
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm"
          >
            <CheckCircle size={14} className="text-garage-accent" />
            <span className="text-sm text-white/90 font-medium">België's betrouwbare autohandel</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            Vind uw{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-garage-accent to-garage-accent2">
              Droomauto
            </span>
            <br />in België
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Ontdek ons ruime aanbod van professioneel gekeurde tweedehands auto's
            tegen de scherpste prijzen. Transparant, betrouwbaar en zonder zorgen.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link
              to="/inventory"
              className="btn-primary flex items-center gap-2 text-base px-8 py-4 rounded-2xl"
            >
              Bekijk Aanbod <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+32000000000"
              className="btn-ghost-light flex items-center gap-2 text-base px-8 py-4 rounded-2xl"
            >
              <Phone size={18} /> Bel Ons Nu
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-14"
          >
            {["✓ Geen verborgen kosten", "✓ Volledige keuring", "✓ Garantie mogelijk", "✓ Financiering beschikbaar"].map(b => (
              <span key={b} className="text-sm text-white/60 font-medium">{b}</span>
            ))}
          </motion.div>
        </div>
      </AuroraBackground>

      {/* ── STATS BAR (white, elevated) ──────────────────────────────────── */}
      <section className="bg-white border-b border-garage-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-garage-border"
          >
            {stats.map(s => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="flex flex-col items-center py-8 gap-2 px-4"
              >
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-garage-accent mb-1">
                  {s.icon}
                </div>
                <p className="font-display font-extrabold text-3xl text-garage-dark">{s.value}</p>
                <p className="text-sm text-garage-darkSub text-center">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED CARS (light grey background) ────────────────────────── */}
      <section className="bg-garage-surface py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="label-tag mb-2"
              >
                Zorgvuldig geselecteerd
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="font-display text-3xl md:text-4xl font-bold text-garage-dark"
              >
                Uitgelichte Voertuigen
              </motion.h2>
            </div>
            <Link
              to="/inventory"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-garage-accent hover:gap-3 transition-all"
            >
              Bekijk alles <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-white rounded-2xl animate-pulse border border-garage-border shadow-sm"
                />
              ))}
            </div>
          ) : featured.length === 0 ? (
            /* ── Fallback when no data ── */
            <div className="text-center py-16">
              <p className="text-garage-darkSub text-lg mb-2">Laden van voertuigen...</p>
              <p className="text-garage-muted text-sm">Neem contact op als dit aanhoudt.</p>
            </div>
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {featured.map(car => (
                <motion.div key={car.id} variants={fadeUp}>
                  <CarCard car={car} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-10 md:hidden">
            <Link to="/inventory" className="btn-primary inline-flex items-center gap-2">
              Bekijk alle auto's <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US (white background) ─────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-garage-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="label-tag mb-3"
            >
              Waarom AutoDeal?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold text-garage-dark"
            >
              Kwaliteit die u kunt vertrouwen
            </motion.h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map(f => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="text-center p-8 rounded-2xl border border-garage-border hover:border-garage-accent/30 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-garage-accent mx-auto mb-5 group-hover:bg-garage-accent group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-garage-dark mb-3">{f.title}</h3>
                <p className="text-sm text-garage-darkSub leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS (light grey) ─────────────────────────────────────── */}
      <section className="bg-garage-surface py-20 border-t border-garage-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="label-tag mb-3"
            >
              Wat klanten zeggen
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold text-garage-dark"
            >
              Tevreden klanten
            </motion.h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map(t => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-garage-border shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-garage-darkSub text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-garage-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-garage-dark text-sm">{t.name}</p>
                    <p className="text-xs text-garage-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT CTA (dark blue) ───────────────────────────────────────── */}
      <section className="bg-garage-bg py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="label-tag mb-4 text-white/60 uppercase"
          >
            Neem contact op
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-extrabold text-white mb-5"
          >
            Heeft u een{" "}
            <span className="text-garage-accent">vraag?</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-white/60 text-lg mb-10"
          >
            Ons team staat klaar om u te helpen bij het vinden van de perfecte auto.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact" className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-base">
              Stuur een bericht <ArrowRight size={18} />
            </Link>
            <a href="tel:+32000000000" className="btn-ghost-light flex items-center gap-2 px-8 py-4 rounded-2xl text-base">
              <Phone size={18} /> +32 000 000 000
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
