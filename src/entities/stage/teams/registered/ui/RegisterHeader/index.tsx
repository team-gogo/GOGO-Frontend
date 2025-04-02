import { cn } from '@/shared/utils/cn';

const RegisterHeader = ({ TeamCount }: { TeamCount: string }) => {
  return (
    <div className={cn('flex', 'justify-between', 'items-center')}>
      <p className={cn('text-h4e', 'text-white')}>현재 등록된 팀들</p>
      <div className={cn('flex', 'gap-12', 'items-center')}>
        <p className={cn('text-gray-500', 'text-body3s')}>현재 등록된 팀</p>
        <p className={cn('text-white', 'text-body2s')}>{TeamCount}</p>
      </div>
    </div>
  );
};

export default RegisterHeader;
