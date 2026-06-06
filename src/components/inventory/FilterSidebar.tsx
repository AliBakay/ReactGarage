import type { CarFilters, FuelType } from "../../domain/entities/Car";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

const MAKES = [
  "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Opel", "Ford",
  "Peugeot", "Renault", "Toyota", "Seat", "Skoda", "Kia",
  "Hyundai", "Nissan", "Volvo", "Porsche", "Tesla",
];

const FUEL_OPTIONS: { value: FuelType; label: string; icon: string }[] = [
  { value: "gasoline", label: "Benzine", icon: "⛽" },
  { value: "diesel",   label: "Diesel",  icon: "🔧" },
  { value: "electric", label: "Elektrisch", icon: "⚡" },
  { value: "hybrid",   label: "Hybride", icon: "🌿" },
  { value: "lpg",      label: "LPG",     icon: "💨" },
  { value: "other",    label: "Andere",  icon: "❓" },
];

const CURRENT_YEAR = new Date().getFullYear();

interface Props {
  filters: CarFilters;
  onChange: <K extends keyof CarFilters>(key: K, value: CarFilters[K]) => void;
  onClear: () => void;
  totalCount: number;
}

export function FilterSidebar({ filters, onChange, onClear, totalCount }: Props) {
  const [priceMax, setPriceMax] = useState(filters.maxPrice ?? 80000);
  const hasFilters = Object.values(filters).some(v => v !== undefined && v !== "");
  const { t } = useTranslation();

  return (
    <aside className="bg-white rounded-2xl border border-garage-border p-6 space-y-6 sticky top-24 h-fit shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-garage-accent" />
          <span className="font-semibold text-garage-dark">{t('filters.title')}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-garage-muted bg-slate-100 px-2 py-1 rounded-full font-medium">
            {t('filters.cars_count', { count: totalCount })}
          </span>
          {hasFilters && (
            <button
              onClick={onClear}
              className="text-xs text-garage-accent hover:text-garage-accent2 flex items-center gap-1 font-medium transition-colors"
            >
              <X size={12} /> {t('filters.clear')}
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-garage-darkSub block mb-2">
          {t('filters.search')}
        </label>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-garage-muted" />
          <input
            type="text"
            placeholder={t('filters.search_placeholder')}
            value={filters.search ?? ""}
            onChange={e => onChange("search", e.target.value || undefined)}
            className="w-full bg-slate-50 border border-garage-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-garage-dark placeholder:text-garage-muted focus:outline-none focus:border-garage-accent transition-colors"
          />
        </div>
      </div>

      {/* Make */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-garage-darkSub block mb-2">
          {t('filters.make')}
        </label>
        <select
          value={filters.make ?? ""}
          onChange={e => onChange("make", e.target.value || undefined)}
          className="w-full bg-slate-50 border border-garage-border rounded-xl px-3 py-2.5 text-sm text-garage-dark focus:outline-none focus:border-garage-accent transition-colors cursor-pointer appearance-none"
        >
          <option value="">{t('filters.all_makes')}</option>
          {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Price range */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-garage-darkSub">
            {t('filters.max_price')}
          </label>
          <span className="text-sm font-bold text-garage-accent">
            €{priceMax.toLocaleString('nl-NL')}
          </span>
        </div>
        <input
          type="range" min={0} max={80000} step={1000}
          value={priceMax}
          onChange={e => {
            const v = Number(e.target.value);
            setPriceMax(v);
            onChange("maxPrice", v < 80000 ? v : undefined);
          }}
          className="w-full accent-garage-accent cursor-pointer"
        />
        <div className="flex justify-between text-xs text-garage-muted mt-1.5">
          <span>€0</span><span>€150.000</span>
        </div>
      </div>

      {/* Fuel type */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-garage-darkSub block mb-2">
          {t('filters.fuel')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FUEL_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onChange("fuelType", filters.fuelType === opt.value ? undefined : opt.value)}
              className={cn(
                "text-xs font-medium py-2.5 rounded-xl border transition-all flex items-center justify-center gap-1.5",
                filters.fuelType === opt.value
                  ? "bg-garage-accent text-white border-garage-accent shadow-sm shadow-garage-accent/20"
                  : "bg-slate-50 border-garage-border text-garage-darkSub hover:border-garage-accent/50 hover:text-garage-accent"
              )}
            >
              <span>{opt.icon}</span> {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Year range */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-garage-darkSub block mb-2">
          {t('filters.year')}
        </label>
        <div className="flex gap-2">
          {(["minYear", "maxYear"] as const).map((key, i) => (
            <input
              key={key}
              type="number"
              min={2000}
              max={CURRENT_YEAR}
              placeholder={i === 0 ? t('filters.from') : t('filters.to')}
              value={filters[key] ?? ""}
              onChange={e => onChange(key, e.target.value ? Number(e.target.value) : undefined)}
              className="w-full bg-slate-50 border border-garage-border rounded-xl px-3 py-2.5 text-sm text-garage-dark placeholder:text-garage-muted focus:outline-none focus:border-garage-accent transition-colors"
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
