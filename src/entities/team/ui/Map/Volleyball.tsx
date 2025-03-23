import { MapComponentProps } from './types';
import SportMap from './index';

const VolleyballMapComponent = (props: MapComponentProps) => {
  return <SportMap type="VOLLEY_BALL" {...props} />;
};

export default VolleyballMapComponent;
