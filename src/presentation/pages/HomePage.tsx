import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, Star, TrendingDown, CheckCircle,
  Car, Users, Award, Phone, ChevronRight
} from "lucide-react";
import { AuroraBackground } from "../../components/ui/aceternity";
import { SEO } from "../../components/seo/SEO";
import { CarCard } from "../../components/inventory/CarCard";
import { useCars } from "../hooks/useCars";
import { SupabaseReviewRepository } from "../../infrastructure/supabase/SupabaseReviewRepository";
import type { Review } from "../../domain/entities/Review";
import { useTranslation, Trans } from "react-i18next";

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

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
const statsConfig = [
  { value: "250+",  key: "customers",  icon: <Car size={20} /> },
  { value: "100%",  key: "reliable",   icon: <Star size={20} /> },
  { value: "100%",  key: "inspected",  icon: <Shield size={20} /> },
  { value: "10+",   key: "experience", icon: <Users size={20} /> },
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
  const { t } = useTranslation();

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
      <SEO 
        title="Garage van Hozeham - Premium Tweedehands Auto's in Maasmechelen"
        description="Betrouwbare tweedehands auto's kopen in Maasmechelen. Volledig gekeurd, eerlijk geprijsd en klaar om te rijden. Bekijk ons aanbod!"
        schema={{
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          "name": "Garage van Hozeham",
          "image": "https://garagevanhozeham.be/logo.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Slakweidestraat 40G 1A",
            "addressLocality": "Maasmechelen",
            "postalCode": "3630",
            "addressCountry": "BE"
          },
          "telephone": "+32492440514"
        }}
      />
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
            <span className="text-sm text-white/90 font-medium">{t('home.subtitle')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            <Trans i18nKey="home.hero_title" components={{ 1: <span className="text-transparent bg-clip-text bg-gradient-to-r from-garage-accent to-garage-accent2" /> }} />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            {t('home.hero_desc')}
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
              {t('home.btn_inventory')} <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+32492440514"
              className="btn-ghost-light flex items-center gap-2 text-base px-8 py-4 rounded-2xl"
            >
              <Phone size={18} /> {t('home.btn_call')}
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-14"
          >
            {(t('home.badges', { returnObjects: true }) as string[]).map((b: string) => (
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
            {statsConfig.map(s => {
              const statsLabels = t('home.stats', { returnObjects: true }) as Record<string, string> || {
                customers: "Tevreden Klanten", reliable: "Betrouwbaar", inspected: "Volledig Gekeurd", experience: "Jaar Ervaring"
              };
              return (
                <motion.div
                  key={s.key}
                  variants={fadeUp}
                  className="flex flex-col items-center py-8 gap-2 px-4"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-garage-accent mb-1">
                    {s.icon}
                  </div>
                  <p className="font-display font-extrabold text-3xl text-garage-dark">{s.value}</p>
                  <p className="text-sm text-garage-darkSub text-center">{statsLabels[s.key]}</p>
                </motion.div>
              );
            })}
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
                {t('home.featured_sub')}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="font-display text-3xl md:text-4xl font-bold text-garage-dark"
              >
                {t('home.featured')}
              </motion.h2>
            </div>
            <Link
              to="/inventory"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-garage-accent hover:gap-3 transition-all"
            >
              {t('home.view_all')} <ChevronRight size={16} />
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
              {t('home.view_all')} <ArrowRight size={16} />
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
              {t('home.why_us_sub')}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold text-garage-dark"
            >
              {t('home.why_us_title')}
            </motion.h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((f, i) => {
              const featureTexts = t('home.features', { returnObjects: true }) as { title: string, body: string }[];
              const text = featureTexts?.[i] || f;
              return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="text-center p-8 rounded-2xl border border-garage-border hover:border-garage-accent/30 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-garage-accent mx-auto mb-5 group-hover:bg-garage-accent group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-garage-dark mb-3">{text.title}</h3>
                <p className="text-sm text-garage-darkSub leading-relaxed">{text.body}</p>
              </motion.div>
            )})}
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
                {t('home.testimonials_sub')}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="font-display text-3xl md:text-4xl font-bold text-garage-dark"
              >
                {t('home.testimonials_title')}
              </motion.h2>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {reviews.map(review => (
                <motion.div
                  key={review.id}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 border border-garage-border shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < (review.rating || 5) ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"} 
                      />
                    ))}
                  </div>
                  <p className="text-garage-darkSub text-sm leading-relaxed mb-5 italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-garage-accent rounded-full flex items-center justify-center text-white text-sm font-bold uppercase">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-garage-dark text-sm">{review.name}</p>
                      {review.carBought && <p className="text-xs text-garage-muted">{t('home.purchase') || "Aankoop:"} {review.carBought}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CONTACT CTA (dark blue) ───────────────────────────────────────── */}
      <section className="bg-slate-900 py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="label-tag mb-4 text-white/60 uppercase"
          >
            {t('home.contact_sub')}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-extrabold text-white mb-5"
          >
            <Trans i18nKey="home.contact_title" components={{ 1: <span className="text-garage-accent" /> }} />
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-white/60 text-lg mb-10"
          >
            {t('home.contact_desc')}
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact" className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base w-full sm:w-auto">
              {t('home.contact_btn')} <ArrowRight size={18} />
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="tel:+32492440514" className="btn-ghost-light flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base flex-1">
                <Phone size={18} /> {t('detail.inquiry.call')}
              </a>
              <a href="https://wa.me/32492440514" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white hover:bg-[#1DA851] transition-colors flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base flex-1 font-semibold">
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
