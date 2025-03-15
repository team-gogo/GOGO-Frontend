'use client';

import { useRouter } from 'next/navigation';
import { PointCircleIcon, RightArrowIcon } from '@/shared/assets/svg';
import { useMatchStore } from '@/shared/stores';
import MatchTypeLabel from '@/shared/ui/matchTypeLabel';
import ModalLayout from '@/shared/ui/modalLayout';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';
import MatchTeam from '../MatchTeam';

interface MatchDetailModalProps {
  onClose: () => void;
}

const MatchDetailModal = ({ onClose }: MatchDetailModalProps) => {
  const { matchStatus, match } = useMatchStore();

  const { push } = useRouter();

  if (!match) {
    return null;
  }

  const { aTeam, bTeam, category, betting } = match;

  const { isPlaying, isFinish, time, roundText } = matchStatus;

  const isFinal = roundText === '결승전';

  const totalBettingPoints = aTeam.bettingPoint + bTeam.bettingPoint;

  const aTeamPercentage = (
    (aTeam.bettingPoint / totalBettingPoints) *
    100
  ).toFixed(2);
  const bTeamPercentage = (
    (bTeam.bettingPoint / totalBettingPoints) *
    100
  ).toFixed(2);

  const getBettingTeamColor = (teamId: number) => {
    if (betting.predictedWinTeamId === teamId) {
      return 'bg-main-600';
    }
    return 'bg-gray-500';
  };

  return (
    <ModalLayout
      title={`${aTeam.teamName} VS ${bTeam.teamName}`}
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'px-[40px]',
        'py-[36px]',
        'max-w-[38.75rem]',
        'w-full',
        'space-y-24',
      )}
    >
      <div className={cn('flex', 'gap-[2.5rem]', 'flex-col')}>
        <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
          <MatchTypeLabel
            type={isFinal ? 'FINAL' : 'OFFICIAL'}
            customText={roundText}
            color={isFinal ? '#97A9FF' : '#FFF'}
          />
          <MatchTypeLabel
            type={'TIME'}
            customText={isPlaying ? '경기 중' : isFinish ? '경기 종료' : time}
            color={isPlaying ? '#01C612' : isFinish ? '#898989' : '#FFF'}
          />
          <SportTypeLabel
            type={category && category.length > 0 ? category[0] : ''}
          />
        </div>
        <div
          className={cn(
            'flex',
            'justify-center',
            'items-center',
            'gap-[3.75rem]',
          )}
        >
          <MatchTeam
            team={aTeam}
            opponentTeam={bTeam}
            percentage={Number(aTeamPercentage)}
            bgColor={getBettingTeamColor(aTeam.teamId)}
          />
          <div
            className={cn(
              'flex',
              'flex-col',
              'justify-center',
              'items-center',
              'gap-[0.75rem]',
            )}
          >
            <div
              className={cn(
                'flex',
                'items-center',
                'justify-center',
                'gap-[0.25rem]',
              )}
            >
              <PointCircleIcon />
              <p className={cn('text-body3s', 'text-gray-300')}>
                {aTeam.bettingPoint + bTeam.bettingPoint}
              </p>
            </div>
            <h2 className={cn('text-h1e', 'text-gray-500')}>VS</h2>
          </div>
          <MatchTeam
            team={bTeam}
            opponentTeam={aTeam}
            percentage={Number(bTeamPercentage)}
            bgColor={getBettingTeamColor(bTeam.teamId)}
          />
        </div>

        <div
          className={cn(
            'w-full',
            'flex',
            'flex-col',
            'items-center',
            'gap-[0.75rem]',
          )}
        >
          <button
            className={cn('flex', 'items-center', 'gap-[0.5rem]')}
            onClick={() => push(`/match?matchId=${match.matchId}`)}
          >
            <p className={cn('text-body3s', 'text-gray-500')}>자세히 보기</p>
            <RightArrowIcon />
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default MatchDetailModal;
