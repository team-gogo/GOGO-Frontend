// import { SportType } from '@/shared/model/sportTypes';
import DefaultMap from './Default';
import { SportMapProps } from './types';
import VolleyballMap from './Volleyball';

const SportMap = ({ type, onPlayerDrag, players }: SportMapProps) => {
  switch (type) {
    case 'VOLLEY_BALL':
      return <VolleyballMap onPlayerDrag={onPlayerDrag} players={players} />;
    default:
      return <DefaultMap onPlayerDrag={onPlayerDrag} players={players} />;
  }
};

export default SportMap;
