import { useRaceControls } from "./useRaceControls";
import "./RaceControls.css";

function RaceControls() {
  const { cars, isRaceActive, handleRace, handleReset, handleGenerate } =
    useRaceControls();

  return (
    <div className="race-controls">
      <div className="race-controls-group">
        <button
          type="button"
          className="btn btn-green"
          onClick={handleRace}
          disabled={isRaceActive || cars.length === 0}
          id="race-btn"
        >
          RACE
        </button>
        <button
          type="button"
          className="btn btn-pink"
          onClick={handleReset}
          disabled={!isRaceActive}
          id="reset-btn"
        >
          RESET
        </button>
      </div>
      <div className="race-controls-spacer" />
      <button
        type="button"
        className="btn btn-cyan"
        onClick={handleGenerate}
        disabled={false}
        id="generate-cars-btn"
      >
        GENERATE CARS
      </button>
    </div>
  );
}

export default RaceControls;
