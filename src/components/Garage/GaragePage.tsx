import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCars } from "../../store/garageSlice";
import CarForm from "./CarForm";
import "./GaragePage.css";
import CarTrack from "./CarTrack.tsx";

interface GarageHeaderProps {
  totalCount: number;
}

function GarageHeader({ totalCount }: GarageHeaderProps) {
  return (
    <div className="garage-header">
      <h1 className="page-title">GARAGE</h1>
      <span className="garage-count">
        {totalCount} {totalCount === 1 ? "CAR" : "CARS"}
      </span>
    </div>
  );
}

function GarageEmpty() {
  return (
    <div className="garage-empty">
      <span className="garage-empty-text">NO CARS IN GARAGE</span>
      <span className="garage-empty-hint">
        Create a car or generate random to get started
      </span>
    </div>
  );
}

function GaragePage() {
  const dispatch = useAppDispatch();
  const { cars, totalCount, currentPage, isLoading } = useAppSelector(
    (state) => state.garage,
  );

  useEffect(() => {
    dispatch(fetchCars(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="garage-page container">
      <GarageHeader totalCount={totalCount} />
      <CarForm />

      {isLoading && <div className="garage-loading">LOADING...</div>}

      {!isLoading && cars.length === 0 && <GarageEmpty />}

        {!isLoading && cars.length > 0 && (
            <div className="garage-cars-list">
                {cars.map((car) => (
                    <CarTrack key={car.id} car={car} />
                ))}
            </div>
        )}
    </div>
  );
}

export default GaragePage;
