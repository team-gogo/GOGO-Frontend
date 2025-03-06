import { z } from 'zod';
import createOfficialStageSchema from '@/shared/schema/createOfficialStageSchema';

export type CreateOfficialStageFormType = z.infer<
  typeof createOfficialStageSchema
>;

export type CategoryType =
  | 'SOCCER'
  | 'BASKET_BALL'
  | 'BASE_BALL'
  | 'VOLLEY_BALL'
  | 'BADMINTON'
  | 'LOL'
  | 'ETC';
