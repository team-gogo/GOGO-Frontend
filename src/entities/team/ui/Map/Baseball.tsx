import { MapComponentProps } from './types';
import SportMap from './index';

const BaseballMapComponent = (props: MapComponentProps) => {
  return <SportMap type="BASE_BALL" {...props} />;
};

export default BaseballMapComponent;
