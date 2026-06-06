import { useCars } from "../hooks/useCars";
import { SEO } from "../../components/seo/SEO";
import { CarCard } from "../../components/inventory/CarCard";
import { FilterSidebar } from "../../components/inventory/FilterSidebar";
import { LayoutGrid, List, AlertCircle, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function InventoryPage() {
  const { cars, loading, error, filters, updateFilter, clearFilters } = useCars();
  const [grid, setGrid] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-garage-surface">
      <SEO 
        title="Aanbod Tweedehands Auto's - Garage van Hozeham"
        description="Bekijk ons volledige aanbod betrouwbare occasions. Professioneel gekeurd en direct rijklaar."
        url="https://garagevanhozeham.be/inventory"
      />
      {/* ── Page header (dark blue) ── */}
      <div className="bg-garage-bg pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-xs font-bold uppercase tracking-widest text-garage-accent mb-2"
          >
            Volledig Aanbod
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-extrabold text-white"
          >
            Bekijk Alle Voertuigen
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="text-white/60 mt-3 text-lg"
          >
            Professioneel gekeurd · Eerlijk geprijsd · Klaar om te rijden
          </motion.p>
        </div>
      </div>

      {/* ── Main content (light grey) ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 shrink-0">
            <FilterSidebar
              filters={filters}
              onChange={updateFilter}
              onClear={clearFilters}
              totalCount={cars.length}
            />
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-xl px-4 py-3 border border-garage-border shadow-sm">
              <p className="text-sm text-garage-darkSub">
                {loading
                  ? "Laden..."
                  : (
                    <span>
                      <strong className="text-garage-dark">{cars.length}</strong>
                      {" "}voertuig{cars.length !== 1 ? "en" : ""} gevonden
                    </span>
                  )
                }
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGrid("grid")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    grid === "grid"
                      ? "bg-garage-accent text-white shadow-sm shadow-garage-accent/20"
                      : "text-garage-darkSub hover:text-garage-dark"
                  )}
                  aria-label="Rasterweergave"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setGrid("list")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    grid === "list"
                      ? "bg-garage-accent text-white shadow-sm shadow-garage-accent/20"
                      : "text-garage-darkSub hover:text-garage-dark"
                  )}
                  aria-label="Lijstweergave"
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-3 text-red-600 mb-6">
                <AlertCircle size={20} className="shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Kon voertuigen niet laden</p>
                  <p className="text-xs text-red-500 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Skeletons */}
            {loading && (
              <div className={cn("grid gap-5", grid === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-80 bg-white rounded-2xl animate-pulse border border-garage-border shadow-sm" />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && cars.length === 0 && (
              <div className="text-center py-24 bg-white rounded-2xl border border-garage-border">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search size={28} className="text-garage-muted" />
                </div>
                <p className="text-xl font-display font-bold text-garage-dark mb-2">Geen auto's gevonden</p>
                <p className="text-sm text-garage-darkSub mb-6">Probeer uw filters aan te passen</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary text-sm px-6 py-2.5"
                >
                  Filters wissen
                </button>
              </div>
            )}

            {/* Car grid */}
            {!loading && !error && cars.length > 0 && (
              <motion.div
                layout
                className={cn("grid gap-5", grid === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}
              >
                {cars.map(car => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CarCard car={car} layout={grid} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
