import { API_BASE_URL } from "../utils/constants";
import type {
  Winner,
  WinnersResponse,
  CreateWinnerPayload,
  UpdateWinnerPayload,
  SortField,
  SortOrder,
} from "../types";

export const getWinners = async (
  page: number,
  limit: number,
  sort: SortField = "id",
  order: SortOrder = "ASC",
): Promise<WinnersResponse> => {
  const url = `${API_BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
  const response = await fetch(url);
  const winners: Winner[] = await response.json();
  const totalCount = Number(response.headers.get("X-Total-Count")) || 0;
  return { winners, totalCount };
};

export const getWinner = async (id: number): Promise<Winner | null> => {
  const response = await fetch(`${API_BASE_URL}/winners/${id}`);
  const HTTP_NOT_FOUND = 404;
  if (response.status === HTTP_NOT_FOUND) {
    return null;
  }
  return response.json();
};

export const createWinner = async (
  payload: CreateWinnerPayload,
): Promise<Winner> => {
  const response = await fetch(`${API_BASE_URL}/winners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const updateWinner = async (
  id: number,
  payload: UpdateWinnerPayload,
): Promise<Winner> => {
  const response = await fetch(`${API_BASE_URL}/winners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const deleteWinner = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/winners/${id}`, { method: "DELETE" });
};

export const saveWinner = async (
  carId: number,
  time: number,
): Promise<void> => {
  const existingWinner = await getWinner(carId);
  if (existingWinner) {
    await updateWinner(carId, {
      wins: existingWinner.wins + 1,
      time: Math.min(existingWinner.time, time),
    });
  } else {
    await createWinner({ id: carId, wins: 1, time });
  }
};
