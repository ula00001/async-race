import { MAX_CAR_NAME_LENGTH, MIN_CAR_NAME_LENGTH } from "./constants";

export const validateCarName = (name: string): string | null => {
  const trimmed = name.trim();
  if (trimmed.length < MIN_CAR_NAME_LENGTH) {
    return "Car name cannot be empty";
  }
  if (trimmed.length > MAX_CAR_NAME_LENGTH) {
    return `Car name cannot exceed ${MAX_CAR_NAME_LENGTH} characters`;
  }
  return null;
};
