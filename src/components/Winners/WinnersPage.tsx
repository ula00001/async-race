import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchWinners, setWinnersPage } from "../../store/winnersSlice";
import { WINNERS_PAGE_LIMIT } from "../../utils/constants";
import WinnersTable from "./WinnersTable";
import Pagination from "../shared/Pagination";
import "./WinnersPage.css";

function WinnersPage() {
  const dispatch = useAppDispatch();
  const { totalCount, currentPage, isLoading, sortField, sortOrder } =
    useAppSelector((state) => state.winners);

  useEffect(() => {
    dispatch(fetchWinners());
  }, [dispatch, currentPage, sortField, sortOrder]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setWinnersPage(page));
    },
    [dispatch],
  );

  return (
    <div className="winners-page container">
      <div className="winners-header">
        <h1 className="page-title">🏆 WINNERS</h1>
        <span className="winners-count">
          {totalCount} {totalCount === 1 ? "WINNER" : "WINNERS"}
        </span>
      </div>

      {isLoading ? (
        <div className="winners-loading">LOADING...</div>
      ) : (
        <WinnersTable />
      )}

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        itemsPerPage={WINNERS_PAGE_LIMIT}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default WinnersPage;
