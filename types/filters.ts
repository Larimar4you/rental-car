export interface FiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export interface CarsFilters {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}
