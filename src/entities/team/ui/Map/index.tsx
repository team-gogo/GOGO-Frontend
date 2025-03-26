import { useRef, useCallback } from 'react';
import BadmintonSvg from '@/shared/assets/svg/Map/Badminton';
import BaseballSvg from '@/shared/assets/svg/Map/Baseball';
import BasketballSvg from '@/shared/assets/svg/Map/Basketball';
import SoccerSvg from '@/shared/assets/svg/Map/SoccerFull';
import VolleyballSvg from '@/shared/assets/svg/Map/Volleyball';
import { SportType } from '@/shared/model/sportTypes';

interface SportMapProps {
  type: SportType;
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
}

const MapComponent = ({
  children,
  onPositionChange,
  isMapDragging,
  isMirrored = false,
}: {
  children: React.ReactNode;
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
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
      className="absolute inset-0 flex h-full w-full justify-end rounded-lg bg-[#1e1e1e]"
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
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
    isMirrored={props.isMirrored}
  >
    <BadmintonSvg />
  </MapComponent>
);

const BaseballMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
    isMirrored={props.isMirrored}
  >
    <BaseballSvg />
  </MapComponent>
);

const BasketballMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
    isMirrored={props.isMirrored}
  >
    <BasketballSvg />
  </MapComponent>
);

const VolleyballMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
    isMirrored={props.isMirrored}
  >
    <VolleyballSvg />
  </MapComponent>
);

const SoccerMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
  isMirrored?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
    isMirrored={props.isMirrored}
  >
    <SoccerSvg />
  </MapComponent>
);

const SportMap = ({
  type,
  onPositionChange,
  isMapDragging,
  isMirrored,
}: SportMapProps) => {
  switch (type) {
    case 'VOLLEY_BALL':
      return (
        <VolleyballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
        />
      );
    case 'BASKET_BALL':
      return (
        <BasketballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
        />
      );
    case 'BADMINTON':
      return (
        <BadmintonMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
        />
      );
    case 'BASE_BALL':
      return (
        <BaseballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
        />
      );
    case 'SOCCER':
      return (
        <SoccerMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
        />
      );
    default:
      return (
        <VolleyballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
          isMirrored={isMirrored}
        />
      );
  }
};

export default SportMap;
