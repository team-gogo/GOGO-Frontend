import { SportType } from '@/shared/model/sportTypes';
import SportMap from '../Map';

interface MirrorMapProps {
  type: SportType;
  isMapDragging?: boolean;
  onPositionChange?: (x: number, y: number) => void;
}

const MirrorMap = ({
  type,
  isMapDragging,
  onPositionChange,
}: MirrorMapProps) => {
  return (
    <div className="flex h-full w-full items-stretch">
      <div className="flex-1">
        <SportMap
          type={type}
          isMapDragging={isMapDragging}
          onPositionChange={onPositionChange}
        />
      </div>
      <div className="flex-1">
        <div
          style={{
            transform: 'rotate(180deg)',
            pointerEvents: 'none',
            opacity: 0.5,
            height: '100%',
            width: '100%',
          }}
        >
          <SportMap type={type} isMapDragging={false} />
        </div>
      </div>
    </div>
  );
};

export default MirrorMap;
