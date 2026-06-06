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

function InquiryForm({ car }: { car: Car }) {
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    phone:   "",
    message: `Ik heb interesse in de ${car.year} ${car.make} ${car.model} (€${car.price.toLocaleString('nl-NL')}).`,
  });

  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://formsubmit.co/ajax/info@garagevanhozeham.be", {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        naam: form.name,
        email: form.email,
        telefoon: form.phone || "Niet opgegeven",
        bericht: form.message,
        _subject: `Nieuwe aanvraag: ${car.year} ${car.make} ${car.model}`,
        _template: "table"
      })
    })
    .then(res => res.json())
    .then(() => { setSent(true); setLoading(false); })
    .catch(() => { setSent(true); setLoading(false); });
  };

  if (sent) return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
      <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={28} className="text-green-500" />
      </div>
      <p className="text-xl font-display font-bold text-green-700 mb-2">{t('detail.inquiry.success_title')}</p>
      <p className="text-sm text-green-600">{t('detail.inquiry.success_desc')}</p>
    </div>
  );

  const fields = [
    { key: "name" as const,  label: t('detail.inquiry.name'),     type: "text",  placeholder: "",     required: true },
    { key: "email" as const, label: t('detail.inquiry.email'),   type: "email", placeholder: "", required: true },
    { key: "phone" as const, label: t('detail.inquiry.phone'), type: "text",  placeholder: "",      required: false },
  ];

  return (
    <div className="bg-white rounded-2xl border border-garage-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-garage-bg px-6 py-5">
        <h3 className="font-display font-bold text-lg text-white">{t('detail.inquiry.title')}</h3>
        <p className="text-sm text-white/60 mt-1">{t('detail.inquiry.subtitle')}</p>
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
            {t('detail.inquiry.message')}
          </label>
          <textarea
            rows={3}
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            className="input-light resize-none"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50">
          <Mail size={16} /> {loading ? "Verzenden..." : t('detail.inquiry.submit')}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:+32492440514"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-garage-border text-garage-darkSub hover:text-garage-dark hover:border-garage-dark transition-all text-sm font-medium"
          >
            <Phone size={16} /> {t('detail.inquiry.call')}
          </a>
          <a
            href={`https://wa.me/32492440514?text=${encodeURIComponent(`Hallo, ik heb interesse in de ${car.year} ${car.make} ${car.model} (€${car.price.toLocaleString('nl-NL')}). Is deze nog beschikbaar?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-sm font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg> WhatsApp
          </a>
        </div>
      </form>

      {/* Trust badges */}
      <div className="border-t border-garage-border px-6 py-4 flex items-center justify-center gap-6">
        {[
          { icon: <Shield size={14} />, text: (t('detail.inquiry.badges', { returnObjects: true }) as string[])[0] || "Veilig" },
          { icon: <Star size={14} />,   text: (t('detail.inquiry.badges', { returnObjects: true }) as string[])[1] || "Betrouwbaar" },
          { icon: <CheckCircle size={14} />, text: (t('detail.inquiry.badges', { returnObjects: true }) as string[])[2] || "Gekeurd" },
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
        <p className="text-garage-darkSub text-sm">{t('detail.loading')}</p>
      </div>
    </div>
  );

  if (!car) return (
    <div className="min-h-screen bg-garage-surface pt-28 flex flex-col items-center justify-center gap-4">
      <p className="text-xl font-display text-garage-dark">{t('detail.not_found')}</p>
      <Link to="/inventory" className="btn-primary">{t('common.back_to_inventory')}</Link>
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-garage-border">
                  {[
                    { icon: <Gauge size={18} />, label: t('common.mileage'), value: `${car.mileage.toLocaleString('nl-NL')} km` },
                    { icon: <Fuel size={18} />,  label: t('common.fuel'),      value: FUEL_LABEL[car.fuelType] },
                    { icon: <Calendar size={18} />, label: t('common.year'),    value: String(car.year) },
                    { icon: <Shield size={18} />, label: "Euronorm",    value: car.specs.euronorm || "-" },
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
                  <h2 className="font-display font-bold text-xl text-garage-dark mb-4">{t('detail.about')}</h2>
                  <p className="text-sm text-garage-darkSub leading-relaxed whitespace-pre-line">{car.description}</p>
                </div>
              )}

              {/* Specs */}
              <div className="bg-white rounded-2xl p-6 border border-garage-border shadow-sm">
                <h2 className="font-display font-bold text-xl text-garage-dark mb-4">{t('detail.specs_title')}</h2>
                <SpecRow icon={<Zap size={14} />}      label={t('detail.specs.engine')}        value={car.specs.engine} />
                <SpecRow icon={<Zap size={14} />}      label={t('detail.specs.power')}     value={car.specs.horsepower ? `${car.specs.horsepower} pk (${Math.round(Number(car.specs.horsepower) * 0.735499)} kW)` : "-"} />
                <SpecRow icon={<Zap size={14} />}      label={"Cilinderinhoud"}       value={car.specs.engineCapacity ? `${car.specs.engineCapacity} cc` : "-"} />
                <SpecRow icon={<Settings size={14} />} label={t('detail.specs.transmission')}  value={car.specs.transmission} />
                <SpecRow icon={<CarIcon size={14} />}  label={t('detail.specs.drivetrain')}  value={car.specs.drivetrain} />
                <SpecRow icon={<Zap size={14} />}      label={t('detail.specs.accel')}   value={car.specs.acceleration} />
                <SpecRow icon={<Gauge size={14} />}    label={t('detail.specs.top_speed')}  value={`${car.specs.topSpeed} km/u`} />
                <SpecRow icon={<Users size={14} />}    label={t('detail.specs.seats')}  value={`${car.specs.seating} ${t('detail.specs.seats_unit')}`} />
                <SpecRow icon={<CarIcon size={14} />}  label={t('detail.specs.color')}        value={car.specs.color} />
                <SpecRow icon={<CarIcon size={14} />}  label={t('detail.specs.doors')}       value={`${car.specs.doors} ${t('detail.specs.doors_unit')}`} />
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
