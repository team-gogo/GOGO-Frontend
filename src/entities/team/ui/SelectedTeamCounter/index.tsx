import { cn } from '@/shared/utils/cn';

interface SelectedTeamCounterProps {
  count: number;
}

const SelectedTeamCounter = ({ count }: SelectedTeamCounterProps) => (
  <div
    className={cn(
      'text-body3s',
      'text-gray-400',
      'flex',
      'items-center',
      'gap-3',
      'mr-20',
    )}
  >
    <span>선택된 팀 개수</span>
    <span className="text-body2s text-gray-100">{count}</span>
  </div>
);

export default SelectedTeamCounter;
