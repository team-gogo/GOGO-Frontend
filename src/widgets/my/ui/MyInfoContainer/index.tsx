'use client';

import { useState } from 'react';
import { GrayCircle, SettingIcon } from '@/shared/assets/svg';
import { UserInfoType } from '@/shared/types/my';
import { cn } from '@/shared/utils/cn';

interface MyInfoContainerProps {
  userInfo: UserInfoType;
}

const MyInfoContainer = ({ userInfo }: MyInfoContainerProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const { name, schoolName, sex } = userInfo;

  const setToKorean = sex === 'MALE' ? '남성' : '여성';

  const infoList = [
    { label: '이름', value: name },
    { label: '학교', value: schoolName },
    { label: '성별', value: setToKorean },
  ];

  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'w-full',
        'rounded-xl',
        'bg-gray-700',
        'p-[2rem]',
        'px-[1.625rem]',
        'justify-between',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-[2.25rem]')}>
        {infoList.map((info) => (
          <div
            key={info.label}
            className={cn('flex', 'items-center', 'gap-[1rem]')}
          >
            <p className={cn('text-body2s', 'text-gray-500')}>{info.label}</p>
            <p className={cn('text-body1s', 'text-white')}>{info.value}</p>
          </div>
        ))}
      </div>

      <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
        <div className={cn('flex', 'items-center', 'gap-[1rem]')}>
          <p
            className={cn(
              'text-body2s',
              isActive ? 'text-main-500' : 'text-gray-500',
            )}
          >
            커뮤니티 필터
          </p>
          <div
            className={cn(
              'relative',
              'flex',
              'w-[3.75rem]',
              'h-[1.5rem]',
              'items-center',
              'rounded-[3.125rem]',
              'border-[0.125rem]',
              'border-solid',
              isActive ? 'border-main-500' : 'border-gray-500',
              'cursor-pointer',
              'overflow-hidden',
            )}
            onClick={() => setIsActive(!isActive)}
          >
            <div
              className={cn(
                'absolute',
                'transition-transform',
                'duration-300',
                '-translate-x-[0.125rem]',
                isActive ? 'translate-x-[2.125rem]' : '-translate-x-[0.125rem]',
              )}
            >
              <GrayCircle isActive={isActive} />
            </div>
          </div>
        </div>
        <div className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
          <div
            className={cn(
              'flex',
              'w-[1.5rem]',
              'h-[1.5rem]',
              'items-center',
              'justify-center',
            )}
          >
            <SettingIcon />
          </div>
          <p className={cn('text-body1s', 'text-gray-500', 'cursor-pointer')}>
            설정
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyInfoContainer;
