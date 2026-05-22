import type { SortField, WinnerWithCar } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSortField } from "../../store/winnersSlice";
import { formatTime } from "../../utils/helpers";
import CarIcon from "../Garage/CarIcon";

interface WinnersTableHeaderProps {
  sortField: SortField;
  sortOrder: "ASC" | "DESC";
  onSort: (field: SortField) => void;
}

function WinnersTableHeader({
  sortField,
  sortOrder,
  onSort,
}: WinnersTableHeaderProps) {
  const getSortIndicator = (field: SortField): string => {
    if (sortField !== field) return "";
    return sortOrder === "ASC" ? "▲" : "▼";
  };

  const getThClass = (field: SortField): string => {
    const classes = ["sortable"];
    if (sortField === field) classes.push("active-sort");
    return classes.join(" ");
  };

  return (
    <thead>
      <tr>
        <th>№</th>
        <th>CAR</th>
        <th>NAME</th>
        <th className={getThClass("wins")} onClick={() => onSort("wins")}>
          WINS
          <span className="sort-indicator">{getSortIndicator("wins")}</span>
        </th>
        <th className={getThClass("time")} onClick={() => onSort("time")}>
          BEST TIME
          <span className="sort-indicator">{getSortIndicator("time")}</span>
        </th>
      </tr>
    </thead>
  );
}

interface WinnersTableRowProps {
  winner: WinnerWithCar;
  index: number;
}

function WinnersTableRow({ winner, index }: WinnersTableRowProps) {
  return (
    <tr>
      <td>
        <span className="winner-number">{index + 1}</span>
      </td>
      <td>
        <CarIcon color={winner.car?.color ?? "#888888"} />
      </td>
      <td>
        <span className="winner-name">
          {winner.car?.name ?? `Car #${winner.id}`}
        </span>
      </td>
      <td>
        <span className="winner-wins">{winner.wins}</span>
      </td>
      <td>
        <span className="winner-time">{formatTime(winner.time)}</span>
      </td>
    </tr>
  );
}

function WinnersTable() {
  const dispatch = useAppDispatch();
  const { winners, sortField, sortOrder } = useAppSelector(
    (state) => state.winners,
  );

  if (winners.length === 0) {
    return (
      <div className="winners-empty">🏁 NO WINNERS YET — START A RACE!</div>
    );
  }

  return (
    <div className="winners-table-wrapper">
      <table className="winners-table">
        <WinnersTableHeader
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={(field) => dispatch(setSortField(field))}
        />
        <tbody>
          {winners.map((winner, index) => (
            <WinnersTableRow key={winner.id} winner={winner} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WinnersTable;
