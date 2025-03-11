import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@/shared/assets/icons';
import {
  BadmintonIcon,
  BaseballIcon,
  BasketballIcon,
  EtcIcon,
  LoLIcon,
  SoccerIcon,
  VolleyballIcon,
} from '@/shared/assets/svg';

export type SportType =
  | 'SOCCER'
  | 'BASE_BALL'
  | 'BASKET_BALL'
  | 'VOLLEY_BALL'
  | 'LOL'
  | 'BADMINTON'
  | 'ETC';

export type SortType = 'LATEST' | 'LAST';

export const SPORT_TYPES: Record<
  string,
  { icon: (color?: string) => JSX.Element; text: string }
> = {
  SOCCER: { icon: (color) => <SoccerIcon color={color} />, text: '축구' },
  BASE_BALL: { icon: (color) => <BaseballIcon color={color} />, text: '야구' },
  BASKET_BALL: {
    icon: (color) => <BasketballIcon color={color} />,
    text: '농구',
  },
  VOLLEY_BALL: {
    icon: (color) => <VolleyballIcon color={color} />,
    text: '배구',
  },
  LOL: { icon: (color) => <LoLIcon color={color} />, text: 'LoL' },
  BADMINTON: {
    icon: (color) => <BadmintonIcon color={color} />,
    text: '배드민턴',
  },
  ETC: { icon: (color) => <EtcIcon color={color} />, text: '기타' },
  LATEST: {
    icon: (color) => <ArrowUpIcon color={color || '#526FFE'} size={20} />,
    text: '최신순',
  },
  LAST: {
    icon: (color) => <ArrowDownIcon color={color || '#526FFE'} size={20} />,
    text: '오래된순',
  },
};
