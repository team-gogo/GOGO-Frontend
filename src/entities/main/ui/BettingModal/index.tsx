'use client';

import { useParams } from 'next/navigation';
import { PointCircleIcon } from '@/shared/assets/svg';
import { useMatchStore, usePointStore } from '@/shared/stores';
import { BettingFormData } from '@/shared/types/main';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import MatchTypeLabel from '@/shared/ui/matchTypeLabel';
import ModalLayout from '@/shared/ui/modalLayout';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import SystemLabel from '@/shared/ui/systemLabel';
import { cn } from '@/shared/utils/cn';
import { formatBettingData } from '../../model/formatBettingData';
import { useBettingForm } from '../../model/useBettingForm';
import { useGetMaxMinBetPoint } from '../../model/useGetMaxMinBetPoint';
import { usePostBettingMatch } from '../../model/usePostBettingMatch';
import MatchTeam from '../MatchTeam';

interface BettingModalProps {
  onClose: () => void;
}

const BettingModal = ({ onClose }: BettingModalProps) => {
  const { matchStatus, match } = useMatchStore();
  const { point } = usePointStore();

  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  if (!match) {
    return null;
  }

  const {
    register,
    handleSubmit,
    onError,
    watch,
    setValue,
    selectedTeamId,
    setSelectedTeamId,
  } = useBettingForm();

  const bettingPoint = watch('bettingPoint');

  const { mutate: PostBettingMatch } = usePostBettingMatch(
    match.matchId,
    bettingPoint,
  );

  const { data: maxMinPointData } = useGetMaxMinBetPoint(Number(stageId));

  const isDisabled =
    !bettingPoint ||
    !selectedTeamId ||
    Number(bettingPoint) > Number(maxMinPointData?.maxBettingPoint) ||
    Number(bettingPoint) < Number(maxMinPointData?.minBettingPoint) ||
    bettingPoint > point;

  const onSubmit = (data: BettingFormData) => {
    const formattedData = formatBettingData(data, selectedTeamId);
    const finalData = {
      ...formattedData,
      predictedWinTeamId: formattedData.predictedWinTeamId ?? 0,
    };

    PostBettingMatch(finalData);
    onClose();
  };

  const { ateam, bteam, category, betting, system } = match;

  const { isPlaying, isMatchFinish, time, roundText } = matchStatus;

  const isFinal = roundText === '결승전';
  const totalBettingPoints = ateam?.bettingPoint + bteam?.bettingPoint;

  const aTeamPercentage =
    totalBettingPoints === 0
      ? '0.0'
      : ((ateam?.bettingPoint / totalBettingPoints) * 100).toFixed(2);

  const bTeamPercentage =
    totalBettingPoints === 0
      ? '0.0'
      : ((bteam?.bettingPoint / totalBettingPoints) * 100).toFixed(2);

  const getBettingTeamColor = (teamId: number) => {
    if (selectedTeamId === teamId || betting.predictedWinTeamId === teamId) {
      return 'bg-main-600';
    }
    return 'bg-gray-500';
  };

  const handleTeamClick = (teamId: number) => {
    setSelectedTeamId(teamId);
    setValue('predictedWinTeamId', teamId, { shouldValidate: true });
  };

  return (
    <ModalLayout
      title={`${ateam?.teamName} VS ${bteam?.teamName}`}
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'tablet:px-[2.5rem]',
        'tablet:py-[2.25rem]',
        'px-[1.5rem]',
        'py-[1.25rem]',
        'max-w-[38.75rem]',
        'w-full',
        'space-y-24',
        'mx-20',
        'my-20',
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={cn('flex', 'gap-[2.5rem]', 'flex-col')}
      >
        <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
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
            color={isPlaying ? '#01C612' : isMatchFinish ? '#898989' : '#FFF'}
          />
          <SportTypeLabel
            type={category && category.length > 0 ? category : ''}
          />
        </div>
        <div className={cn('flex', 'justify-center', 'items-center')}>
          <MatchTeam
            team={ateam}
            percentage={Number(aTeamPercentage)}
            bgColor={getBettingTeamColor(ateam?.teamId)}
            onClick={() => handleTeamClick(ateam?.teamId)}
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
                {totalBettingPoints}
              </p>
            </div>
            <h2
              className={cn('tablet:text-h4e', 'text-body1s', 'text-gray-500')}
            >
              VS
            </h2>
          </div>
          <MatchTeam
            team={bteam}
            percentage={Number(bTeamPercentage)}
            bgColor={getBettingTeamColor(bteam?.teamId)}
            onClick={() => handleTeamClick(bteam?.teamId)}
          />
        </div>
        <div
          className={cn(
            'flex',
            'w-full',
            'flex-col',
            'items-center',
            'gap-[0.75rem]',
          )}
        >
          <Input
            {...register('bettingPoint', { required: true, min: 1 })}
            type="number"
            placeholder="포인트를 입력해주세요."
            bgColor="bg-gray-600"
          />
          <Button disabled={isDisabled} type="submit">
            베팅
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default BettingModal;
