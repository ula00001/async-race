import { API_BASE_URL } from "../utils/constants";
import type { EngineResponse, DriveResponse } from "../types";

export const startEngine = async (id: number): Promise<EngineResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/engine?id=${id}&status=started`,
    {
      method: "PATCH",
    },
  );
  return response.json();
};

export const stopEngine = async (id: number): Promise<EngineResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/engine?id=${id}&status=stopped`,
    {
      method: "PATCH",
    },
  );
  return response.json();
};

export const driveEngine = async (
  id: number,
  signal?: AbortSignal,
): Promise<DriveResponse> => {
  const response = await fetch(`${API_BASE_URL}/engine?id=${id}&status=drive`, {
    method: "PATCH",
    signal,
  });

  const HTTP_SERVER_ERROR = 500;
  if (response.status === HTTP_SERVER_ERROR) {
    return { success: false };
  }

  return response.json();
};
