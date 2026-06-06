import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "../../components/seo/SEO";
import { useTranslation } from "react-i18next";
import { GetCarById } from "../../application/use-cases/GetCarById";
import type { Car } from "../../domain/entities/Car";
import {
  ArrowLeft, ChevronLeft, ChevronRight, Fuel, Gauge, Calendar,
  Zap, Settings, Users, Car as CarIcon, Phone, Mail,
  CheckCircle, Shield, Star, X
} from "lucide-react";

const FUEL_LABEL: Record<string, string> = {
  gasoline: "Benzine",
  diesel:   "Diesel",
  electric: "Elektrisch",
  hybrid:   "Hybride",
  lpg:      "LPG",
  other:    "Andere",
};

// ── Image Gallery ────────────────────────────────────────────────────────────
function ImageGallery({ images, make, model }: { images: string[]; make: string; model: string }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const go = (delta: number) => {
    setDir(delta);
    setIdx(i => (i + delta + images.length) % images.length);
  };

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit:   (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0, transition: { duration: 0.3 } }),
  };

  const fallback = `https://placehold.co/1200x700/0a192f/ffffff?text=${encodeURIComponent(make)}`;
  const imgs = images.length > 0 ? images : [fallback];

  return (
    <div className="space-y-3">
      <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/9] shadow-sm border border-garage-border">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={idx}
            src={imgs[idx]}
            alt={`${make} ${model}`}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
            onClick={() => setModalOpen(true)}
            onError={e => { (e.target as HTMLImageElement).src = fallback; }}
          />
        </AnimatePresence>

        {imgs.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white shadow-md transition-all"
            >
              <ChevronLeft size={18} className="text-garage-dark" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white shadow-md transition-all"
            >
              <ChevronRight size={18} className="text-garage-dark" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-garage-accent" : "w-1.5 bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {imgs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
              className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shadow-sm ${
                i === idx ? "border-garage-accent" : "border-garage-border opacity-60 hover:opacity-90"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = fallback; }} />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors">
              <X size={36} />
            </button>
            {imgs.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 transition-colors bg-white/10 rounded-full hover:bg-white/20">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 transition-colors bg-white/10 rounded-full hover:bg-white/20">
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <img 
              src={imgs[idx]} 
              alt={`${make} ${model}`} 
              className="max-w-full max-h-full object-contain cursor-zoom-out rounded-sm shadow-2xl"
              onClick={(e) => { e.stopPropagation(); setModalOpen(false); }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Spec Row ─────────────────────────────────────────────────────────────────
function SpecRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-garage-border last:border-0">
      <div className="flex items-center gap-2.5 text-sm text-garage-darkSub">
        <span className="text-garage-accent">{icon}</span>
        {label}
      </div>
      <span className="text-sm font-semibold text-garage-dark">{value}</span>
    </div>
  );
}

// ── Inquiry Form ──────────────────────────────────────────────────────────────
function InquiryForm({ car }: { car: Car }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    phone:   "",
    message: `Ik heb interesse in de ${car.year} ${car.make} ${car.model} (€${car.price.toLocaleString('nl-NL')}).`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
      <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={28} className="text-green-500" />
      </div>
      <p className="text-xl font-display font-bold text-green-700 mb-2">Aanvraag verzonden!</p>
      <p className="text-sm text-green-600">We nemen binnen 24 uur contact met u op.</p>
    </div>
  );

  const fields = [
    { key: "name" as const,  label: "Naam",     type: "text",  placeholder: "Uw naam",     required: true },
    { key: "email" as const, label: "E-mail",   type: "email", placeholder: "uw@email.com", required: true },
    { key: "phone" as const, label: "Telefoon", type: "text",  placeholder: "+32 ...",      required: false },
  ];

  return (
    <div className="bg-white rounded-2xl border border-garage-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-garage-bg px-6 py-5">
        <h3 className="font-display font-bold text-lg text-white">Informatie Aanvragen</h3>
        <p className="text-sm text-white/60 mt-1">Wij antwoorden binnen 24 uur</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {fields.map(f => (
          <div key={f.key}>
            <label className="text-xs font-semibold text-garage-darkSub uppercase tracking-wider block mb-1.5">
              {f.label}
            </label>
            <input
              type={f.type}
              required={f.required}
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              className="input-light"
              placeholder={f.placeholder}
            />
          </div>
        ))}

        <div>
          <label className="text-xs font-semibold text-garage-darkSub uppercase tracking-wider block mb-1.5">
            Bericht
          </label>
          <textarea
            rows={3}
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            className="input-light resize-none"
          />
        </div>

        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
          <Mail size={16} /> Verstuur Aanvraag
        </button>

        <a
          href="tel:+32000000000"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-garage-border text-garage-darkSub hover:text-garage-dark hover:border-garage-dark transition-all text-sm font-medium"
        >
          <Phone size={16} /> Direct Bellen
        </a>
      </form>

      {/* Trust badges */}
      <div className="border-t border-garage-border px-6 py-4 flex items-center justify-center gap-6">
        {[
          { icon: <Shield size={14} />, text: "Veilig" },
          { icon: <Star size={14} />,   text: "Betrouwbaar" },
          { icon: <CheckCircle size={14} />, text: "Gekeurd" },
        ].map(b => (
          <span key={b.text} className="flex items-center gap-1.5 text-xs text-garage-muted">
            <span className="text-garage-accent">{b.icon}</span>
            {b.text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    async function fetchCar() {
      setLoading(true);
      const c = await GetCarById(id!);
      if (!ignore) { setCar(c); setLoading(false); }
    }
    fetchCar();
    return () => { ignore = true; };
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-garage-surface pt-28 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-garage-accent border-t-transparent rounded-full animate-spin mx-auto mb-4 border-[3px]" />
        <p className="text-garage-darkSub text-sm">Voertuig laden...</p>
      </div>
    </div>
  );

  if (!car) return (
    <div className="min-h-screen bg-garage-surface pt-28 flex flex-col items-center justify-center gap-4">
      <p className="text-xl font-display text-garage-dark">Auto niet gevonden.</p>
      <Link to="/inventory" className="btn-primary">Terug naar Aanbod</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-garage-surface">
      <SEO 
        title={`${car.make} ${car.model} ${car.year} Kopen - Occasion Maasmechelen`}
        description={`Koop deze prachtige ${car.make} ${car.model} uit ${car.year} voor slechts €${car.price.toLocaleString('nl-NL')}. ${car.mileage.toLocaleString('nl-NL')} km op de teller, ${FUEL_LABEL[car.fuelType] || 'benzine'}.`}
        url={`https://garagevanhozeham.be/cars/${car.id}`}
        image={car.imagesUrl[0]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Vehicle",
          "name": `${car.make} ${car.model}`,
          "image": car.imagesUrl[0],
          "brand": { "@type": "Brand", "name": car.make },
          "model": car.model,
          "vehicleModelDate": String(car.year),
          "mileageFromOdometer": { "@type": "QuantitativeValue", "value": car.mileage, "unitCode": "KMT" },
          "fuelType": FUEL_LABEL[car.fuelType],
          "offers": {
            "@type": "Offer",
            "price": car.price,
            "priceCurrency": "EUR",
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": car.status === 'published' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        }}
      />
      {/* Dark header banner */}
      <div className="bg-garage-bg pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} /> {t('common.back_to_inventory')}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: gallery + specs */}
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery images={car.imagesUrl} make={car.make} model={car.model} />

            <div className="space-y-8">
              {/* Title + price */}
              <div className="bg-white rounded-2xl p-6 border border-garage-border shadow-sm">
                <p className="label-tag mb-2">{car.make}</p>
                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-garage-dark mt-1">
                  {car.model}
                  <span className="text-garage-darkSub font-normal text-2xl ml-2">({car.year})</span>
                </h1>
                <p className="font-display font-black text-4xl text-garage-dark">
                  €{car.price.toLocaleString('nl-NL')}
                </p>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-garage-border">
                  {[
                    { icon: <Gauge size={18} />, label: t('common.mileage'), value: `${car.mileage.toLocaleString('nl-NL')} km` },
                    { icon: <Fuel size={18} />,  label: t('common.fuel'),      value: FUEL_LABEL[car.fuelType] },
                    { icon: <Calendar size={18} />, label: t('common.year'),    value: String(car.year) },
                  ].map(s => (
                    <div key={s.label} className="text-center p-4 bg-slate-50 rounded-xl">
                      <div className="text-garage-accent flex justify-center mb-2">{s.icon}</div>
                      <p className="text-xs text-garage-muted">{s.label}</p>
                      <p className="font-bold text-sm text-garage-dark mt-0.5">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              {car.description && (
                <div className="bg-white rounded-2xl p-6 border border-garage-border shadow-sm">
                  <h2 className="font-display font-bold text-xl text-garage-dark mb-4">Over deze auto</h2>
                  <p className="text-sm text-garage-darkSub leading-relaxed">{car.description}</p>
                </div>
              )}

              {/* Specs */}
              <div className="bg-white rounded-2xl p-6 border border-garage-border shadow-sm">
                <h2 className="font-display font-bold text-xl text-garage-dark mb-4">Technische Specificaties</h2>
                <SpecRow icon={<Zap size={14} />}      label="Motor"        value={car.specs.engine} />
                <SpecRow icon={<Zap size={14} />}      label="Vermogen"     value={`${car.specs.horsepower} pk`} />
                <SpecRow icon={<Zap size={14} />}      label="Koppel"       value={`${car.specs.torque} Nm`} />
                <SpecRow icon={<Settings size={14} />} label="Transmissie"  value={car.specs.transmission} />
                <SpecRow icon={<CarIcon size={14} />}  label="Aandrijving"  value={car.specs.drivetrain} />
                <SpecRow icon={<Zap size={14} />}      label="0–100 km/u"   value={car.specs.acceleration} />
                <SpecRow icon={<Gauge size={14} />}    label="Topsnelheid"  value={`${car.specs.topSpeed} km/u`} />
                <SpecRow icon={<Users size={14} />}    label="Zitplaatsen"  value={`${car.specs.seating} plaatsen`} />
                <SpecRow icon={<CarIcon size={14} />}  label="Kleur"        value={car.specs.color} />
                <SpecRow icon={<CarIcon size={14} />}  label="Deuren"       value={`${car.specs.doors} deuren`} />
              </div>
            </div>
          </div>

          {/* Right: sticky inquiry */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <InquiryForm car={car} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
