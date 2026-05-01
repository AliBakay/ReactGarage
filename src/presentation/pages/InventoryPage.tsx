import { useCars } from "../hooks/useCars";
import { CarCard } from "../../components/inventory/CarCard";
import { FilterSidebar } from "../../components/inventory/FilterSidebar";
import { LayoutGrid, List, AlertCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export default function InventoryPage() {
  const { cars, loading, error, filters, updateFilter, clearFilters } = useCars();
  const [grid, setGrid] = useState<"grid" | "list">("grid");

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="label-tag mb-1">Full Inventory</p>
          <h1 className="section-heading">Browse All Vehicles</h1>
        </div>

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
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-garage-sub">
                {loading ? "Loading..." : `${cars.length} vehicle${cars.length !== 1 ? "s" : ""} found`}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGrid("grid")}
                  className={cn("p-2 rounded-lg transition-colors", grid === "grid" ? "bg-garage-accent text-black" : "glass text-garage-sub hover:text-garage-text")}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setGrid("list")}
                  className={cn("p-2 rounded-lg transition-colors", grid === "list" ? "bg-garage-accent text-black" : "glass text-garage-sub hover:text-garage-text")}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="glass rounded-2xl border border-red-500/30 p-6 flex items-center gap-3 text-red-400">
                <AlertCircle size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Skeletons */}
            {loading && (
              <div className={cn("grid gap-5", grid === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-72 glass rounded-2xl animate-pulse bg-garage-card" />
                ))}
              </div>
            )}

            {/* Cars */}
            {!loading && !error && cars.length === 0 && (
              <div className="text-center py-20 text-garage-sub">
                <p className="text-2xl font-display mb-2">No cars found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}

            {!loading && !error && cars.length > 0 && (
              <div className={cn("grid gap-5", grid === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                {cars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
