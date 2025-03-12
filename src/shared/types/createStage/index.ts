import { z } from 'zod';
import createFastStageSchema from '@/shared/schema/createFastStageSchema';
import createOfficialStageSchema from '@/shared/schema/createOfficialStageSchema';

export type CreateOfficialStageFormType = z.infer<
  typeof createOfficialStageSchema
>;

export type CreateFastStageFormType = z.infer<typeof createFastStageSchema>;

export type CategoryType =
  | 'SOCCER'
  | 'BASKET_BALL'
  | 'BASE_BALL'
  | 'VOLLEY_BALL'
  | 'BADMINTON'
  | 'LOL'
  | 'ETC';

export type SystemType = 'TOURNAMENT' | 'FULL_LEAGUE' | 'SINGLE';
