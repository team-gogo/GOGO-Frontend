'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  BlueAlarmIcon,
  GrayAlarmIcon,
  RightArrowIcon,
} from '@/shared/assets/svg';
import PointCircleIcon from '@/shared/assets/svg/PointCircleIcon';
import { MatchData } from '@/shared/types/my/bet';
import { cn } from '@/shared/utils/cn';
import { formatPoint } from '@/shared/utils/formatPoint';
import Button from '../button';
import MatchTypeLabel from '../matchTypeLabel';
import SportTypeLabel from '../sportTypelabel';

interface MatchProps {
  match: MatchData;
}

const Match = ({ match }: MatchProps) => {
  const [isAlarmClick, setIsAlarmClick] = useState<boolean>(false);

  const { push } = useRouter();

  const {
    aTeam,
    bTeam,
    startDate,
    endDate,
    isEnd,
    round,
    category,
    isNotice,
    betting,
    result,
  } = match;

  useEffect(() => {
    setIsAlarmClick(isNotice);
  }, []);

  const currentTime = new Date();

  const start = new Date(startDate);
  const end = new Date(endDate);

  const isPlaying = currentTime >= start && currentTime <= end;
  const isFinish = currentTime > end;

  const time = `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`;

  const winnerTeam =
    result?.victoryTeamId === aTeam.teamId
      ? aTeam.teamName
      : result?.victoryTeamId === bTeam.teamId
        ? bTeam.teamName
        : '없음';

  const isPredictSuccess = result?.isPredictionSuccess;

  const roundLabel = {
    ROUND_OF_32: '32',
    ROUND_OF_16: '16',
    QUARTER_FINALS: '8',
    SEMI_FINALS: '4',
    FINALS: '결승전',
  };

  const roundText =
    round && round.length > 0 ? round.map((r) => roundLabel[r]).join(', ') : '';

  const getTeamClassName = (teamId: number) => {
    if (betting.predictedWinTeamId === teamId) {
      return 'text-main-500';
    }
    return 'text-white';
  };

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
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-center',
          isPlaying ? 'gap-[2.5rem]' : 'gap-[2rem]',
        )}
      >
        <div
          className={cn('flex', 'w-full', 'justify-between', 'items-center')}
        >
          <div className={cn('flex', 'items-center', 'gap-[1.25rem]')}>
            <button onClick={() => setIsAlarmClick(!isAlarmClick)}>
              {isAlarmClick ? <BlueAlarmIcon /> : <GrayAlarmIcon />}
            </button>
            <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
              <MatchTypeLabel
                type="OFFICIAL"
                customText={roundText}
                color="#FFF"
              />
              <MatchTypeLabel
                type={'TIME'}
                customText={
                  isPlaying ? '경기 중' : isFinish ? '경기 종료' : time
                }
                color={isPlaying ? '#01C612' : isFinish ? '#898989' : '#FFF'}
              />
              <SportTypeLabel
                type={category && category.length > 0 ? category[0] : ''}
              />
            </div>
          </div>

          <button
            className={cn('flex', 'items-center', 'gap-[0.5rem]')}
            onClick={() => push(`/match?matchId=${match.matchId}`)}
          >
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
            isPlaying ? 'gap-[2.5rem]' : 'gap-[2rem]',
          )}
        >
          <div
            className={cn('flex', 'flex-col', 'items-center', 'gap-[0.25rem]')}
          >
            <div
              className={cn(
                'flex',
                isPlaying && 'hidden',
                'items-center',
                'gap-[0.25rem]',
              )}
            >
              <PointCircleIcon />
              <p className={cn('text-body3s', 'text-gray-300')}>
                {formatPoint(aTeam.bettingPoint + bTeam.bettingPoint)}
              </p>
            </div>
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
                    {formatPoint(aTeam.bettingPoint)}
                  </p>
                  <h2
                    className={cn('text-h2e', getTeamClassName(aTeam.teamId))}
                  >
                    {aTeam.teamName}팀
                  </h2>
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
                    {formatPoint(bTeam.bettingPoint)}
                  </p>
                  <h2
                    className={cn('text-h2e', getTeamClassName(bTeam.teamId))}
                  >
                    {bTeam.teamName}팀
                  </h2>
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
                  isPredictSuccess ? 'text-main-500' : 'text-system-error',
                )}
              >
                예측 {isPredictSuccess ? '성공' : '실패'}
              </p>
              <p
                className={cn(
                  'text-body1e',
                  isPredictSuccess ? 'text-main-500' : 'text-system-error',
                )}
              >
                {isPredictSuccess ? '+' : '-'}{' '}
                {betting?.bettingPoint !== undefined
                  ? formatPoint(betting.bettingPoint)
                  : 0}
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
              onClick={() => push('/live')}
            >
              <p className={cn('text-body3s', 'text-white')}>경기 보러가기</p>
              <RightArrowIcon color="white" />
            </button>
          ) : (
            <Button disabled={isEnd || betting.isBetting}>
              {!betting.isBetting
                ? '베팅'
                : betting.bettingPoint !== undefined
                  ? `${formatPoint(betting.bettingPoint)} 베팅`
                  : '베팅'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Match;
