import { useCallback, useRef, useEffect } from 'react';
import type { RefObject } from 'react';
import type { Car } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCarForEdit, deleteCarAction } from '../../store/garageSlice';
import {
  initCarState,
  setEngineStarted,
  setCarBroken,
  setCarFinished,
  resetCar,
} from '../../store/raceSlice';
import * as engineApi from '../../api/engineApi';

const TRACK_OFFSET_PX = 70;

export function useCarTrackAnimation(
  carRef: RefObject<HTMLDivElement | null>,
  roadRef: RefObject<HTMLDivElement | null>,
  carPosition: number | undefined,
  carDuration: number | undefined,
  isBroken: boolean | undefined,
) {
  useEffect(() => {
    if (
      !carRef.current ||
      !roadRef.current ||
      carPosition === undefined ||
      carDuration === undefined
    )
      return;
    const roadWidth = roadRef.current.offsetWidth;
    const maxTranslate = roadWidth - TRACK_OFFSET_PX;

    if (carPosition > 0 && carDuration > 0) {
      carRef.current.style.transitionDuration = `${carDuration}ms`;
      carRef.current.style.transform = `translateY(-50%) translateX(${maxTranslate}px)`;
    } else {
      carRef.current.style.transitionDuration = '0ms';
      carRef.current.style.transform = 'translateY(-50%) translateX(0px)';
    }
  }, [carRef, roadRef, carPosition, carDuration]);

  useEffect(() => {
    if (!carRef.current || !isBroken) return;
    const computedStyle = window.getComputedStyle(carRef.current);
    const currentTransform = computedStyle.transform;
    carRef.current.style.transitionDuration = '0ms';
    carRef.current.style.transform = currentTransform;
  }, [carRef, isBroken]);
}

export function useCarEngine(carId: number) {
  const dispatch = useAppDispatch();

  const handleStart = useCallback(async () => {
    try {
      const result = await engineApi.startEngine(carId);
      const duration = result.distance / result.velocity;
      dispatch(setEngineStarted({ id: carId, duration }));
      const driveResult = await engineApi.driveEngine(carId);
      dispatch(driveResult.success ? setCarFinished(carId) : setCarBroken(carId));
    } catch {
      dispatch(setCarBroken(carId));
    }
  }, [dispatch, carId]);

  const handleStop = useCallback(async () => {
    try {
      await engineApi.stopEngine(carId);
    } catch {
      // Ignore stop errors
    }
    dispatch(resetCar(carId));
  }, [dispatch, carId]);

  return { handleStart, handleStop };
}

export function useCarTrack(car: Car) {
  const dispatch = useAppDispatch();
  const carState = useAppSelector((state) => state.race.carStates[car.id]);
  const isRaceActive = useAppSelector((state) => state.race.isRaceActive);
  const carRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(initCarState(car.id));
  }, [dispatch, car.id]);

  useCarTrackAnimation(carRef, roadRef, carState?.position, carState?.duration, carState?.isBroken);

  const { handleStart, handleStop } = useCarEngine(car.id);

  const handleSelect = useCallback(() => {
    dispatch(selectCarForEdit(car));
  }, [dispatch, car]);

  const handleDelete = useCallback(() => {
    dispatch(deleteCarAction(car.id));
  }, [dispatch, car.id]);

  return {
    carState,
    isRaceActive,
    carRef,
    roadRef,
    handleStart,
    handleStop,
    handleSelect,
    handleDelete,
  };
}
