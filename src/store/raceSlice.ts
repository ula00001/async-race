import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CarRaceState {
  position: number;
  isEngineStarted: boolean;
  isDriving: boolean;
  isFinished: boolean;
  isBroken: boolean;
  duration: number;
}

interface RaceState {
  carStates: Record<number, CarRaceState>;
  isRaceActive: boolean;
  winnerId: number | null;
  winnerName: string;
  winnerTime: number;
  showWinnerBanner: boolean;
}

const initialState: RaceState = {
  carStates: {},
  isRaceActive: false,
  winnerId: null,
  winnerName: "",
  winnerTime: 0,
  showWinnerBanner: false,
};

const defaultCarState: CarRaceState = {
  position: 0,
  isEngineStarted: false,
  isDriving: false,
  isFinished: false,
  isBroken: false,
  duration: 0,
};

const raceSlice = createSlice({
  name: "race",
  initialState,
  reducers: {
    initCarState(state, action: PayloadAction<number>) {
      if (!state.carStates[action.payload]) {
        state.carStates[action.payload] = { ...defaultCarState };
      }
    },
    setEngineStarted(
      state,
      action: PayloadAction<{ id: number; duration: number }>,
    ) {
      const carState = state.carStates[action.payload.id];
      if (carState) {
        carState.isEngineStarted = true;
        carState.isDriving = true;
        carState.duration = action.payload.duration;
        carState.position = 100;
      }
    },
    setCarBroken(state, action: PayloadAction<number>) {
      const carState = state.carStates[action.payload];
      if (carState) {
        carState.isBroken = true;
        carState.isDriving = false;
      }
    },
    setCarFinished(state, action: PayloadAction<number>) {
      const carState = state.carStates[action.payload];
      if (carState) {
        carState.isFinished = true;
        carState.isDriving = false;
      }
    },
    resetCar(state, action: PayloadAction<number>) {
      state.carStates[action.payload] = { ...defaultCarState };
    },
  },
});

export const {
  initCarState,
  setEngineStarted,
  setCarBroken,
  setCarFinished,
  resetCar,
} = raceSlice.actions;

export default raceSlice.reducer;
