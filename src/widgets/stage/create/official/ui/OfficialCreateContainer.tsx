'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import GameInputBox from '@/entities/stage/create/official/ui/GameInputBox';
import {
  CircleQuestionIcon,
  CoinIcon,
  PlinkoIcon,
  SearchIcon,
  ShellGameIcon,
  TicketIcon,
} from '@/shared/assets/icons';
import { PointIcon } from '@/shared/assets/svg';
import { SPORT_TYPES } from '@/shared/model/sportTypes';
import {
  CategoryType,
  CreateOfficialStageFormType,
} from '@/shared/types/createStage';
import BackPageButton from '@/shared/ui/backPageButton/index';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import MiniGameButton from '@/shared/ui/miniGameButton';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

const miniGameList: {
  name: string;
  value: 'coinToss' | 'yavarwee' | 'plinko';
  icon: ({ size, color }: { size: number; color: string }) => JSX.Element;
}[] = [
  { name: '야바위', value: 'yavarwee', icon: ShellGameIcon },
  { name: '코인토스', value: 'coinToss', icon: CoinIcon },
  { name: '플린코', value: 'plinko', icon: PlinkoIcon },
];

const shopList: {
  name: string;
  value: 'coinToss' | 'yavarwee' | 'plinko';
}[] = [
  { name: '야바위', value: 'yavarwee' },
  { name: '코인토스', value: 'coinToss' },
  { name: '플린코', value: 'plinko' },
];

