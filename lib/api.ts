import type { CarsResponse } from "@/types/car";

const API_URL = "https://car-rental-api.goit.study";

export async function getCars(page: number = 1): Promise<CarsResponse> {
  const response = await fetch(`${API_URL}/cars?page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }

  return response.json();
}
