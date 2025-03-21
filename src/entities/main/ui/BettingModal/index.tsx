'use client';

import { PointCircleIcon } from '@/shared/assets/svg';
import { useMatchStore } from '@/shared/stores';
import { BettingFormData } from '@/shared/types/main';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import MatchTypeLabel from '@/shared/ui/matchTypeLabel';
import ModalLayout from '@/shared/ui/modalLayout';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';
import { formatBettingData } from '../../model/formatBettingData';
import { useBettingForm } from '../../model/useBettingForm';
import MatchTeam from '../MatchTeam';

interface BettingModalProps {
  onClose: () => void;
}

const BettingModal = ({ onClose }: BettingModalProps) => {
  const {
    register,
    handleSubmit,
    isDisabled,
    onError,
    setValue,
    selectedTeamId,
    setSelectedTeamId,
  } = useBettingForm();

  console.log(selectedTeamId);

  const onSubmit = (data: BettingFormData) => {
    const formattedData = formatBettingData(data, selectedTeamId);
    onClose();

    console.log('전송 데이터:', JSON.stringify(formattedData, null, 2));
  };

  const { matchStatus, match } = useMatchStore();

  if (!match) {
    return null;
  }

  const { aTeam, bTeam, category, betting } = match;

  const { isPlaying, isMatchFinish, time, roundText } = matchStatus;

  const isFinal = roundText === '결승전';
  const totalBettingPoints = aTeam.bettingPoint + bTeam.bettingPoint;

  const aTeamPercentage =
    totalBettingPoints === 0
      ? '0.0'
      : ((aTeam.bettingPoint / totalBettingPoints) * 100).toFixed(2);

  const bTeamPercentage =
    totalBettingPoints === 0
      ? '0.0'
      : ((bTeam.bettingPoint / totalBettingPoints) * 100).toFixed(2);

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
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={cn('flex', 'gap-[2.5rem]', 'flex-col')}
      >
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
            percentage={Number(aTeamPercentage)}
            bgColor={getBettingTeamColor(aTeam.teamId)}
            onClick={() => handleTeamClick(aTeam.teamId)}
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
            <h2 className={cn('text-h1e', 'text-gray-500')}>VS</h2>
          </div>
          <MatchTeam
            team={bTeam}
            percentage={Number(bTeamPercentage)}
            bgColor={getBettingTeamColor(bTeam.teamId)}
            onClick={() => handleTeamClick(bTeam.teamId)}
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
            {...register('bettingPoint', { required: true, min: 0 })}
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
