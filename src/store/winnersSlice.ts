import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { WinnerWithCar, SortField, SortOrder } from "../types";
import * as winnersApi from "../api/winnersApi";
import * as garageApi from "../api/garageApi";
import { WINNERS_PAGE_LIMIT } from "../utils/constants";

interface WinnersState {
  winners: WinnerWithCar[];
  totalCount: number;
  currentPage: number;
  sortField: SortField;
  sortOrder: SortOrder;
  isLoading: boolean;
}

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
  currentPage: 1,
  sortField: "id",
  sortOrder: "ASC",
  isLoading: false,
};

export const fetchWinners = createAsyncThunk(
  "winners/fetchWinners",
  async (_, { getState }) => {
    const state = getState() as { winners: WinnersState };
    const { currentPage, sortField, sortOrder } = state.winners;
    const result = await winnersApi.getWinners(
      currentPage,
      WINNERS_PAGE_LIMIT,
      sortField,
      sortOrder,
    );

    const winnersWithCars: WinnerWithCar[] = await Promise.all(
      result.winners.map(async (winner) => {
        try {
          const car = await garageApi.getCar(winner.id);
          return { ...winner, car };
        } catch {
          return { ...winner, car: null };
        }
      }),
    );

    return { winners: winnersWithCars, totalCount: result.totalCount };
  },
);

const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {
    setWinnersPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSortField(state, action: PayloadAction<SortField>) {
      if (state.sortField === action.payload) {
        state.sortOrder = state.sortOrder === "ASC" ? "DESC" : "ASC";
      } else {
        state.sortField = action.payload;
        state.sortOrder = "ASC";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.winners = action.payload.winners;
        state.totalCount = action.payload.totalCount;
        state.isLoading = false;
      })
      .addCase(fetchWinners.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setWinnersPage, setSortField } = winnersSlice.actions;

export default winnersSlice.reducer;
