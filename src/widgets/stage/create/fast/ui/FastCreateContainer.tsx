'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { CoinIcon, SearchIcon } from '@/shared/assets/icons';
import { PointIcon } from '@/shared/assets/svg';
import { SPORT_TYPES } from '@/shared/model/sportTypes';
import {
  CategoryType,
  CreateFastStageFormType,
} from '@/shared/types/createStage';
import BackPageButton from '@/shared/ui/backPageButton/index';
import Button from '@/shared/ui/button';
import GameInputBox from '@/shared/ui/gameInputBox/Index';
import Input from '@/shared/ui/input';
import MiniGameButton from '@/shared/ui/miniGameButton';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

const miniGameList: {
  name: string;
  value: 'coinToss';
  icon: ({ size, color }: { size: number; color: string }) => JSX.Element;
}[] = [{ name: '코인토스', value: 'coinToss', icon: CoinIcon }];

const FastCreateContainer = () => {
  const { register, watch, setValue, control } =
    useForm<CreateFastStageFormType>({
      defaultValues: {
        game: [],
        miniGame: {
          coinToss: { isActive: false },
        },
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'game',
  });

  const handleDeleteButtonClick = (idx: number) => {
    remove(idx);
  };

  const handleMiniGameToggleClick = (id: 'coinToss') => {
    const fieldName = `miniGame.${id}.isActive` as const;
    setValue(fieldName, !watch(fieldName));
  };

  const handleSportTypeClick = (type: CategoryType) => {
    append({
      category: type,
      name: '',
      system: 'SINGLE',
    });
  };

  return (
    <form
      className={cn('w-[1322px]', 'flex', 'flex-col', 'h-fit', 'my-[80px]')}
    >
      <div className={cn('flex', 'items-center', 'gap-24')}>
        <BackPageButton label="" />
        <h1 className={cn('text-title4s', 'text-white')}>
          스테이지 생성 (빠른 경기)
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
                onClick={() => handleSportTypeClick(type as CategoryType)}
              />
            ))}
        </div>
        <div className={cn('w-full', 'flex', 'flex-col', 'gap-20', 'mt-20')}>
          {fields.map((field, index) => (
            <GameInputBox
              key={field.id}
              register={register}
              watch={watch}
              setValue={setValue}
              handleDeleteButtonClick={() => handleDeleteButtonClick(index)}
              id={`${field.category}-${index}`}
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
              <div className={cn('w-[141px]')}>
                <Input
                  placeholder="최대 배팅 포인트"
                  icon={<PointIcon />}
                  {...register(`miniGame.${miniGame.value}.maxBettingPoint`, {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={cn('w-full', 'flex', 'mt-[48px]', 'gap-24')}>
        <div className={cn('w-full', 'flex', 'flex-col', 'gap-16')}>
          <div className={cn('flex', 'gap-12', 'items-end')}>
            <h2 className={cn('text-body2e', 'text-white')}>입장 번호</h2>
            <p className={cn('text-caption1s', 'text-gray-500')}>
              입장 번호는 선택사항입니다.
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

export default FastCreateContainer;
