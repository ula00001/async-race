import type { Car } from '../../types';
import CarIcon from './CarIcon';
import { useCarTrack } from './useCarTrack';
import './CarTrack.css';

interface CarTrackProps {
  car: Car;
}

interface EngineButtonsProps {
  id: number;
  isEngineOn: boolean;
  onStart: () => void;
  onStop: () => void;
}

function EngineButtons({ id, isEngineOn, onStart, onStop }: EngineButtonsProps) {
  return (
    <div className="car-track-controls">
      <button
        type="button"
        className="engine-btn engine-btn-start"
        onClick={onStart}
        disabled={isEngineOn}
        title="Start engine"
        id={`start-engine-${id}`}
      >
        ▶
      </button>
      <button
        type="button"
        className="engine-btn engine-btn-stop"
        onClick={onStop}
        disabled={!isEngineOn}
        title="Stop engine"
        id={`stop-engine-${id}`}
      >
        ■
      </button>
    </div>
  );
}

interface ActionButtonsProps {
  id: number;
  onSelect: () => void;
  onDelete: () => void;
}

function ActionButtons({ id, onSelect, onDelete }: ActionButtonsProps) {
  return (
    <div className="car-track-actions">
      <button
        type="button"
        className="btn btn-cyan btn-sm"
        onClick={onSelect}
        disabled={false}
        id={`select-car-${id}`}
      >
        SELECT
      </button>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={onDelete}
        disabled={false}
        id={`remove-car-${id}`}
      >
        REMOVE
      </button>
    </div>
  );
}

interface TrackHeaderProps {
  car: Car;
  isEngineOn: boolean;
  onStart: () => void;
  onStop: () => void;
  onSelect: () => void;
  onDelete: () => void;
}

function CarTrackHeader({
  car,
  isEngineOn,
  onStart,
  onStop,
  onSelect,
  onDelete,
}: TrackHeaderProps) {
  return (
    <div className="car-track-header">
      <EngineButtons id={car.id} isEngineOn={isEngineOn} onStart={onStart} onStop={onStop} />
      <span className="car-track-name" style={{ color: car.color }}>
        {car.name}
      </span>
      <ActionButtons id={car.id} onSelect={onSelect} onDelete={onDelete} />
    </div>
  );
}

function CarTrack({ car }: CarTrackProps) {
  const { carState, carRef, roadRef, handleStart, handleStop, handleSelect, handleDelete } =
    useCarTrack(car);

  const isEngineOn = carState?.isEngineStarted ?? false;
  const isDriving = carState?.isDriving ?? false;
  const isBroken = carState?.isBroken ?? false;

  const carClasses = ['car-track-car', isDriving ? 'driving' : '', isBroken ? 'broken' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className="car-track">
      <CarTrackHeader
        car={car}
        isEngineOn={isEngineOn}
        onStart={handleStart}
        onStop={handleStop}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
      <div className="car-track-road" ref={roadRef}>
        <div className="car-track-finish" />
        <div className={carClasses} ref={carRef}>
          <CarIcon color={car.color} />
          {isBroken && <span className="car-track-broken">💥</span>}
        </div>
      </div>
    </div>
  );
}

export default CarTrack;
