import { MapComponentProps } from './types';
import SportMap from './index';

const BasketballMapComponent = (props: MapComponentProps) => {
  return <SportMap type="BASKET_BALL" {...props} />;
};

export default BasketballMapComponent;
