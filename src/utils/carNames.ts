import { CAR_BRANDS, CAR_MODELS } from "./constants";

const getRandomElement = <T>(arr: T[]): T => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index] as T;
};

export const generateRandomCarName = (): string => {
  const brand = getRandomElement(CAR_BRANDS);
  const model = getRandomElement(CAR_MODELS);
  return `${brand} ${model}`;
};

export const generateRandomColor = (): string => {
  const HEX_BASE = 16;
  const HEX_PAD_LENGTH = 6;
  const MAX_COLOR = 0xffffff;
  return `#${Math.floor(Math.random() * MAX_COLOR)
    .toString(HEX_BASE)
    .padStart(HEX_PAD_LENGTH, "0")}`;
};

export const generateRandomCar = (): { name: string; color: string } => ({
  name: generateRandomCarName(),
  color: generateRandomColor(),
});
