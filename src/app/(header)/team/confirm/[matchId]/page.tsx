import { Suspense } from 'react';
import ConfirmTeamContainer from '@/widgets/team/ui/ConfirmTeamContainer';

const Page = ({ params }: { params: { matchId: string } }) => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <ConfirmTeamContainer params={params} />
    </Suspense>
  );
};

export default Page;
