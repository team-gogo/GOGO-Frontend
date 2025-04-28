'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BatchCancelController, BatchController } from '@/entities/main';
import {
  BlueAlarmIcon,
  GrayAlarmIcon,
  RightArrowIcon,
} from '@/shared/assets/svg';
import PointCircleIcon from '@/shared/assets/svg/PointCircleIcon';
import { getBettingRatio } from '@/shared/model/getBettingRatio';
import {
  useAlarmClickStore,
  useBettingMatchArrStore,
  useMatchBatchArrStore,
  useMatchModalStore,
  useMatchNoticeStore,
  useMatchStore,
  useMyStageIdStore,
  useSelectDateStore,
} from '@/shared/stores';
import { MatchData } from '@/shared/types/my/bet';
import { cn } from '@/shared/utils/cn';
import { formatPoint } from '@/shared/utils/formatPoint';
import { usePatchMatchNotice } from '@/views/main/model/usePatchMatchNotice';
import Button from '../button';
import MatchTypeLabel from '../matchTypeLabel';
import SportTypeLabel from '../sportTypelabel';
import SystemLabel from '../systemLabel';

interface MatchProps {
  match: MatchData;
}

const Match = ({ match }: MatchProps) => {
  const {
    matchId,
    ateam,
    bteam,
    startDate,
    endDate,
    round,
    system,
    category,
    isNotice,
    isPlayer,
    betting,
    result,
  } = match;

  const { setIsMatchModalOpen } = useMatchModalStore();
  const { setMatchStatus, setMatch } = useMatchStore();
  const { stageId } = useMyStageIdStore();
  const { matchBatchArr } = useMatchBatchArrStore();
  const { matchNoticeArr } = useMatchNoticeStore();
  const { bettingMatchArr } = useBettingMatchArrStore();
  const { isAlarmClicked, setIsAlarmClicked } = useAlarmClickStore();
  const { selectDate } = useSelectDateStore();
  const [isBettingPossible, setIsBettingPossible] = useState(false);

  const [adminIdxArr, setAdminIdxArr] = useState<number[]>([]);

  const { mutate: patchNotice } = usePatchMatchNotice(matchId);

  useEffect(() => {
    setAdminIdxArr(JSON.parse(localStorage.getItem('stageAdminArr') || '[]'));
  }, []);

  const isStageAdmin = adminIdxArr.includes(stageId);

  const matchItem = matchBatchArr.find((item) => item.matchId === matchId);
  const noticeItem = matchNoticeArr.find((item) => item.matchId === matchId);

  const isBatchEnd = matchItem ? matchItem.isEnd : false;
  const bettingMatch = bettingMatchArr.find((item) => item.matchId === matchId);
  const alreadyBetting = bettingMatch !== undefined;
  const bettingPoint = bettingMatch?.bettingPoint ?? 0;

  const isMatchNoticeChecked = noticeItem ? noticeItem?.isNotice : false;

  // if (matchItem) {
  //   console.log(`Match ID: ${matchItem.matchId}, isEnd: ${isBatchEnd}`);
  // }

  useEffect(() => {
    setIsAlarmClicked(isNotice);
  }, []);

  const { push } = useRouter();

  const currentTime = new Date();

  const start = new Date(startDate);
  const end = new Date(endDate);

  const isPlaying = currentTime >= start && currentTime <= end;
  const isMatchFinish = currentTime > end;

  useEffect(() => {
    const bettingStart = new Date(start);
    bettingStart.setHours(start.getHours() - 24);

    const bettingEnd = new Date(start);
    bettingEnd.setMinutes(start.getMinutes() - 5);

    const checkBettingPossible = () => {
      const currentTime = new Date();

      const hasTBD =
        ateam?.teamName.includes('TBD') || bteam?.teamName.includes('TBD');

      setIsBettingPossible(
        !hasTBD && currentTime >= bettingStart && currentTime <= bettingEnd,
      );
    };

    checkBettingPossible();
    const interval = setInterval(checkBettingPossible, 60000);

    return () => clearInterval(interval);
  }, [startDate, ateam?.teamName, bteam?.teamName]);

  const tempPointExpiredDate = result?.tempPointExpiredDate
    ? new Date(result.tempPointExpiredDate)
    : null;

  const isExpired = tempPointExpiredDate
    ? currentTime > tempPointExpiredDate
    : false;

  const adminAndMatchEnd =
    isStageAdmin && isMatchFinish && !isPlaying && !isBatchEnd && !isExpired;

  const isTimerStart = isStageAdmin && isBatchEnd && !isExpired;

  const time = `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`;

  const winnerTeam =
    result?.victoryTeamId === ateam?.teamId
      ? ateam?.teamName
      : result?.victoryTeamId === bteam?.teamId
        ? bteam?.teamName
        : '없음';

  const isPredictSuccess = result?.isPredictionSuccess;

  const roundLabel = {
    ROUND_OF_32: '32',
    ROUND_OF_16: '16',
    QUARTER_FINALS: '8',
    SEMI_FINALS: '4',
    FINALS: '결승전',
  };

  const roundText = Array.isArray(round)
    ? round.map((r: keyof typeof roundLabel) => roundLabel[r]).join(', ')
    : roundLabel[round as keyof typeof roundLabel] || '';

  const isFinal = roundText === '결승전';

  const getTeamClassName = (teamId: number) => {
    if (betting.predictedWinTeamId === teamId) {
      return 'text-main-500';
    }
    return 'text-white';
  };

  const updateStatus = () => {
    const matchStatusData = {
      isPlaying,
      isMatchFinish,
      time,
      roundText,
    };
    const matchData = match;

    localStorage.setItem('matchStatus', JSON.stringify(matchStatusData));
    localStorage.setItem('match', JSON.stringify(matchData));
    localStorage.setItem('selectDate', JSON.stringify(selectDate));

    setMatchStatus(matchStatusData);
    setMatch(matchData);
  };

  const totalBettingPoint =
    (ateam?.bettingPoint ?? 0) + (bteam?.bettingPoint ?? 0);

  const borderStyle = [
    'border-4',
    'border-solid',
    'border-main-300',
    'laptop:py-[1.25rem]',
    'py-[0.75rem]',
  ];

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'laptop:py-[1.5rem]',
        'laptop:px-[2rem]',
        'rounded-xl',
        'bg-gray-700',
        'relative',
        'w-full',
        'px-[1rem]',
        'py-[0.75rem]',
        isFinal && borderStyle,
      )}
    >
      {adminAndMatchEnd && (
        <BatchController aTeam={ateam} bTeam={bteam} matchId={matchId} />
      )}
      {isTimerStart && (
        <BatchCancelController
          tempPointExpiredDate={result?.tempPointExpiredDate}
          matchId={matchId}
        />
      )}
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-center',
          'gap-[2rem]',
          'h-full',
        )}
      >
        <div
          className={cn('flex', 'w-full', 'justify-between', 'items-center')}
        >
          <div
            className={cn(
              'flex',
              'items-center',
              'laptop:gap-[1.25rem]',
              'gap-[0.5rem]',
            )}
          >
            <button
              onClick={() => {
                setIsAlarmClicked(!isAlarmClicked);
                patchNotice({ isNotice: isAlarmClicked });
              }}
            >
              {isMatchNoticeChecked ? <BlueAlarmIcon /> : <GrayAlarmIcon />}
            </button>
            <div
              className={cn(
                'flex',
                'items-center',
                'laptop:gap-[1.5rem]',
                'gap-[1rem]',
              )}
            >
              <SystemLabel
                system={system}
                roundText={roundText}
                isFinal={isFinal}
              />
              <MatchTypeLabel
                type={'TIME'}
                customText={
                  isPlaying ? '경기 중' : isMatchFinish ? '경기 종료' : time
                }
                color={
                  isPlaying ? '#01C612' : isMatchFinish ? '#898989' : '#FFF'
                }
              />
              <SportTypeLabel
                type={category && category.length > 0 ? category : ''}
              />
            </div>
          </div>

          <button
            className={cn('flex', 'items-center', 'gap-[0.5rem]')}
            onClick={() => {
              updateStatus();
              push(`/match/${matchId}`);
            }}
          >
            <p
              className={cn(
                'desktop:text-body3s',
                'text-caption2s',
                'text-gray-500',
              )}
            >
              자세히 보기
            </p>
            <div className={cn('hidden', 'desktop:block')}>
              <RightArrowIcon />
            </div>
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
            <div
              className={cn(
                'flex',
                (isPlaying || result === null) && 'hidden',
                'items-center',
                'gap-[0.25rem]',
              )}
            >
              <PointCircleIcon />
              <p className={cn('text-body3s', 'text-gray-300')}>
                {formatPoint(ateam?.bettingPoint + bteam?.bettingPoint)}
              </p>
            </div>
            {isMatchFinish && result !== null ? (
              <h2 className={cn('text-h4e', 'text-white')}>
                {winnerTeam} 승리
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
                      'text-body3s',
                      'text-white',
                      result !== null && 'hidden',
                    )}
                  >
                    {getBettingRatio(
                      ateam?.bettingPoint ?? 0,
                      totalBettingPoint,
                    )}
                  </p>
                  <h2
                    className={cn(
                      'laptop:text-h4e',
                      'pad:text-body1s',
                      'text-body2s',
                      getTeamClassName(ateam?.teamId),
                    )}
                  >
                    {ateam?.teamName}
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
                      'text-body3s',
                      'text-white',
                      result !== null && 'hidden',
                    )}
                  >
                    {getBettingRatio(
                      bteam?.bettingPoint ?? 0,
                      totalBettingPoint,
                    )}
                  </p>
                  <h2
                    className={cn(
                      'laptop:text-h4e',
                      'pad:text-body1s',
                      'text-body2s',
                      getTeamClassName(bteam?.teamId),
                    )}
                  >
                    {bteam?.teamName}
                  </h2>
                </div>
              </div>
            )}
          </div>
          {isMatchFinish && betting.isBetting && result !== null ? (
            <div
              className={cn(
                'flex',
                'w-full',
                'pt-[1.0625rem]',
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
                {isPredictSuccess
                  ? Number(result.earnedPoint).toLocaleString()
                  : Number(betting.bettingPoint).toLocaleString()}
              </p>
            </div>
          ) : (
            <Button
              disabled={
                isMatchFinish ||
                betting.isBetting ||
                isBatchEnd ||
                isPlayer ||
                alreadyBetting ||
                !isBettingPossible
              }
              onClick={() => {
                updateStatus();
                setIsMatchModalOpen(true);
              }}
            >
              {alreadyBetting
                ? `${formatPoint(bettingPoint)} 베팅`
                : !betting.isBetting
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
