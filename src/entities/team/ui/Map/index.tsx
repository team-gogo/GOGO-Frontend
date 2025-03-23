import { useRef, useCallback } from 'react';
import BadmintonSvg from '@/shared/assets/svg/Map/Badminton';
import BaseballSvg from '@/shared/assets/svg/Map/Baseball';
import BasketballSvg from '@/shared/assets/svg/Map/Basketball';
import VolleyballSvg from '@/shared/assets/svg/Map/Volleyball';
import { SportType } from '@/shared/model/sportTypes';

interface SportMapProps {
  type: SportType;
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
}

const MapComponent = ({
  children,
  onPositionChange,
  isMapDragging,
}: {
  children: React.ReactNode;
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
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
      }}
    >
      {children}
    </div>
  );
};

const BadmintonMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
  >
    <BadmintonSvg />
  </MapComponent>
);

const BaseballMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
  >
    <BaseballSvg />
  </MapComponent>
);

const BasketballMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
  >
    <BasketballSvg />
  </MapComponent>
);

const VolleyballMap = (props: {
  onPositionChange?: (x: number, y: number) => void;
  isMapDragging?: boolean;
}) => (
  <MapComponent
    onPositionChange={props.onPositionChange}
    isMapDragging={props.isMapDragging}
  >
    <VolleyballSvg />
  </MapComponent>
);

const SportMap = ({ type, onPositionChange, isMapDragging }: SportMapProps) => {
  switch (type) {
    case 'BASKET_BALL':
      return (
        <BasketballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
        />
      );
    case 'BADMINTON':
      return (
        <BadmintonMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
        />
      );
    case 'BASE_BALL':
      return (
        <BaseballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
        />
      );
    default:
      return (
        <VolleyballMap
          onPositionChange={onPositionChange}
          isMapDragging={isMapDragging}
        />
      );
  }
};

export default SportMap;
