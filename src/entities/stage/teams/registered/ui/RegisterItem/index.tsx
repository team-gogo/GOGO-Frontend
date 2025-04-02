'use client';

import {
  useTeamDetailInfoStore,
  useTeamDetailModalStore,
} from '@/shared/stores';
import { cn } from '@/shared/utils/cn';

interface RegisterItemProps {
  teamId: number;
  teamName: string;
}

const RegisterItem = ({ teamId, teamName }: RegisterItemProps) => {
  const { setIsTeamDetailModalOpen } = useTeamDetailModalStore();
  const { setTeamId } = useTeamDetailInfoStore();

  const handleClick = () => {
    setTeamId(teamId);
    setIsTeamDetailModalOpen(true);
  };

  return (
    <div
      className={cn(
        'py-20',
        'px-24',
        'bg-gray-700',
        'flex',
        'items-center',
        'justify-between',
        'rounded-lg',
      )}
    >
      <p className={cn('text-body1e', 'text-white')}>{teamName}</p>
      <button
        className={cn('text-gray-300', 'text-body2s')}
        onClick={handleClick}
      >
        팀 자세히보기
      </button>
    </div>
  );
};

export default RegisterItem;
