import DetailFormation from '@/entities/match/detail/ui/DetailFormation';
import { OfficialIcon, TeamCountIcon } from '@/shared/assets/svg';
import {
  useTeamDetailInfoStore,
  useTeamDetailModalStore,
} from '@/shared/stores';
import { cn } from '@/shared/utils/cn';
import { useGetTeamDetail } from '@/views/match/model/useGetTeamDetail';
import ModalLayout from '../modalLayout';
import SportTypeLabel from '../sportTypelabel';

interface TeamDetailModalProps {
  onClose: () => void;
  isWin?: boolean;
}

const TeamDetailModal = ({ onClose, isWin = true }: TeamDetailModalProps) => {
  const { teamId, winCount, category } = useTeamDetailInfoStore();
  const { isConfirmUsed } = useTeamDetailModalStore();

  const { data: teamDetailData } = useGetTeamDetail(teamId);

  return (
    <ModalLayout
      title={teamDetailData?.teamName}
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'px-[28px]',
        'py-[36px]',
        'max-w-[45rem]',
        'w-full',
        'space-y-24',
      )}
    >
      <div className={cn('flex', 'flex-col', 'w-full', 'gap-[1.5rem]')}>
        <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
          {isWin && !isConfirmUsed && (
            <div className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
              <OfficialIcon isResponsive={false} />
              <p className={cn('text-caption1s', 'text-white')}>{winCount}승</p>
            </div>
          )}
          <div className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
            <TeamCountIcon isResponsive={false} color="#526FFE" />
            <p className={cn('text-caption1s', 'text-main-500')}>
              {teamDetailData?.participantCount}명
            </p>
          </div>
          <SportTypeLabel type={category} />
        </div>
        <DetailFormation
          team1DetailData={teamDetailData}
          category={category}
          isModalUsed={true}
        />
      </div>
    </ModalLayout>
  );
};

export default TeamDetailModal;
