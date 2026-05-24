import { Link } from "react-router-dom";
import { Fuel, Gauge, Calendar, ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Car } from "../../domain/entities/Car";
import { cn } from "../../lib/utils";

const FUEL_LABEL: Record<string, string> = {
  gasoline: "Benzine",
  diesel:   "Diesel",
  electric: "Elektrisch",
  hybrid:   "Hybride",
  lpg:      "LPG",
  other:    "Andere",
};

const FUEL_COLOR: Record<string, string> = {
  gasoline: "text-orange-500",
  diesel:   "text-blue-500",
  electric: "text-green-500",
  hybrid:   "text-teal-500",
  lpg:      "text-purple-500",
  other:    "text-slate-500",
};

const FUEL_BG: Record<string, string> = {
  gasoline: "bg-orange-50 text-orange-600",
  diesel:   "bg-blue-50 text-blue-600",
  electric: "bg-green-50 text-green-600",
  hybrid:   "bg-teal-50 text-teal-600",
  lpg:      "bg-purple-50 text-purple-600",
  other:    "bg-slate-50 text-slate-600",
};

interface Props {
  car: Car;
  large?: boolean;
}

export function CarCard({ car, large = false }: Props) {
  const [liked, setLiked] = useState(false);
  const thumb =
    car.imagesUrl[0] ??
    `https://placehold.co/800x500/0a192f/ffffff?text=${encodeURIComponent(car.make)}`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn("car-card group flex flex-col", large ? "row-span-2" : "")}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden bg-slate-100", large ? "h-72" : "h-52")}>
        <img
          src={thumb}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Featured badge */}
        {car.featured && (
          <span className="absolute top-3 left-3 bg-garage-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">
            Uitgelicht
          </span>
        )}

        {/* Fuel type badge */}
        <span className={cn(
          "absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full",
          FUEL_BG[car.fuelType]
        )}>
          {FUEL_LABEL[car.fuelType]}
        </span>

        {/* Like button */}
        <button
          onClick={e => { e.preventDefault(); setLiked(l => !l); }}
          className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            size={14}
            className={cn("transition-colors", liked ? "fill-garage-accent text-garage-accent" : "text-slate-400")}
          />
        </button>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1 bg-white">
        {/* Brand + Title */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-garage-accent mb-1">
            {car.make}
          </p>
          <h3 className="font-display font-bold text-lg text-garage-dark leading-tight">
            {car.model}
            <span className="text-garage-darkSub font-normal text-base ml-1">
              ({car.year})
            </span>
          </h3>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-garage-darkSub">
          <span className="flex items-center gap-1.5">
            <Gauge size={13} className="text-garage-accent" />
            {car.mileage.toLocaleString()} km
          </span>
          <span className={cn("flex items-center gap-1.5", FUEL_COLOR[car.fuelType])}>
            <Fuel size={13} />
            {FUEL_LABEL[car.fuelType]}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-garage-accent" />
            {car.year}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-garage-border">
          <div>
            <p className="text-[10px] text-garage-muted uppercase tracking-wider mb-0.5">Prijs</p>
            <p className="font-display font-bold text-2xl text-garage-dark">
              €{car.price.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/cars/${car.id}`}
            className="flex items-center gap-2 bg-garage-accent text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-garage-accent2 transition-all shadow-sm shadow-garage-accent/20 hover:shadow-garage-accent/30"
          >
            Bekijken <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
