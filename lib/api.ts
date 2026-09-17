import type { CarsResponse } from "@/types/car";
import type { FiltersResponse } from "@/types/filters";

const API_URL = "https://car-rental-api.goit.study";

export async function getCars(page: number = 1): Promise<CarsResponse> {
  const response = await fetch(`${API_URL}/cars?page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }

  return response.json();
}

export async function getFilters(): Promise<FiltersResponse> {
  const response = await fetch(`${API_URL}/cars/filters`);

  if (!response.ok) {
    throw new Error("Failed to fetch filters");
  }

  return response.json();
}
