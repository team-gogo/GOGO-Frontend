import { SportType } from '@/shared/model/sportTypes';

export const categoryTypes: SportType[] = [
  'VOLLEY_BALL',
  'SOCCER',
  // 'LOL',
  'BASE_BALL',
  'BASKET_BALL',
  'BADMINTON',
  'ETC',
];

export const getCategoryLabel = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    VOLLEY_BALL: '배구',
    SOCCER: '축구',
    // LOL: 'LOL',
    BASE_BALL: '야구',
    BASKET_BALL: '농구',
    BADMINTON: '배드민턴',
    ETC: '기타',
  };
  return categoryMap[category] || category;
};
