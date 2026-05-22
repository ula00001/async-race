import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Car } from "../types";
import * as garageApi from "../api/garageApi";
import * as winnersApi from "../api/winnersApi";
import { GARAGE_PAGE_LIMIT, RANDOM_CARS_COUNT } from "../utils/constants";
import { generateRandomCar } from "../utils/carNames.ts";

interface GarageState {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  isLoading: boolean;
  createName: string;
  createColor: string;
  editId: number | null;
  editName: string;
  editColor: string;
}

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,
  isLoading: false,
  createName: "",
  createColor: "#00ff00",
  editId: null,
  editName: "",
  editColor: "#ff0000",
};

export const fetchCars = createAsyncThunk(
  "garage/fetchCars",
  async (page: number) => {
    const result = await garageApi.getCars(page, GARAGE_PAGE_LIMIT);
    return { ...result, page };
  },
);

export const createCarAction = createAsyncThunk(
  "garage/createCar",
  async (payload: { name: string; color: string }, { dispatch, getState }) => {
    await garageApi.createCar(payload);
    const state = getState() as { garage: GarageState };
    dispatch(fetchCars(state.garage.currentPage));
  },
);

export const updateCarAction = createAsyncThunk(
  "garage/updateCar",
  async (
    payload: { id: number; name: string; color: string },
    { dispatch, getState },
  ) => {
    await garageApi.updateCar(payload.id, {
      name: payload.name,
      color: payload.color,
    });
    const state = getState() as { garage: GarageState };
    dispatch(fetchCars(state.garage.currentPage));
  },
);

const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    setCreateName(state, action: PayloadAction<string>) {
      state.createName = action.payload;
    },
    setCreateColor(state, action: PayloadAction<string>) {
      state.createColor = action.payload;
    },
    selectCarForEdit(state, action: PayloadAction<Car>) {
      state.editId = action.payload.id;
      state.editName = action.payload.name;
      state.editColor = action.payload.color;
    },
    clearEdit(state) {
      state.editId = null;
      state.editName = "";
      state.editColor = "#ff0000";
    },
    setEditName(state, action: PayloadAction<string>) {
      state.editName = action.payload;
    },
    setEditColor(state, action: PayloadAction<string>) {
      state.editColor = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload.cars;
        state.totalCount = action.payload.totalCount;
        state.currentPage = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const deleteCarAction = createAsyncThunk(
  "garage/deleteCar",
  async (id: number, { dispatch, getState }) => {
    await garageApi.deleteCar(id);
    try {
      await winnersApi.deleteWinner(id);
    } catch {
      // Winner might not exist
    }
    const state = getState() as { garage: GarageState };
    dispatch(fetchCars(state.garage.currentPage));
  },
);

export const generateRandomCars = createAsyncThunk(
  "garage/generateRandom",
  async (_, { dispatch, getState }) => {
    const promises = Array.from({ length: RANDOM_CARS_COUNT }, () => {
      const { name, color } = generateRandomCar();
      return garageApi.createCar({ name, color });
    });
    await Promise.all(promises);
    const state = getState() as { garage: GarageState };
    dispatch(fetchCars(state.garage.currentPage));
  },
);

export const {
  setCreateName,
  setCreateColor,
  selectCarForEdit,
  clearEdit,
  setEditName,
  setEditColor,
  setCurrentPage,
} = garageSlice.actions;

export default garageSlice.reducer;
