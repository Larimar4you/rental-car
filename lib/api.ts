import type { Car, CarsResponse } from "@/types/car";
import type { CarsFilters, FiltersResponse } from "@/types/filters";

const API_URL = "https://car-rental-api.goit.study";

export async function getCars(
  page: number = 1,
  filters: CarsFilters = {},
): Promise<CarsResponse> {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (filters.brand) {
    params.set("brand", filters.brand);
  }

  if (filters.price !== undefined) {
    params.set("price", String(filters.price));
  }

  if (filters.minMileage !== undefined) {
    params.set("minMileage", String(filters.minMileage));
  }

  if (filters.maxMileage !== undefined) {
    params.set("maxMileage", String(filters.maxMileage));
  }

  const response = await fetch(`${API_URL}/cars?${params.toString()}`);

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

export async function getCarById(id: string): Promise<Car> {
  const response = await fetch(`${API_URL}/cars/${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch car details");
  }

  return response.json();
}

export interface BookingRequest {
  name: string;
  email: string;
  comment: string;
}

interface BookingResponse {
  message: string;
}

export async function createBookingRequest(
  carId: string,
  booking: BookingRequest,
): Promise<BookingResponse> {
  const response = await fetch(
    `${API_URL}/cars/${encodeURIComponent(carId)}/booking-requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create booking request");
  }

  return response.json();
}
