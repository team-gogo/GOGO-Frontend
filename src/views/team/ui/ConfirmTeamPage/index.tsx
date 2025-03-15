import { cn } from '@/shared/utils/cn';
import ConfirmTeamContainer from '@/widgets/team/ui/ConfirmTeamContainer/index';

const ConfirmTeamPage = () => {
  return (
    <div className={cn('flex', 'justify-center', 'w-full', 'px-16')}>
      <div className={cn('w-full', 'max-w-[1320px]', 'flex', 'flex-col')}>
        <ConfirmTeamContainer />
      </div>
    </div>
  );
};

export default ConfirmTeamPage;
