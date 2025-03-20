import { cn } from '@/shared/utils/cn';
import PlaceTeamContainer from '@/widgets/team/ui/PlaceTeamContainer';

const PlaceTeamPage = () => {
  return (
    <div className={cn('flex', 'justify-center', 'w-full', 'px-16')}>
      <div className={cn('w-full', 'max-w-[1320px]', 'flex', 'flex-col')}>
        <PlaceTeamContainer />
      </div>
    </div>
  );
};

export default PlaceTeamPage;
