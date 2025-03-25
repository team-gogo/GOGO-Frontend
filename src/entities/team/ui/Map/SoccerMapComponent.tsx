import { MapComponentProps } from './types';
import SportMap from './index';

const SoccerMapComponent = (props: MapComponentProps) => {
  return <SportMap type="SOCCER" {...props} />;
};

export default SoccerMapComponent;
