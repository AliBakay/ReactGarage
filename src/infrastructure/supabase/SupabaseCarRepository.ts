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
  status: string | null;
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
    status:     (row.status as "draft" | "published") ?? "published",
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
        .eq("status", "published")
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

  async getAdminCars(): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*, car_images(image_url, display_order, is_primary)")
        .order("created_at", { ascending: false });

      if (error || !data) return [];
      return (data as CarRow[]).map(mapRowToCar);
    } catch {
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
        .eq("status", "published")
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
        status: carData.status,
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

  async updateCar(id: string, carData: Partial<Omit<Car, "id" | "createdAt" | "imagesUrl">>, newFiles: File[], deletedImageUrls: string[] = []): Promise<void> {
    const specsPayload = carData.specs ? {
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
    } : undefined;

    const payload: any = {};
    if (carData.make !== undefined) payload.make = carData.make;
    if (carData.model !== undefined) payload.model = carData.model;
    if (carData.year !== undefined) payload.year = carData.year;
    if (carData.price !== undefined) payload.price = carData.price;
    if (carData.mileage !== undefined) payload.mileage = carData.mileage;
    if (carData.fuelType !== undefined) payload.fuel_type = carData.fuelType;
    if (carData.featured !== undefined) payload.featured = carData.featured;
    if (carData.description !== undefined) payload.description = carData.description;
    if (carData.status !== undefined) payload.status = carData.status;
    if (specsPayload) payload.specs_json = specsPayload;

    if (Object.keys(payload).length > 0) {
      const { error: carError } = await supabase.from("cars").update(payload).eq("id", id);
      if (carError) throw new Error("Kon auto niet bijwerken: " + carError.message);
    }

    if (deletedImageUrls.length > 0) {
      await supabase.from("car_images").delete().in("image_url", deletedImageUrls);
      const filePaths = deletedImageUrls.map(url => {
        const parts = url.split("car-images/");
        return parts.length > 1 ? parts[1] : null;
      }).filter(Boolean) as string[];
      
      if (filePaths.length > 0) {
        await supabase.storage.from("car-images").remove(filePaths);
      }
    }

    if (newFiles && newFiles.length > 0) {
      const imageInserts = [];
      const { data: existingImages } = await supabase.from("car_images").select("display_order").eq("car_id", id).order("display_order", { ascending: false }).limit(1);
      const startOrder = existingImages && existingImages.length > 0 ? existingImages[0].display_order + 1 : 0;

      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${id}/${Date.now()}-${i}.${fileExt}`;

        const { error: uploadError } = await supabase.storage.from("car-images").upload(fileName, file);

        if (!uploadError) {
          const { data: urlData } = supabase.storage.from("car-images").getPublicUrl(fileName);
          imageInserts.push({
            car_id: id,
            image_url: urlData.publicUrl,
            display_order: startOrder + i,
            is_primary: (startOrder + i) === 0
          });
        }
      }

      if (imageInserts.length > 0) {
        await supabase.from("car_images").insert(imageInserts);
      }
    }

    featuredCarsCache = null;
  },

  async deleteCar(id: string): Promise<void> {
    const { data: images } = await supabase.from("car_images").select("image_url").eq("car_id", id);
    
    if (images && images.length > 0) {
      const filePaths = images.map(img => {
        const parts = img.image_url.split("car-images/");
        return parts.length > 1 ? parts[1] : null;
      }).filter(Boolean) as string[];

      if (filePaths.length > 0) {
        await supabase.storage.from("car-images").remove(filePaths);
      }
    }

    const { error } = await supabase.from("cars").delete().eq("id", id);
    if (error) throw new Error("Kon auto niet verwijderen: " + error.message);
    
    featuredCarsCache = null;
  }
};
