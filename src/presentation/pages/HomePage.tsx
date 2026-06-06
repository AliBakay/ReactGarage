import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, Star, TrendingDown, CheckCircle,
  Car, Users, Award, Phone, ChevronRight
} from "lucide-react";
import { AuroraBackground } from "../../components/ui/aceternity";
import { CarCard } from "../../components/inventory/CarCard";
import { useCars } from "../hooks/useCars";
import { SupabaseReviewRepository } from "../../infrastructure/supabase/SupabaseReviewRepository";
import type { Review } from "../../domain/entities/Review";

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
  { value: "250+",  label: "Tevreden Klanten",  icon: <Car size={20} /> },
  { value: "100%",  label: "Betrouwbaar",             icon: <Star size={20} /> },
  { value: "100%",  label: "Volledig Gekeurd", icon: <Shield size={20} /> },
  { value: "10+",   label: "Jaar Ervaring",   icon: <Users size={20} /> },
];

// ── Why us features ─────────────────────────────────────────────────────────
const features = [
  {
    icon: <Shield size={28} />,
    title: "Gekeurd & Betrouwbaar",
    body:  "Elk voertuig wordt grondig nagekeken en volledig gekeurd voordat het wordt aangeboden, zodat u veilig de weg op kan.",
  },
  {
    icon: <Award size={28} />,
    title: "Kwalitatieve Occasions",
    body:  "We bieden een eerlijk en zorgvuldig gekozen aanbod aan tweedehands auto's voor elk budget.",
  },
  {
    icon: <TrendingDown size={28} />,
    title: "Eerlijke Prijzen",
    body:  "Transparante prijzen zonder verborgen kosten of verrassingen achteraf. We houden het graag duidelijk.",
  },
];

export default function HomePage() {
  const { featured, loading } = useCars();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await SupabaseReviewRepository.getPublishedReviews();
        setReviews(data);
      } catch (error) {
        console.error("Error loading reviews", error);
      } finally {
        setReviewsLoading(false);
      }
    }
    fetchReviews();
  }, []);

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
            <span className="text-sm text-white/90 font-medium">Uw lokale autobedrijf</span>
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
              Betrouwbare
            </span>
            <br />Occasion
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Ontdek ons ruime aanbod van eerlijke en betrouwbare tweedehands auto's.
            Transparant, veilig en direct bij u in de buurt.
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
            {["✓ Volledig nagekeken", "✓ Inclusief CarPass", "✓ Transparante historie", "✓ Persoonlijke service"].map(b => (
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
                Onze Aanraders
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="font-display text-3xl md:text-4xl font-bold text-garage-dark"
              >
                Uitgelichte Auto's
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
            <div className="text-center py-16">
              <p className="text-garage-darkSub text-lg mb-2">Er zijn momenteel geen auto's uitgelicht.</p>
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
              Waarom voor ons kiezen?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold text-garage-dark"
            >
              Uw vertrouwde garage in de buurt
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
      {!reviewsLoading && reviews.length > 0 && (
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
                Wat klanten over ons zeggen
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="font-display text-3xl md:text-4xl font-bold text-garage-dark"
              >
                Tevreden klanten uit de regio
              </motion.h2>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {reviews.map(t => (
                <motion.div
                  key={t.id}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 border border-garage-border shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < (t.rating || 5) ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"} 
                      />
                    ))}
                  </div>
                  <p className="text-garage-darkSub text-sm leading-relaxed mb-5 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-garage-accent rounded-full flex items-center justify-center text-white text-sm font-bold uppercase">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-garage-dark text-sm">{t.name}</p>
                      {t.carBought && <p className="text-xs text-garage-muted">Aankoop: {t.carBought}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

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
            Kom gerust langs voor een kop koffie en een proefrit. We helpen u graag op weg!
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact" className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-base">
              Neem contact op <ArrowRight size={18} />
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
