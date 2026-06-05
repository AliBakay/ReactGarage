import { useState, useEffect, useRef } from "react";
import type { Car, CarFilters } from "../../domain/entities/Car";
import { GetFilteredCars } from "../../application/use-cases/GetFilteredCars";
import { SupabaseCarRepository } from "../../infrastructure/supabase/SupabaseCarRepository";

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [featured, setFeatured] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CarFilters>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce filter changes by 350ms
  useEffect(() => {
    const fetchCars = async (f: CarFilters) => {
      setLoading(true);
      setError(null);
      try {
        const results = await GetFilteredCars(f);
        setCars(results);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchCars(filters), 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [filters]);

  // Load featured cars once
  useEffect(() => {
    SupabaseCarRepository.getFeaturedCars(6)
      .then(setFeatured)
      .catch(() => setFeatured([]));
  }, []);

  const updateFilter = <K extends keyof CarFilters>(key: K, value: CarFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters({});

  return { cars, featured, loading, error, filters, updateFilter, clearFilters };
}
