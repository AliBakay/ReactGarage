import type { Car } from "../../domain/entities/Car";
import { SupabaseCarRepository } from "../../infrastructure/supabase/SupabaseCarRepository";

export async function GetCarById(id: string): Promise<Car | null> {
  return SupabaseCarRepository.getCarById(id);
}
