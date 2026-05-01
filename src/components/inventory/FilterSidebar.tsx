import type { CarFilters, FuelType } from "../../domain/entities/Car";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

const MAKES = ["BMW", "Mercedes", "Audi", "Volkswagen", "Opel", "Ford", "Peugeot", "Renault", "Toyota", "Seat", "Skoda", "Kia", "Hyundai", "Nissan", "Volvo", "Porsche", "Tesla"];
const FUEL_OPTIONS: { value: FuelType; label: string }[] = [
  { value: "gasoline", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
];
const CURRENT_YEAR = new Date().getFullYear();

interface Props {
  filters: CarFilters;
  onChange: <K extends keyof CarFilters>(key: K, value: CarFilters[K]) => void;
  onClear: () => void;
  totalCount: number;
}

export function FilterSidebar({ filters, onChange, onClear, totalCount }: Props) {
  const [priceMax, setPriceMax] = useState(filters.maxPrice ?? 150000);
  const hasFilters = Object.values(filters).some(v => v !== undefined && v !== "");

  return (
    <aside className="glass rounded-2xl border border-garage-border p-5 space-y-6 sticky top-20 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-garage-accent" />
          <span className="font-semibold text-garage-text">Filters</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-garage-sub">{totalCount} cars</span>
          {hasFilters && (
            <button onClick={onClear} className="text-xs text-garage-accent hover:underline flex items-center gap-1">
              <X size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div>
        <label className="label-tag block mb-2">Search</label>
        <input
          type="text"
          placeholder="Make, model..."
          value={filters.search ?? ""}
          onChange={e => onChange("search", e.target.value || undefined)}
          className="w-full bg-garage-card border border-garage-border rounded-xl px-3 py-2.5 text-sm text-garage-text placeholder:text-garage-muted focus:outline-none focus:border-garage-accent transition-colors"
        />
      </div>

      {/* Make */}
      <div>
        <label className="label-tag block mb-2">Brand</label>
        <div className="relative">
          <select
            value={filters.make ?? ""}
            onChange={e => onChange("make", e.target.value || undefined)}
            className="w-full appearance-none bg-garage-card border border-garage-border rounded-xl px-3 py-2.5 text-sm text-garage-text focus:outline-none focus:border-garage-accent transition-colors cursor-pointer"
          >
            <option value="">All Brands</option>
            {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-garage-sub pointer-events-none" />
        </div>
      </div>

      {/* Price range */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="label-tag">Max Price</label>
          <span className="text-sm font-semibold text-garage-accent">€{priceMax.toLocaleString()}</span>
        </div>
        <input
          type="range" min={0} max={150000} step={1000}
          value={priceMax}
          onChange={e => {
            const v = Number(e.target.value);
            setPriceMax(v);
            onChange("maxPrice", v < 150000 ? v : undefined);
          }}
          className="w-full accent-garage-accent cursor-pointer"
        />
        <div className="flex justify-between text-xs text-garage-muted mt-1">
          <span>€0</span><span>€150,000</span>
        </div>
      </div>

      {/* Fuel type */}
      <div>
        <label className="label-tag block mb-2">Fuel Type</label>
        <div className="grid grid-cols-2 gap-2">
          {FUEL_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onChange("fuelType", filters.fuelType === opt.value ? undefined : opt.value)}
              className={cn(
                "text-xs font-medium py-2 rounded-lg border transition-all",
                filters.fuelType === opt.value
                  ? "bg-garage-accent text-black border-garage-accent"
                  : "bg-garage-card border-garage-border text-garage-sub hover:border-garage-accent/50"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Year range */}
      <div>
        <label className="label-tag block mb-2">Year Range</label>
        <div className="flex gap-2">
          {(["minYear", "maxYear"] as const).map((key, i) => (
            <input
              key={key}
              type="number"
              min={2000}
              max={CURRENT_YEAR}
              placeholder={i === 0 ? "From" : "To"}
              value={filters[key] ?? ""}
              onChange={e => onChange(key, e.target.value ? Number(e.target.value) : undefined)}
              className="w-full bg-garage-card border border-garage-border rounded-xl px-3 py-2.5 text-sm text-garage-text placeholder:text-garage-muted focus:outline-none focus:border-garage-accent transition-colors"
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
