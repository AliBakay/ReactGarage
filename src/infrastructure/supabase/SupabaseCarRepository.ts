import { supabase } from "./client";
import type { Car, CarFilters, FuelType } from "../../domain/entities/Car";

// DTO shape returned by Supabase (snake_case)
interface CarRow {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  images_url: string[];
  specs_json: Record<string, unknown>;
  created_at: string;
  featured: boolean;
  description: string;
}

function mapRowToCar(row: CarRow): Car {
  const specs = row.specs_json as {
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
    id: row.id,
    make: row.make,
    model: row.model,
    year: row.year,
    price: row.price,
    mileage: row.mileage,
    fuelType: row.fuel_type as FuelType,
    imagesUrl: row.images_url ?? [],
    specs: {
      horsepower: specs.horsepower ?? 0,
      torque: specs.torque ?? 0,
      engine: specs.engine ?? "N/A",
      transmission: specs.transmission ?? "N/A",
      drivetrain: specs.drivetrain ?? "N/A",
      acceleration: specs.acceleration ?? "N/A",
      topSpeed: specs.top_speed ?? 0,
      seating: specs.seating ?? 5,
      color: specs.color ?? "N/A",
      doors: specs.doors ?? 4,
    },
    createdAt: row.created_at,
    featured: row.featured ?? false,
    description: row.description ?? "",
  };
}

export const SupabaseCarRepository = {
  async getFilteredCars(filters: CarFilters): Promise<Car[]> {
    let query = supabase
      .from("cars")
      .select("*")
      .order("featured", { ascending: false })
      .order("price", { ascending: true });

    if (filters.make) query = query.ilike("make", `%${filters.make}%`);
    if (filters.fuelType) query = query.eq("fuel_type", filters.fuelType);
    if (filters.minPrice !== undefined) query = query.gte("price", filters.minPrice);
    if (filters.maxPrice !== undefined) query = query.lte("price", filters.maxPrice);
    if (filters.minYear !== undefined) query = query.gte("year", filters.minYear);
    if (filters.maxYear !== undefined) query = query.lte("year", filters.maxYear);
    if (filters.search)
      query = query.or(
        `make.ilike.%${filters.search}%,model.ilike.%${filters.search}%`
      );

    const { data, error } = await query;
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return (data as CarRow[]).map(mapRowToCar);
  },

  async getCarById(id: string): Promise<Car | null> {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return mapRowToCar(data as CarRow);
  },

  async getFeaturedCars(limit = 6): Promise<Car[]> {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("featured", true)
      .limit(limit);
    if (error) throw new Error(`Supabase error: ${error.message}`);
    return (data as CarRow[]).map(mapRowToCar);
  },
};