const OfficialCreateContainer = () => {
  const { register, watch, setValue, unregister } =
    useForm<CreateOfficialStageFormType>({
      defaultValues: {
        miniGame: {
          yavarwee: { isActive: false },
          coinToss: { isActive: false },
          plinko: { isActive: false },
        },
        shop: {
          yavarwee: { isActive: false },
          coinToss: { isActive: false },
          plinko: { isActive: false },
        },
      },
    });
  const [gameList, setGameList] = useState<`${CategoryType}-${number}`[]>([]);

  const handleDeleteButtonClick = (idx: number) => {
    const filteredGameList = gameList.filter((_, i) => i !== idx);
    const newlyNumberedGameList = filteredGameList.map(
      (game, idx) =>
        `${game.split('-')[0]}-${idx}` as `${CategoryType}-${number}`,
    );
    setGameList(newlyNumberedGameList);
    unregister(`game.${idx}.category`, undefined);
    unregister(`game.${idx}.name`, undefined);
    unregister(`game.${idx}.system`, undefined);
    unregister(`game.${idx}.teamMinCapacity`, undefined);
    unregister(`game.${idx}.teamMaxCapacity`, undefined);

    setValue(
      'game',
      watch('game') && watch('game').filter((_, i) => i !== idx),
    );
  };

  const handleMiniGameToggleClick = (
    id: 'coinToss' | 'yavarwee' | 'plinko',
  ) => {
    const fieldName = `miniGame.${id}.isActive` as const;
    setValue(fieldName, !watch(fieldName));
  };

  const handleShopToggleClick = (id: 'coinToss' | 'yavarwee' | 'plinko') => {
    const fieldName = `shop.${id}.isActive` as const;
    setValue(fieldName, !watch(fieldName));
  };

  const handleSportTypeClick = (type: string) => {
    setGameList((prev) => [
      ...prev,
      `${type}-${prev.length}` as `${CategoryType}-${number}`,
    ]);
  };
  console.log(watch());

  return (
    <form
      className={cn('w-[1322px]', 'flex', 'flex-col', 'h-fit', 'my-[80px]')}
    >
      <div className={cn('flex', 'items-center', 'gap-24')}>
        <BackPageButton label="" />
        <h1 className={cn('text-title4s', 'text-white')}>
          스테이지 생성 (학교 공식 행사)
        </h1>
      </div>

      <div className={cn('w-full', 'flex', 'flex-col', 'gap-16', 'mt-[52px]')}>
        <h2 className={cn('text-body2e', 'text-white')}>스테이지</h2>
        <div className={cn('w-full', 'flex', 'gap-24')}>
          <div
            className={cn('w-full', 'flex', 'flex-col', 'items-end', 'gap-4')}
          >
            <Input
              placeholder="이름을 입력해주세요."
              maxLength={20}
              {...register('stageName')}
            />
            <p
              className={cn(
                'text-body3s',
                watch('stageName') && watch('stageName').length > 0
                  ? 'text-main-600'
                  : 'text-gray-500',
              )}
            >
              {(watch('stageName') && watch('stageName').length) || 0}
              /20
            </p>
          </div>
          <div className={cn('w-full', 'flex', 'gap-24')}>
            <Input
              placeholder="초기 보유 포인트"
              icon={<PointIcon />}
              {...register('initialPoint', { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>

      <div className={cn('w-full', 'flex', 'flex-col', 'mt-[48px]')}>
        <h2 className={cn('text-body2e', 'text-white')}>경기</h2>
        <div className={cn('w-full', 'flex', 'flex-wrap', 'gap-16', 'mt-16')}>
          {Object.entries(SPORT_TYPES)
            .filter(([type]) => !['LATEST', 'LAST'].includes(type))
            .map(([type]) => (
              <SportTypeLabel
                key={type}
                type={type}
                asButton
                onClick={() => handleSportTypeClick(type)}
              />
            ))}
        </div>
        <div className={cn('w-full', 'flex', 'flex-col', 'gap-20', 'mt-20')}>
          {gameList.map((game) => (
            <GameInputBox
              key={game}
              register={register}
              watch={watch}
              setValue={setValue}
              handleDeleteButtonClick={handleDeleteButtonClick}
              id={game}
            />
          ))}
        </div>
      </div>

      <div className={cn('w-full', 'flex', 'flex-col', 'mt-[48px]')}>
        <h2 className={cn('text-body2e', 'text-white')}>규칙</h2>
        <div className={cn('mt-16', 'flex', 'flex-col', 'gap-24', 'w-full')}>
          <Input
            placeholder="최소 보유 포인트"
            icon={<PointIcon />}
            {...register('rule.minBettingPoint', { valueAsNumber: true })}
          />
          <Input
            placeholder="최대 보유 포인트"
            icon={<PointIcon />}
            {...register('rule.maxBettingPoint', { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className={cn('w-full', 'flex', 'flex-col', 'mt-[48px]', 'gap-16')}>
        <h2 className={cn('text-body2e', 'text-white')}>미니게임</h2>
        <div className={cn('w-full', 'flex', 'gap-24')}>
          {miniGameList.map((miniGame) => (
            <div
              key={miniGame.value}
              className={cn('flex', 'flex-col', 'gap-16', 'w-full')}
            >
              <MiniGameButton
                name={miniGame.name}
                isActive={watch(`miniGame.${miniGame.value}.isActive`)}
                icon={miniGame.icon}
                onClick={() => handleMiniGameToggleClick(miniGame.value)}
              />
              <Input
                placeholder="최대 배팅 포인트"
                icon={<PointIcon />}
                {...register(`miniGame.${miniGame.value}.maxBettingPoint`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={cn('w-full', 'flex', 'flex-col', 'mt-[48px]', 'gap-16')}>
        <h2 className={cn('text-body2e', 'text-white')}>상점</h2>
        <div className={cn('w-full', 'flex', 'gap-24')}>
          {shopList.map(({ name, value }) => (
            <div
              key={value}
              className={cn('flex', 'flex-col', 'gap-16', 'w-full')}
            >
              <button
                className={cn(
                  'w-[424px]',
                  'h-[204px]',
                  'bg-gray-700',
                  'text-title4s',
                  'rounded-lg',
                  'flex',
                  'flex-col',
                  'gap-16',
                  'items-center',
                  'justify-center',
                  'relative',
                  'border-2',
                  'border-solid',
                  watch(`shop.${value}.isActive`)
                    ? ['border-main-500', 'text-main-500']
                    : ['border-gray-700', 'text-gray-400'],
                )}
                onClick={() => handleShopToggleClick(value)}
                type="button"
              >
                <div className={cn('absolute', 'top-24', 'right-12')}>
                  <CircleQuestionIcon />
                </div>
                <TicketIcon
                  color={
                    watch(`shop.${value}.isActive`) ? '#526ffe' : '#898989'
                  }
                />
                {name}
              </button>
              <Input
                placeholder={`${name} 티켓 포인트`}
                icon={<PointIcon />}
                {...register(`shop.${value}.price`, { valueAsNumber: true })}
              />
              <Input
                placeholder={`${name} 티켓 수량`}
                icon={<TicketIcon size={24} />}
                {...register(`shop.${value}.quantity`, { valueAsNumber: true })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={cn('w-full', 'flex', 'mt-[48px]', 'gap-24')}>
        <div className={cn('w-full', 'flex', 'flex-col', 'gap-16')}>
          <div className={cn('flex', 'gap-12', 'items-end')}>
            <h2 className={cn('text-body2e', 'text-white')}>입장 번호</h2>
            <p className={cn('text-caption1s', 'text-gray-500')}>
              입장 번호은 선택사항입니다.
            </p>
          </div>
          <Input
            placeholder="입장번호를 입력해주세요"
            {...register('passCode')}
          />
        </div>

        <div className={cn('w-full', 'flex', 'flex-col', 'gap-16')}>
          <div className={cn('flex', 'gap-12', 'items-end')}>
            <h2 className={cn('text-body2e', 'text-white')}>
              관리할 학생 (최대 5명)
            </h2>
            <p className={cn('text-caption1s', 'text-gray-500')}>
              관리할 학생은 선택사항입니다.
            </p>
          </div>
          <Input
            placeholder="학생을 입력해주세요"
            {...register('maintainer')}
            icon={<SearchIcon size={24} />}
          />
        </div>
      </div>

      <div className={cn('mt-[48px]')}>
        <Button>생성하기</Button>
      </div>
    </form>
  );
};

export default OfficialCreateContainer;
