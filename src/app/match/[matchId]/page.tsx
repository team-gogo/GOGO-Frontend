import { Suspense } from 'react';
import MatchDetailPage from '@/views/match/detail/ui/MatchDetailPage';

const page = ({ params }: { params: { matchId: string } }) => {
  return (
    <Suspense>
      <MatchDetailPage params={params} />
    </Suspense>
  );
};

export default page;
