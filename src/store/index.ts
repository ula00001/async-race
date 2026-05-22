import { configureStore } from "@reduxjs/toolkit";
import garageReducer from "./garageSlice";
import raceReducer from "./raceSlice";
import winnersReducer from "./winnersSlice";

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    race: raceReducer,
    winners: winnersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["race.carStates"],
        ignoredActions: ["race/setCarState", "race/initCarStates"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
