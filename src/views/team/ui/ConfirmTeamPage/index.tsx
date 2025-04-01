'use client';

import { useTeamDetailModalStore } from '@/shared/stores';
import TeamDetailModal from '@/shared/ui/teamDetailModal';
import { cn } from '@/shared/utils/cn';
import ConfirmTeamContainer from '@/widgets/team/ui/ConfirmTeamContainer/index';

interface ConfirmTeamPageProps {
  params: {
    matchId: string;
  };
}

const ConfirmTeamPage = ({ params }: ConfirmTeamPageProps) => {
  const { isTeamDetailModalOpen, setIsTeamDetailModalOpen } =
    useTeamDetailModalStore();

  return (
    <div className={cn('flex', 'justify-center', 'w-full', 'px-16')}>
      <div className={cn('w-full', 'max-w-[1320px]', 'flex', 'flex-col')}>
        <ConfirmTeamContainer params={params} />
      </div>
      {isTeamDetailModalOpen && (
        <TeamDetailModal onClose={() => setIsTeamDetailModalOpen(false)} />
      )}
    </div>
  );
};

export default ConfirmTeamPage;
