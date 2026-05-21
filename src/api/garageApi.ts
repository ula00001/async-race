import { API_BASE_URL } from "../utils/constants";
import type {
  Car,
  CarsResponse,
  CreateCarPayload,
  UpdateCarPayload,
} from "../types";

export const getCars = async (
  page: number,
  limit: number,
): Promise<CarsResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/garage?_page=${page}&_limit=${limit}`,
  );
  const cars: Car[] = await response.json();
  const totalCount = Number(response.headers.get("X-Total-Count")) || 0;
  return { cars, totalCount };
};

export const getCar = async (id: number): Promise<Car> => {
  const response = await fetch(`${API_BASE_URL}/garage/${id}`);
  return response.json();
};

export const createCar = async (payload: CreateCarPayload): Promise<Car> => {
  const response = await fetch(`${API_BASE_URL}/garage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const updateCar = async (
  id: number,
  payload: UpdateCarPayload,
): Promise<Car> => {
  const response = await fetch(`${API_BASE_URL}/garage/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/garage/${id}`, { method: "DELETE" });
};
