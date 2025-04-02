import { z } from 'zod';

const GameCategoryEnum = z.enum([
  'SOCCER',
  'BASKET_BALL',
  'BASE_BALL',
  'VOLLEY_BALL',
  'BADMINTON',
  // 'LOL',
  'ETC',
]);
const GameSystemEnum = z.enum(['TOURNAMENT', 'FULL_LEAGUE', 'SINGLE']);

const GameSchema = z.object({
  category: GameCategoryEnum,
  name: z.string().min(1, '게임 이름을 입력해주세요'),
  system: GameSystemEnum,
  teamMinCapacity: z.number().nullable(),
  teamMaxCapacity: z.number().nullable(),
});

const MiniGameSchema = z.object({
  isActive: z.boolean(),
  maxBettingPoint: z.number().nullable().optional(),
  minBettingPoint: z.number().nullable().optional(),
  initialTicketCount: z.number().nullable().optional(),
});

const ShopItemSchema = z.object({
  isActive: z.boolean(),
  price: z.number().nullable().optional(),
  quantity: z.number().nullable().optional(),
});

export const StageDataSchema = z.object({
  stageName: z.string().min(1, '스테이지 이름을 입력해주세요'),
  game: z.array(GameSchema).min(1, '최소 한 개의 게임을 추가해주세요'),
  initialPoint: z
    .number()
    .positive('초기 포인트는 양수여야 합니다')
    .optional()
    .nullable(),
  rule: z
    .object({
      maxBettingPoint: z
        .number()
        .positive('최대 베팅 포인트는 양수여야 합니다')
        .nullable(),
      minBettingPoint: z
        .number()
        .positive('최소 베팅 포인트는 양수여야 합니다')
        .nullable(),
    })
    .optional()
    .nullable(),
  miniGame: z.object({
    coinToss: MiniGameSchema,
    yavarwee: MiniGameSchema.optional(),
    plinko: MiniGameSchema.optional(),
  }),
  shop: z
    .object({
      coinToss: ShopItemSchema,
      yavarwee: ShopItemSchema,
      plinko: ShopItemSchema,
    })
    .optional(),
  passCode: z.string().optional(),
  maintainer: z.array(z.number()),
});

export type StageData = z.infer<typeof StageDataSchema>;
