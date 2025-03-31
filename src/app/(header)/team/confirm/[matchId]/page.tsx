import { Suspense } from 'react';
import ConfirmTeamPage from '@/views/team/ui/ConfirmTeamPage';

const Page = ({ params }: { params: { matchId: string } }) => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <ConfirmTeamPage params={{ gameId: params.matchId }} />
    </Suspense>
  );
};

export default Page;
