import { cn } from '@/shared/utils/cn';
import CreateTeamContainer from '@/widgets/team/ui/CreateTeamContainer';

interface CreateTeamPageProps {
  params: {
    stageId: string;
    matchId?: string;
    category?: string;
  };
}

const CreateTeamPage = ({ params }: CreateTeamPageProps) => {
  return (
    <div className={cn('flex', 'justify-center', 'w-full', 'px-16')}>
      <div className={cn('w-full', 'max-w-[1320px]', 'flex', 'flex-col')}>
        <CreateTeamContainer params={params} />
      </div>
    </div>
  );
};

export default CreateTeamPage;
