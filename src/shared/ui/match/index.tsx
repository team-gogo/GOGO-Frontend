'use client';

import { useState } from 'react';
import {
  BlueAlarmIcon,
  GrayAlarmIcon,
  RightArrowIcon,
} from '@/shared/assets/svg';
import { SportType } from '@/shared/model/sportTypes';
import { cn } from '@/shared/utils/cn';
import { formatPoint } from '@/shared/utils/formatPoint';
import Button from '../button';
import SportTypeLabel from '../sportTypelabel';
import Tag from '../tag';

interface MatchProps {
  sportType: SportType;
  point: number;
  team: string[];
  isBetPossible: boolean; //시간 관련 props 추후 백엔드 api spec 나올 시 반영
  isPlaying: boolean; //시간 관련 props 추후 백엔드 api spec 나올 시 반영
  time: string; //시간 관련 props 추후 백엔드 api spec 나올 시 반영
  team1Point: number;
  team2Point: number;
  isFinish: boolean; //시간 관련 props 추후 백엔드 api spec 나올 시 반영
  winnerTeam: string;
  isPredictSuccess: boolean;
  resultPoint: number;
}

const Match = ({
  sportType,
  point,
  team,
  isBetPossible,
  isPlaying,
  time,
  team1Point,
  team2Point,
  isFinish,
  winnerTeam,
  isPredictSuccess,
  resultPoint,
}: MatchProps) => {
  const [isAlarmClick, setIsAlarmClick] = useState<boolean>(false);
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'p-[1.5rem]',
        'px-[2rem]',
        'rounded-xl',
        'bg-gray-700',
      )}
    >
      <div className={cn('flex', 'flex-col', 'justify-center', 'gap-[2rem]')}>
        <div
          className={cn('flex', 'w-full', 'justify-between', 'items-center')}
        >
          <div className={cn('flex', 'items-center', 'gap-[1rem]')}>
            <button onClick={() => setIsAlarmClick(!isAlarmClick)}>
              {isAlarmClick ? <BlueAlarmIcon /> : <GrayAlarmIcon />}
            </button>

            <Tag
              TagType={isPlaying ? 'LIVE' : isFinish ? 'FINISH' : 'TIME'}
              text={time}
            />
            <Tag text="12강" />
            <SportTypeLabel
              type={sportType}
              px="1rem"
              py="0.75rem"
              height="2.8125rem"
            />
          </div>

          <button className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
            <p className={cn('text-body3s', 'text-gray-500')}>자세히 보기</p>
            <RightArrowIcon />
          </button>
        </div>
        <div
          className={cn(
            'flex',
            'w-full',
            'flex-col',
            'items-center',
            'gap-[2rem]',
          )}
        >
          <div
            className={cn('flex', 'flex-col', 'items-center', 'gap-[0.25rem]')}
          >
            <p
              className={cn(
                'text-body3s',
                'text-gray-300',
                isPlaying && 'hidden',
              )}
            >
              총 포인트 : {formatPoint(point)}
            </p>
            {isFinish ? (
              <h2 className={cn('text-h2e', 'text-white')}>
                {winnerTeam}팀 승리
              </h2>
            ) : (
              <div
                className={cn(
                  'flex',
                  'justify-center',
                  'items-center',
                  'gap-[1.25rem]',
                )}
              >
                <div
                  className={cn(
                    'flex',
                    'flex-col',
                    'justify-center',
                    'items-center',
                    'gap-[0.125rem]',
                  )}
                >
                  <p
                    className={cn(
                      'text-caption2s',
                      'text-white',
                      !isPlaying && 'hidden',
                    )}
                  >
                    {formatPoint(team1Point)}
                  </p>
                  <h2 className={cn('text-h2e', 'text-white')}>{team[0]}팀</h2>
                </div>
                <h3 className={cn('text-body1s', 'text-gray-500')}>vs</h3>
                <div
                  className={cn(
                    'flex',
                    'flex-col',
                    'justify-center',
                    'items-center',
                    'gap-[0.125rem]',
                  )}
                >
                  <p
                    className={cn(
                      'text-caption2s',
                      'text-white',
                      !isPlaying && 'hidden',
                    )}
                  >
                    {formatPoint(team2Point)}
                  </p>
                  <h2 className={cn('text-h2e', 'text-white')}>{team[1]}팀</h2>
                </div>
              </div>
            )}
          </div>
          {isFinish ? (
            <div
              className={cn(
                'flex',
                'w-full',
                'pt-[1.25rem]',
                'justify-between',
                'items-center',
                'border-t-1',
                'border-solid',
                'border-gray-600',
              )}
            >
              <p
                className={cn(
                  'text-body2s',
                  isPredictSuccess
                    ? 'text-system-success'
                    : 'text-system-error',
                )}
              >
                예측 {isPredictSuccess ? '성공' : '실패'}
              </p>
              <p
                className={cn(
                  'text-body1e',
                  isPredictSuccess
                    ? 'text-system-success'
                    : 'text-system-error',
                )}
              >
                {isPredictSuccess ? '+' : '-'} {formatPoint(resultPoint)}
              </p>
            </div>
          ) : isPlaying ? (
            <button
              className={cn(
                'w-full',
                'flex',
                'p-[0.75rem]',
                'px-[1rem]',
                'justify-between',
                'items-center',
                'rounded-lg',
                'bg-main-600',
              )}
            >
              <p className={cn('text-body3s', 'text-white')}>경기 보러가기</p>
              <RightArrowIcon color="white" />
            </button>
          ) : (
            <Button disabled={!isBetPossible}>베팅</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Match;
