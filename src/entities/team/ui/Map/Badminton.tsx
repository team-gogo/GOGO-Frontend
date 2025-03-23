import { MapComponentProps } from './types';
import SportMap from './index';

const BadmintonMapComponent = (props: MapComponentProps) => {
  return <SportMap type="BADMINTON" {...props} />;
};

export default BadmintonMapComponent;
