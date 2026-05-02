import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GetCarById } from "../../application/use-cases/GetCarById";
import { TracingBeam } from "../../components/ui/aceternity";
import type { Car } from "../../domain/entities/Car";
import {
  ArrowLeft, ChevronLeft, ChevronRight, Fuel, Gauge, Calendar,
  Zap, Settings, Users, Car as CarIcon, Phone, Mail
} from "lucide-react";

const FUEL_LABEL: Record<string, string> = { gasoline: "Petrol", diesel: "Diesel", electric: "Electric", hybrid: "Hybrid" };

function ImageGallery({ images, make, model }: { images: string[]; make: string; model: string }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (delta: number) => {
    setDir(delta);
    setIdx(i => (i + delta + images.length) % images.length);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0, transition: { duration: 0.3 } }),
  };

  const fallback = `https://placehold.co/1200x700/111214/c9a84c?text=${encodeURIComponent(make)}`;
  const imgs = images.length > 0 ? images : [fallback];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-garage-card aspect-[16/9]">
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
            className="absolute inset-0 w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).src = fallback; }}
          />
        </AnimatePresence>
        {imgs.length > 1 && (
          <>
            <button onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-garage-accent" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
              className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === idx ? "border-garage-accent" : "border-transparent opacity-50 hover:opacity-80"}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = fallback; }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SpecRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-garage-border last:border-0">
      <div className="flex items-center gap-2 text-sm text-garage-sub">
        <span className="text-garage-accent">{icon}</span>
        {label}
      </div>
      <span className="text-sm font-medium text-garage-text">{value}</span>
    </div>
  );
}

function InquiryForm({ car }: { car: Car }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: `I'm interested in the ${car.year} ${car.make} ${car.model} (€${car.price.toLocaleString()}).` });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to Supabase inquiries table or send email
    setSent(true);
  };

  if (sent) return (
    <div className="glass rounded-2xl border border-green-500/30 p-8 text-center">
      <p className="text-2xl font-display font-bold text-green-400 mb-2">Request Sent!</p>
      <p className="text-sm text-garage-sub">We'll contact you within 24 hours.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl border border-garage-border p-6 space-y-4">
      <h3 className="font-display font-bold text-lg">Request Information</h3>
      {(["name", "email", "phone"] as const).map(field => (
        <div key={field}>
          <label className="label-tag block mb-1 capitalize">{field}</label>
          <input
            type={field === "email" ? "email" : "text"}
            required={field !== "phone"}
            value={form[field]}
            onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
            className="w-full bg-garage-card border border-garage-border rounded-xl px-3 py-2.5 text-sm text-garage-text focus:outline-none focus:border-garage-accent transition-colors"
            placeholder={field === "name" ? "Your name" : field === "email" ? "your@email.com" : "+32 ..."}
          />
        </div>
      ))}
      <div>
        <label className="label-tag block mb-1">Message</label>
        <textarea
          rows={3}
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          className="w-full bg-garage-card border border-garage-border rounded-xl px-3 py-2.5 text-sm text-garage-text focus:outline-none focus:border-garage-accent transition-colors resize-none"
        />
      </div>
      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
        <Mail size={16} /> Send Inquiry
      </button>
      <a href="tel:+32000000000" className="btn-ghost w-full flex items-center justify-center gap-2 text-sm">
        <Phone size={16} /> Call Directly
      </a>
    </form>
  );
}

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    async function fetchCar() {
      setLoading(true);
      const c = await GetCarById(id!);
      if (!ignore) {
        setCar(c);
        setLoading(false);
      }
    }
    fetchCar();
    return () => { ignore = true; };
  }, [id]);

  if (loading) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-garage-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!car) return (
    <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xl font-display text-garage-sub">Car not found.</p>
      <Link to="/inventory" className="btn-primary">Back to Inventory</Link>
    </div>
  );

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <Link to="/inventory" className="inline-flex items-center gap-2 text-sm text-garage-sub hover:text-garage-accent transition-colors mb-6">
          <ArrowLeft size={15} /> Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: gallery + specs */}
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery images={car.imagesUrl} make={car.make} model={car.model} />

            <TracingBeam>
              <div className="space-y-8 pl-6">
                {/* Title + price */}
                <div>
                  <p className="label-tag">{car.make}</p>
                  <h1 className="font-display text-3xl md:text-4xl font-extrabold mt-1">
                    {car.model} <span className="text-garage-sub font-normal text-2xl">({car.year})</span>
                  </h1>
                  <p className="text-3xl font-display font-bold text-garage-accent mt-3">
                    €{car.price.toLocaleString()}
                  </p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <Gauge size={18} />, label: "Mileage", value: `${car.mileage.toLocaleString()} km` },
                    { icon: <Fuel size={18} />, label: "Fuel", value: FUEL_LABEL[car.fuelType] },
                    { icon: <Calendar size={18} />, label: "Year", value: String(car.year) },
                  ].map(s => (
                    <div key={s.label} className="glass rounded-xl p-4 text-center border border-garage-border">
                      <div className="text-garage-accent flex justify-center mb-1">{s.icon}</div>
                      <p className="text-xs text-garage-sub">{s.label}</p>
                      <p className="font-semibold text-sm mt-0.5">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                {car.description && (
                  <div>
                    <h2 className="font-display font-bold text-xl mb-3">About this car</h2>
                    <p className="text-sm text-garage-sub leading-relaxed">{car.description}</p>
                  </div>
                )}

                {/* Specs */}
                <div>
                  <h2 className="font-display font-bold text-xl mb-3">Technical Specifications</h2>
                  <div className="glass rounded-2xl border border-garage-border px-4">
                    <SpecRow icon={<Zap size={14} />} label="Engine" value={car.specs.engine} />
                    <SpecRow icon={<Zap size={14} />} label="Horsepower" value={`${car.specs.horsepower} hp`} />
                    <SpecRow icon={<Zap size={14} />} label="Torque" value={`${car.specs.torque} Nm`} />
                    <SpecRow icon={<Settings size={14} />} label="Transmission" value={car.specs.transmission} />
                    <SpecRow icon={<CarIcon size={14} />} label="Drivetrain" value={car.specs.drivetrain} />
                    <SpecRow icon={<Zap size={14} />} label="0–100 km/h" value={car.specs.acceleration} />
                    <SpecRow icon={<Gauge size={14} />} label="Top Speed" value={`${car.specs.topSpeed} km/h`} />
                    <SpecRow icon={<Users size={14} />} label="Seating" value={`${car.specs.seating} seats`} />
                    <SpecRow icon={<CarIcon size={14} />} label="Color" value={car.specs.color} />
                    <SpecRow icon={<CarIcon size={14} />} label="Doors" value={`${car.specs.doors} doors`} />
                  </div>
                </div>
              </div>
            </TracingBeam>
          </div>

          {/* Right: sticky inquiry */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <InquiryForm car={car} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
