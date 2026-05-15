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
  images_url: string[] | null;
  specs_json: Record<string, unknown> | null;
  created_at: string;
  featured: boolean;
  description: string | null;
}

function mapRowToCar(row: CarRow): Car {
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
    imagesUrl:   row.images_url ?? [],
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

// ── Fallback mock data (shown when DB is unreachable / table empty) ───────────
const MOCK_CARS: Car[] = [
  {
    id: "mock-1", make: "BMW", model: "M4 Competition", year: 2023,
    price: 95000, mileage: 12000, fuelType: "gasoline", featured: true,
    imagesUrl: ["https://images.unsplash.com/photo-1617814076367-b759c7d7e73a?q=80&w=1200&auto=format&fit=crop"],
    description: "Pristine condition M4 Competition. Full service history and remaining factory warranty.",
    specs: { horsepower: 503, torque: 650, engine: "3.0L Twin-Turbo I6", transmission: "8-Speed Automatic", drivetrain: "RWD", acceleration: "3.8s", topSpeed: 290, seating: 4, color: "Sao Paulo Yellow", doors: 2 },
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-2", make: "Porsche", model: "911 Carrera S", year: 2022,
    price: 135000, mileage: 8500, fuelType: "gasoline", featured: true,
    imagesUrl: ["https://images.unsplash.com/photo-1503376713356-20092c6c39f2?q=80&w=1200&auto=format&fit=crop"],
    description: "Iconic 911 in stunning Guards Red. Sport Chrono package included.",
    specs: { horsepower: 443, torque: 530, engine: "3.0L Twin-Turbo Flat-6", transmission: "8-Speed PDK", drivetrain: "RWD", acceleration: "3.5s", topSpeed: 308, seating: 4, color: "Guards Red", doors: 2 },
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-3", make: "Tesla", model: "Model S Plaid", year: 2024,
    price: 105000, mileage: 3000, fuelType: "electric", featured: true,
    imagesUrl: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop"],
    description: "Mind-bending performance. Yoke steering and full self-driving capability.",
    specs: { horsepower: 1020, torque: 1420, engine: "Tri-Motor Electric", transmission: "Single Speed", drivetrain: "AWD", acceleration: "1.99s", topSpeed: 322, seating: 5, color: "Solid Black", doors: 4 },
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-4", make: "Mercedes-Benz", model: "G63 AMG", year: 2021,
    price: 185000, mileage: 35000, fuelType: "gasoline", featured: false,
    imagesUrl: ["https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop"],
    description: "Luxury off-roader with aggressive styling and immense power.",
    specs: { horsepower: 577, torque: 850, engine: "4.0L Bi-Turbo V8", transmission: "9-Speed Automatic", drivetrain: "4WD", acceleration: "4.5s", topSpeed: 240, seating: 5, color: "Obsidian Black", doors: 5 },
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-5", make: "Audi", model: "RS6 Avant", year: 2023,
    price: 128000, mileage: 18000, fuelType: "hybrid", featured: true,
    imagesUrl: ["https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1200&auto=format&fit=crop"],
    description: "The ultimate family supercar. Finished in iconic Nardo Grey.",
    specs: { horsepower: 591, torque: 800, engine: "4.0L Twin-Turbo V8 Mild Hybrid", transmission: "8-Speed Automatic", drivetrain: "Quattro AWD", acceleration: "3.5s", topSpeed: 305, seating: 5, color: "Nardo Grey", doors: 5 },
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-6", make: "Volkswagen", model: "Golf R", year: 2023,
    price: 55000, mileage: 8000, fuelType: "gasoline", featured: false,
    imagesUrl: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop"],
    description: "The hottest hatch. 4MOTION AWD, 320hp, pure driving fun.",
    specs: { horsepower: 320, torque: 420, engine: "2.0L TSI Turbo", transmission: "7-Speed DSG", drivetrain: "4MOTION AWD", acceleration: "4.7s", topSpeed: 270, seating: 5, color: "Lapiz Blue", doors: 5 },
    createdAt: new Date().toISOString(),
  },
];

// Apply in-memory filters to mock data
function applyFilters(cars: Car[], filters: CarFilters): Car[] {
  return cars.filter(car => {
    if (filters.make && !car.make.toLowerCase().includes(filters.make.toLowerCase())) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.minPrice !== undefined && car.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && car.price > filters.maxPrice) return false;
    if (filters.minYear !== undefined && car.year < filters.minYear) return false;
    if (filters.maxYear !== undefined && car.year > filters.maxYear) return false;
    if (filters.search) {
      const s = filters.search.toLowerCase();
      if (!car.make.toLowerCase().includes(s) && !car.model.toLowerCase().includes(s)) return false;
    }
    return true;
  });
}

// ── Repository ───────────────────────────────────────────────────────────────
export const SupabaseCarRepository = {
  async getFilteredCars(filters: CarFilters): Promise<Car[]> {
    try {
      let query = supabase
        .from("cars")
        .select("*")
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
        console.warn("Supabase fetch error, using mock data:", error.message);
        return applyFilters(MOCK_CARS, filters);
      }

      // If table is empty, return mock data
      if (!data || data.length === 0) {
        console.info("No cars in database, using mock data.");
        return applyFilters(MOCK_CARS, filters);
      }

      return (data as CarRow[]).map(mapRowToCar);
    } catch (err) {
      console.warn("Network error, falling back to mock data:", err);
      return applyFilters(MOCK_CARS, filters);
    }
  },

  async getCarById(id: string): Promise<Car | null> {
    // Check mock first for mock IDs
    if (id.startsWith("mock-")) {
      return MOCK_CARS.find(c => c.id === id) ?? null;
    }

    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        return MOCK_CARS.find(c => c.id === id) ?? null;
      }

      return mapRowToCar(data as CarRow);
    } catch {
      return MOCK_CARS.find(c => c.id === id) ?? null;
    }
  },

  async getFeaturedCars(limit = 6): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("featured", true)
        .limit(limit);

      if (error || !data || data.length === 0) {
        console.warn("Featured cars fetch failed, using mock data.");
        return MOCK_CARS.filter(c => c.featured).slice(0, limit);
      }

      return (data as CarRow[]).map(mapRowToCar);
    } catch {
      return MOCK_CARS.filter(c => c.featured).slice(0, limit);
    }
  },
};
