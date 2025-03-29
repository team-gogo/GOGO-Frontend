import { cn } from '@/shared/utils/cn';
import PlaceTeamContainer from '@/widgets/team/ui/PlaceTeamContainer';

interface PlaceTeamPageProps {
  params: {
    gameId: string;
    category: string;
  };
}

const PlaceTeamPage = ({ params }: PlaceTeamPageProps) => {
  return (
    <div className={cn('flex', 'justify-center', 'w-full', 'px-16')}>
      <div className={cn('w-full', 'max-w-[1320px]', 'flex', 'flex-col')}>
        <PlaceTeamContainer params={params} />
      </div>
    </div>
  );
};

export default PlaceTeamPage;
