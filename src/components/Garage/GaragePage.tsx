import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCars, setCurrentPage } from "../../store/garageSlice";
import { GARAGE_PAGE_LIMIT } from "../../utils/constants";
import CarForm from "./CarForm";
import RaceControls from "./RaceControls";
import CarTrack from "./CarTrack";
import Pagination from "../shared/Pagination";
import WinnerBanner from "../shared/WinnerBanner";
import "./GaragePage.css";

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

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
      dispatch(fetchCars(page));
    },
    [dispatch],
  );

  return (
    <div className="garage-page container">
      <GarageHeader totalCount={totalCount} />
      <CarForm />
      <RaceControls />

      {isLoading && <div className="garage-loading">LOADING...</div>}

      {!isLoading && cars.length === 0 && <GarageEmpty />}

      {!isLoading && cars.length > 0 && (
        <div className="garage-cars-list">
          {cars.map((car) => (
            <CarTrack key={car.id} car={car} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        itemsPerPage={GARAGE_PAGE_LIMIT}
        onPageChange={handlePageChange}
      />
      <WinnerBanner />
    </div>
  );
}

export default GaragePage;
