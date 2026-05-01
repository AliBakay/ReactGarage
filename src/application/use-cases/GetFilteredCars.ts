import type { Car, CarFilters } from "../../domain/entities/Car";
import { SupabaseCarRepository } from "../../infrastructure/supabase/SupabaseCarRepository";

export async function GetFilteredCars(filters: CarFilters): Promise<Car[]> {
  return SupabaseCarRepository.getFilteredCars(filters);
}
