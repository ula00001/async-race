export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface CreateCarPayload {
  name: string;
  color: string;
}

export interface UpdateCarPayload {
  name: string;
  color: string;
}

export interface CarsResponse {
  cars: Car[];
  totalCount: number;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface CreateWinnerPayload {
  id: number;
  wins: number;
  time: number;
}

export interface UpdateWinnerPayload {
  wins: number;
  time: number;
}

export interface WinnersResponse {
  winners: Winner[];
  totalCount: number;
}

export type SortField = "id" | "wins" | "time";
export type SortOrder = "ASC" | "DESC";
