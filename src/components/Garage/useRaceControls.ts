import { useCallback } from "react";
import type { Car } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { generateRandomCars, fetchCars } from "../../store/garageSlice";
import {
  setRaceActive,
  setEngineStarted,
  setCarBroken,
  setCarFinished,
  setWinner,
  resetAllCars,
} from "../../store/raceSlice";
import * as engineApi from "../../api/engineApi";
import * as winnersApi from "../../api/winnersApi";

const MS_PER_SECOND = 1000;

export function useRaceReset(cars: Car[], currentPage: number) {
  const dispatch = useAppDispatch();
  return useCallback(async () => {
    dispatch(resetAllCars());
    await Promise.all(
      cars.map((c) => engineApi.stopEngine(c.id).catch(() => {})),
    );
    dispatch(fetchCars(currentPage));
  }, [dispatch, cars, currentPage]);
}

export function useRaceExecution(cars: Car[]) {
  const dispatch = useAppDispatch();

  const runCarDrive = useCallback(
    async (car: Car, dur: number, win: (t: number) => Promise<void>) => {
      try {
        const res = await engineApi.driveEngine(car.id);
        dispatch(res.success ? setCarFinished(car.id) : setCarBroken(car.id));
        if (res.success) await win(dur / MS_PER_SECOND);
      } catch {
        dispatch(setCarBroken(car.id));
      }
    },
    [dispatch],
  );

  const handleRace = useCallback(async () => {
    if (cars.length === 0) return;
    dispatch(setRaceActive(true));

    const startResults = await Promise.all(
      cars.map(async (car) => {
        const res = await engineApi.startEngine(car.id);
        const duration = res.distance / res.velocity;
        dispatch(setEngineStarted({ id: car.id, duration }));
        return { car, duration };
      }),
    );

    let winnerFound = false;
    await Promise.all(
      startResults.map(({ car, duration }) =>
        runCarDrive(car, duration, async (time) => {
          if (!winnerFound) {
            winnerFound = true;
            dispatch(setWinner({ id: car.id, name: car.name, time }));
            await winnersApi.saveWinner(car.id, time);
          }
        }),
      ),
    );
  }, [dispatch, cars, runCarDrive]);

  return handleRace;
}

export function useRaceControls() {
  const dispatch = useAppDispatch();
  const { cars, currentPage } = useAppSelector((state) => state.garage);
  const { isRaceActive } = useAppSelector((state) => state.race);
  const handleRace = useRaceExecution(cars);
  const handleReset = useRaceReset(cars, currentPage);

  const handleGenerate = useCallback(() => {
    dispatch(generateRandomCars());
  }, [dispatch]);

  return {
    cars,
    isRaceActive,
    handleRace,
    handleReset,
    handleGenerate,
  };
}
