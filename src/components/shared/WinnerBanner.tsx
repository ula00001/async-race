import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideWinnerBanner } from "../../store/raceSlice";
import { formatTime } from "../../utils/helpers";
import "./WinnerBanner.css";

function WinnerBanner() {
  const dispatch = useAppDispatch();
  const { showWinnerBanner, winnerName, winnerTime } = useAppSelector(
    (state) => state.race,
  );

  if (!showWinnerBanner) return null;

  const handleClose = () => {
    dispatch(hideWinnerBanner());
  };

  return (
    <div
      className="winner-banner-overlay"
      onClick={handleClose}
      onKeyDown={(e) => e.key === "Escape" && handleClose()}
      role="button"
      tabIndex={0}
    >
      <div
        className="winner-banner"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Race winner announcement"
      >
        <div className="winner-banner-trophy">🏆</div>
        <h2 className="winner-banner-title">WINNER!</h2>
        <p className="winner-banner-name">{winnerName}</p>
        <p className="winner-banner-time">{formatTime(winnerTime)}</p>
        <button
          type="button"
          className="winner-banner-close"
          onClick={handleClose}
          id="close-winner-banner"
        >
          AWESOME!
        </button>
      </div>
    </div>
  );
}

export default WinnerBanner;
