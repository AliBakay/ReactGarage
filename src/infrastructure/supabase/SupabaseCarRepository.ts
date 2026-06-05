import { supabase } from "./client";
import type { Car, CarFilters, FuelType } from "../../domain/entities/Car";

// ── DTO shape returned by Supabase (snake_case) ──────────────────────────────
interface CarRow {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  car_images?: { image_url: string; display_order: number; is_primary: boolean }[] | null;
  specs_json: Record<string, unknown> | null;
  created_at: string;
  featured: boolean;
  description: string | null;
}

function mapRowToCar(row: CarRow): Car {
  const rawImages = row.car_images ?? [];
  const sortedImages = [...rawImages].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return a.display_order - b.display_order;
  });
  const imagesUrl = sortedImages.map(img => img.image_url);

  const specs = (row.specs_json ?? {}) as {
    horsepower?: number;
    torque?: number;
    engine?: string;
    transmission?: string;
    drivetrain?: string;
    acceleration?: string;
    top_speed?: number;
    seating?: number;
    color?: string;
    doors?: number;
  };
  return {
    id:          row.id,
    make:        row.make,
    model:       row.model,
    year:        row.year,
    price:       row.price,
    mileage:     row.mileage,
    fuelType:    row.fuel_type as FuelType,
    imagesUrl:   imagesUrl,
    specs: {
      horsepower:   specs.horsepower   ?? 0,
      torque:       specs.torque       ?? 0,
      engine:       specs.engine       ?? "N/A",
      transmission: specs.transmission ?? "N/A",
      drivetrain:   specs.drivetrain   ?? "N/A",
      acceleration: specs.acceleration ?? "N/A",
      topSpeed:     specs.top_speed    ?? 0,
      seating:      specs.seating      ?? 5,
      color:        specs.color        ?? "N/A",
      doors:        specs.doors        ?? 4,
    },
    createdAt:  row.created_at,
    featured:   row.featured ?? false,
    description: row.description ?? "",
  };
}


// ── Repository ───────────────────────────────────────────────────────────────
let featuredCarsCache: Car[] | null = null;
let featuredCarsCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const SupabaseCarRepository = {
  async getFilteredCars(filters: CarFilters): Promise<Car[]> {
    try {
      let query = supabase
        .from("cars")
        .select("*, car_images(image_url, display_order, is_primary)")
        .order("featured", { ascending: false })
        .order("price", { ascending: true });

      if (filters.make)                  query = query.ilike("make", `%${filters.make}%`);
      if (filters.fuelType)              query = query.eq("fuel_type", filters.fuelType);
      if (filters.minPrice !== undefined) query = query.gte("price", filters.minPrice);
      if (filters.maxPrice !== undefined) query = query.lte("price", filters.maxPrice);
      if (filters.minYear !== undefined)  query = query.gte("year", filters.minYear);
      if (filters.maxYear !== undefined)  query = query.lte("year", filters.maxYear);
      if (filters.search)
        query = query.or(`make.ilike.%${filters.search}%,model.ilike.%${filters.search}%`);

      const { data, error } = await query;

      if (error) {
        console.warn("Supabase fetch error:", error.message);
        return [];
      }

      // If table is empty
      if (!data || data.length === 0) {
        return [];
      }

      return (data as CarRow[]).map(mapRowToCar);
    } catch (err) {
      console.warn("Network error:", err);
      return [];
    }
  },

  async getCarById(id: string): Promise<Car | null> {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*, car_images(image_url, display_order, is_primary)")
        .eq("id", id)
        .single();

      if (error || !data) {
        return null;
      }

      return mapRowToCar(data as CarRow);
    } catch {
      return null;
    }
  },

  async getFeaturedCars(limit = 6): Promise<Car[]> {
    const now = Date.now();
    if (featuredCarsCache && now - featuredCarsCacheTime < CACHE_TTL) {
      return featuredCarsCache.slice(0, limit);
    }

    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*, car_images(image_url, display_order, is_primary)")
        .eq("featured", true)
        .limit(limit);

      if (error || !data || data.length === 0) {
        return [];
      }

      const cars = (data as CarRow[]).map(mapRowToCar);
      featuredCarsCache = cars;
      featuredCarsCacheTime = now;
      return cars.slice(0, limit);
    } catch {
      return [];
    }
  },

  async addCar(carData: Omit<Car, "id" | "createdAt" | "imagesUrl">, files: File[]): Promise<string> {
    const { data: newCar, error: carError } = await supabase
      .from("cars")
      .insert({
        make: carData.make,
        model: carData.model,
        year: carData.year,
        price: carData.price,
        mileage: carData.mileage,
        fuel_type: carData.fuelType,
        specs_json: {
          horsepower: carData.specs.horsepower,
          torque: carData.specs.torque,
          engine: carData.specs.engine,
          transmission: carData.specs.transmission,
          drivetrain: carData.specs.drivetrain,
          acceleration: carData.specs.acceleration,
          top_speed: carData.specs.topSpeed,
          seating: carData.specs.seating,
          color: carData.specs.color,
          doors: carData.specs.doors,
        },
        featured: carData.featured,
        description: carData.description,
      })
      .select("id")
      .single();

    if (carError || !newCar) {
      throw new Error("Kon voertuig niet toevoegen: " + (carError?.message || "Onbekende fout"));
    }

    const carId = newCar.id;

    if (files && files.length > 0) {
      const imageInserts = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${carId}/${Date.now()}-${i}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("car-images")
          .upload(fileName, file);

        if (!uploadError) {
          const { data: urlData } = supabase.storage.from("car-images").getPublicUrl(fileName);
          imageInserts.push({
            car_id: carId,
            image_url: urlData.publicUrl,
            display_order: i,
            is_primary: i === 0
          });
        }
      }

      if (imageInserts.length > 0) {
        await supabase.from("car_images").insert(imageInserts);
      }
    }

    if (carData.featured) {
      featuredCarsCache = null;
    }

    return carId;
  },
};
