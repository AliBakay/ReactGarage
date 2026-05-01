import { Link } from "react-router-dom";
import { Fuel, Gauge, Calendar, ArrowRight } from "lucide-react";
import type { Car } from "../../domain/entities/Car";
import { cn } from "../../lib/utils";

const FUEL_LABEL: Record<string, string> = {
  gasoline: "Petrol",
  diesel: "Diesel",
  electric: "Electric",
  hybrid: "Hybrid",
};

const FUEL_COLOR: Record<string, string> = {
  gasoline: "text-orange-400",
  diesel: "text-blue-400",
  electric: "text-green-400",
  hybrid: "text-teal-400",
};

interface Props {
  car: Car;
  large?: boolean;
}

export function CarCard({ car, large = false }: Props) {
  const thumb = car.imagesUrl[0] ?? `https://placehold.co/800x500/111214/c9a84c?text=${encodeURIComponent(car.make)}`;

  return (
    <Link
      to={`/cars/${car.id}`}
      className={cn(
        "group relative flex flex-col glass rounded-2xl overflow-hidden card-hover border border-garage-border",
        large ? "row-span-2" : ""
      )}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden bg-garage-card", large ? "h-72" : "h-52")}>
        <img
          src={thumb}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {car.featured && (
          <span className="absolute top-3 left-3 bg-garage-accent text-black text-xs font-bold px-2 py-1 rounded-md">
            Featured
          </span>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <div>
          <p className="label-tag">{car.make}</p>
          <h3 className="font-display font-bold text-lg text-garage-text leading-tight mt-0.5">
            {car.model} <span className="text-garage-sub font-normal text-base">({car.year})</span>
          </h3>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-garage-sub">
          <span className="flex items-center gap-1">
            <Gauge size={12} className="text-garage-accent" />
            {car.mileage.toLocaleString()} km
          </span>
          <span className={cn("flex items-center gap-1", FUEL_COLOR[car.fuelType])}>
            <Fuel size={12} />
            {FUEL_LABEL[car.fuelType]}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-garage-accent" />
            {car.year}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto pt-2 border-t border-garage-border">
          <div>
            <p className="text-xs text-garage-sub">Price</p>
            <p className="font-display font-bold text-xl text-garage-accent">
              €{car.price.toLocaleString()}
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-garage-accent opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200">
            View Details <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
