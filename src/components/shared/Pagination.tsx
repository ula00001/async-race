import { getTotalPages } from "../../utils/helpers";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function Pagination({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const totalPages = getTotalPages(totalCount, itemsPerPage);

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || disabled}
        id="pagination-prev"
      >
        PREV
      </button>
      <span className="pagination-info">
        PAGE {currentPage} / {totalPages}
      </span>
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || disabled}
        id="pagination-next"
      >
        NEXT
      </button>
    </div>
  );
}

export default Pagination;
