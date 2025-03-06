'use client';

import { useForm } from 'react-hook-form';
import { BackIcon, PointIcon } from '@/shared/assets/svg';
import { CreateOfficialStageFormType } from '@/shared/types/createStage';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const CategoryList = [
  { name: '축구', value: 'SOCCER' },
  { name: '농구', value: 'BASKET_BALL' },
  { name: '야구', value: 'BASE_BALL' },
  { name: '배구', value: 'VOLLEY_BALL' },
  { name: '배드민턴', value: 'BADMINTON' },
  { name: '롤', value: 'LOL' },
  { name: '기타(직접입력)', value: 'ETC' },
];

const OfficialCreateContainer = () => {
  const { register, watch } = useForm<CreateOfficialStageFormType>();

  return (
    <form className={cn('w-[1322px]', 'flex', 'flex-col')}>
      <h1
        className={cn(
          'flex',
          'items-center',
          'gap-24',
          'text-title4s',
          'text-white',
        )}
      >
        <BackIcon /> 스테이지 생성 (학교 공식 행사)
      </h1>

      <div className={cn('w-full', 'flex', 'flex-col', 'gap-16', 'mt-[52px]')}>
        <h2 className={cn('text-title2e', 'text-white')}>스테이지</h2>
        <div className={cn('w-full', 'flex', 'gap-24')}>
          <div
            className={cn('w-full', 'flex', 'flex-col', 'items-end', 'gap-4')}
          >
            <Input
              placeholder="이름을 입력해주세요."
              maxLength={10}
              {...register('stageName')}
            />
            <p className={cn('text-body3s', 'text-main-600')}>
              {(watch('stageName') && watch('stageName').length) || 0}
              /10
            </p>
          </div>
          <div className={cn('w-full', 'flex', 'gap-24')}>
            <Input
              placeholder="최소 보유 포인트"
              icon={<PointIcon />}
              {...register('rule.minBettingPoint')}
            />
            <Input
              placeholder="최대 보유 포인트"
              icon={<PointIcon />}
              // {...register('')}
            />
          </div>
        </div>
      </div>

      <div className={cn('w-full', 'flex', 'flex-col', 'gap-16', 'mt-[48px]')}>
        <h2 className={cn('text-title2e', 'text-white')}>경기</h2>
        <div className={cn('w-full', 'flex', 'gap-24')} />
      </div>
    </form>
  );
};

export default OfficialCreateContainer;
