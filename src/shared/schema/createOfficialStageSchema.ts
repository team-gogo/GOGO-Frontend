import { z } from 'zod';

const createOfficialStageSchema = z.object({
  stageName: z.string(),
  game: z.array(
    z.object({
      category: z.enum([
        'SOCCER',
        'BASKET_BALL',
        'BASE_BALL',
        'VOLLEY_BALL',
        'BADMINTON',
        'LOL',
        'ETC',
      ]),
      name: z.string(),
      system: z.enum(['TOURNAMENT', 'FULL_LEAGUE', 'SINGLE']),
      teamMinCapacity: z.number().int().optional(),
      teamMaxCapacity: z.number().int().optional(),
    }),
  ),
  initialPoint: z.number().int(),
  rule: z
    .object({
      minBettingPoint: z.number().int().min(1000).max(100000),
      maxBettingPoint: z.number().int().min(1000).max(100000),
    })
    .refine(
      ({ minBettingPoint, maxBettingPoint }) =>
        minBettingPoint < maxBettingPoint,
    ),
  miniGame: z.object({
    coinToss: z.object({
      isActive: z.boolean(),
      maxBettingPoint: z.number().int(),
    }),
    yavarwee: z.object({
      isActive: z.boolean(),
      maxBettingPoint: z.number().int(),
    }),
    plinko: z.object({
      isActive: z.boolean(),
      maxBettingPoint: z.number().int(),
    }),
  }),
  shop: z.object({
    coinToss: z.object({
      isActive: z.boolean(),
      price: z.number().int(),
      quantity: z.number().int(),
    }),
    yavarwee: z.object({
      isActive: z.boolean(),
      price: z.number().int(),
      quantity: z.number().int(),
    }),
    plinko: z.object({
      isActive: z.boolean(),
      price: z.number().int(),
      quantity: z.number().int(),
    }),
  }),
  passCode: z.string().optional(),
  maintainer: z.array(z.number().int()).max(5),
});

export default createOfficialStageSchema;
