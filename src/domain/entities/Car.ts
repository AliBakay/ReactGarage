export type FuelType = "gasoline" | "diesel" | "electric" | "hybrid" | "lpg" | "other";

export interface CarSpecs {
  horsepower: number;
  torque: number;
  engine: string;
  transmission: string;
  drivetrain: string;
  acceleration: string;
  topSpeed: number;
  seating: number;
  color: string;
  doors: number;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  imagesUrl: string[];
  specs: CarSpecs;
  createdAt: string;
  featured: boolean;
  description: string;
  status: "draft" | "published";
}

export interface CarFilters {
  make?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: FuelType;
  search?: string;
}
