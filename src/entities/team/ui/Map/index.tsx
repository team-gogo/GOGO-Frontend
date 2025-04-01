import { useRef, useCallback } from 'react';
import BadmintonSvg from '@/shared/assets/svg/Map/Badminton';
import BaseballSvg from '@/shared/assets/svg/Map/Baseball';
import BasketballSvg from '@/shared/assets/svg/Map/Basketball';
import SoccerSvg from '@/shared/assets/svg/Map/Soccer';
import VolleyballSvg from '@/shared/assets/svg/Map/Volleyball';
import { SportType } from '@/shared/model/sportTypes';

interface SportMapProps {
  type: SportType;
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
  isModalUsed?: boolean;
}

const MapComponent = ({
  children,
  onPositionChange,
  isMapDragging,
  isMirrored = false,
  isModalUsed = false,
}: {
  children: React.ReactNode;
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
  isModalUsed?: boolean;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!mapRef.current || !onPositionChange || !isMapDragging) return;

      const rect = mapRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width - 50));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height - 50));

      onPositionChange(x, y);
    },
    [onPositionChange, isMapDragging],
  );

  return (
    <div
      ref={mapRef}
      className={`absolute inset-0 flex w-[200%] justify-end overflow-hidden rounded-lg ${!isModalUsed ? 'bg-[#1e1e1e]' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (isMapDragging && onPositionChange) {
          onPositionChange(-1, -1);
        }
      }}
      style={{
        touchAction: 'none',
        userSelect: 'none',
        pointerEvents: isMapDragging ? 'none' : 'auto',
        transform: isMirrored ? 'scaleX(-1)' : 'none',
        clipPath: isModalUsed ? 'inset(0 50% 0 0)' : 'none',
        width: isModalUsed ? '200%' : '100%',
      }}
    >
      {children}
    </div>
  );
};

const BadmintonMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
  isModalUsed?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
    isMirrored={props.isMirrored}
    isModalUsed={props.isModalUsed}
  >
    <BadmintonSvg />
  </MapComponent>
);

const BaseballMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
  isModalUsed?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
    isMirrored={props.isMirrored}
    isModalUsed={props.isModalUsed}
  >
    <BaseballSvg />
  </MapComponent>
);

const BasketballMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
  isModalUsed?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
    isMirrored={props.isMirrored}
    isModalUsed={props.isModalUsed}
  >
    <BasketballSvg />
  </MapComponent>
);

const VolleyballMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
  isModalUsed?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
    isMirrored={props.isMirrored}
    isModalUsed={props.isModalUsed}
  >
    <VolleyballSvg />
  </MapComponent>
);

const SoccerMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
  isModalUsed?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
    isMirrored={props.isMirrored}
    isModalUsed={props.isModalUsed}
  >
    <SoccerSvg />
  </MapComponent>
);

const SportMap = ({
  type,
  onPositionChange,
  isMapDragging,
  isMirrored,
  isModalUsed = false,
}: SportMapProps) => {
  switch (type) {
    case 'VOLLEY_BALL':
      return (
        <VolleyballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
          isModalUsed={isModalUsed}
        />
      );
    case 'BASKET_BALL':
      return (
        <BasketballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
          isModalUsed={isModalUsed}
        />
      );
    case 'BADMINTON':
      return (
        <BadmintonMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
          isModalUsed={isModalUsed}
        />
      );
    case 'BASE_BALL':
      return (
        <BaseballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
          isModalUsed={isModalUsed}
        />
      );
    case 'SOCCER':
      return (
        <SoccerMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
          isModalUsed={isModalUsed}
        />
      );
    default:
      return (
        <VolleyballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
          isModalUsed={isModalUsed}
        />
      );
  }
};

export default SportMap;
