import { useRef, useState } from 'react';
import BadmintonSvg from '@/shared/assets/svg/Map/Badminton';
import BaseballSvg from '@/shared/assets/svg/Map/Baseball';
import BasketballSvg from '@/shared/assets/svg/Map/Basketball';
import VolleyballSvg from '@/shared/assets/svg/Map/Volleyball';
import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import { SportType } from '@/shared/model/sportTypes';
import { MapComponentProps, Player } from './types';

interface SportMapProps {
  type: SportType;
  players: Player[];
  onPlayerDrag?: (playerId: string, x: number, y: number) => void;
}

const MapComponent = ({
  players,
  onPlayerDrag,
  children,
}: MapComponentProps & { children: React.ReactNode }) => {
  const courtRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);

  const handleMouseDown = (e: React.MouseEvent, playerId: string) => {
    e.stopPropagation();
    setIsDragging(true);
    setActivePlayerId(playerId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && activePlayerId && courtRef.current && onPlayerDrag) {
      const courtRect = courtRef.current.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(e.clientX - courtRect.left - 15, courtRect.width - 30),
      );
      const y = Math.max(
        0,
        Math.min(e.clientY - courtRect.top - 15, courtRect.height - 30),
      );

      onPlayerDrag(activePlayerId, x, y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActivePlayerId(null);
  };

  return (
    <div
      ref={courtRef}
      className="relative flex h-full w-full justify-end rounded-lg bg-[#1e1e1e]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}

      {players.map((player) => (
        <div
          key={player.id}
          style={{
            position: 'absolute',
            left: `${player.x}px`,
            top: `${player.y}px`,
            zIndex: 10,
            cursor:
              isDragging && activePlayerId === player.id ? 'grabbing' : 'grab',
          }}
          className="flex flex-col items-center"
          onMouseDown={(e) => handleMouseDown(e, player.id)}
        >
          <div className="flex h-7 w-7 items-center rounded-full text-center text-white">
            <PlayerIcon className="h-3.5 w-3.5" />
          </div>
          <span className="mt-1 text-center text-body3s text-white">
            {player.name.includes(' ')
              ? player.name.split(' ')[1]
              : player.name}
          </span>
        </div>
      ))}
    </div>
  );
};

const BadmintonMap = (props: MapComponentProps) => (
  <MapComponent {...props}>
    <BadmintonSvg />
  </MapComponent>
);

const BaseballMap = (props: MapComponentProps) => (
  <MapComponent {...props}>
    <BaseballSvg />
  </MapComponent>
);

const BasketballMap = (props: MapComponentProps) => (
  <MapComponent {...props}>
    <BasketballSvg />
  </MapComponent>
);

const VolleyballMap = (props: MapComponentProps) => (
  <MapComponent {...props}>
    <VolleyballSvg />
  </MapComponent>
);

const SportMap = ({ type, onPlayerDrag, players }: SportMapProps) => {
  switch (type) {
    case 'BASKET_BALL':
      return <BasketballMap onPlayerDrag={onPlayerDrag} players={players} />;
    case 'BADMINTON':
      return <BadmintonMap onPlayerDrag={onPlayerDrag} players={players} />;
    case 'BASE_BALL':
      return <BaseballMap onPlayerDrag={onPlayerDrag} players={players} />;
    default:
      return <VolleyballMap onPlayerDrag={onPlayerDrag} players={players} />;
  }
};

export default SportMap;
export { BadmintonMap, BaseballMap, BasketballMap, VolleyballMap };
