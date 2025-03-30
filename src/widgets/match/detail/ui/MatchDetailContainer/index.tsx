import { useEffect, useState } from 'react';
import { BlueAlarmIcon, GrayAlarmIcon } from '@/shared/assets/svg';
import { useAlarmClickStore, useMatchStore } from '@/shared/stores';
import { MatchStatus } from '@/shared/stores/useMatchStore';
import MatchTypeLabel from '@/shared/ui/matchTypeLabel';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';
import { usePatchMatchNotice } from '@/views/main/model/usePatchMatchNotice';

interface MatchDetailProps {
  matchId: string;
  category:
    | 'SOCCER'
    | 'BASKET_BALL'
    | 'BASE_BALL'
    | 'VOLLEY_BALL'
    | 'BADMINTON'
    | 'LOL'
    | 'ETC';
}

const MatchDetailContainer = ({ matchId, category }: MatchDetailProps) => {
  const { isAlarmClicked, setIsAlarmClicked } = useAlarmClickStore();
  const { matchStatus } = useMatchStore();

  const [matchStatusFromLocalStorage, setMatchStatusFromLocalStorage] =
    useState<MatchStatus>();

  const { mutate: patchNotice } = usePatchMatchNotice(Number(matchId));

  useEffect(() => {
    const storedMatchStatus = localStorage.getItem('matchStatus');

    if (storedMatchStatus) {
      setMatchStatusFromLocalStorage(JSON.parse(storedMatchStatus));
    }
  }, []);

  const isDefaultMatchStatus =
    matchStatus &&
    matchStatus.isPlaying === false &&
    matchStatus.isMatchFinish === false &&
    matchStatus.time === '' &&
    matchStatus.roundText === '';

  const matchStatusData = isDefaultMatchStatus
    ? matchStatusFromLocalStorage
    : matchStatus;

  const { isPlaying, isMatchFinish, time, roundText } = matchStatusData || {};

  const isFinal = roundText === '결승전';

  return (
    <div
      className={cn(
        'flex',
        'p-[1.5rem]',
        'h-[5rem]',
        'items-center',
        'gap-[1.25rem]',
        'rounded-xl',
        'bg-gray-700',
      )}
    >
      <button
        onClick={() => {
          setIsAlarmClicked(!isAlarmClicked);
          patchNotice({ isNotice: isAlarmClicked });
        }}
      >
        {isAlarmClicked ? (
          <BlueAlarmIcon size="2rem" />
        ) : (
          <GrayAlarmIcon size="2rem" />
        )}
      </button>
      <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
        <MatchTypeLabel
          type={isFinal ? 'FINAL' : 'OFFICIAL'}
          customText={roundText}
          color={isFinal ? '#97A9FF' : '#FFF'}
        />
        <MatchTypeLabel
          type={'TIME'}
          customText={
            isPlaying ? '경기 중' : isMatchFinish ? '경기 종료' : time
          }
          color={isPlaying ? '#01C612' : isMatchFinish ? '#898989' : '#FFF'}
        />
        <SportTypeLabel
          type={category && category.length > 0 ? category : ''}
        />
      </div>
    </div>
  );
};

export default MatchDetailContainer;
