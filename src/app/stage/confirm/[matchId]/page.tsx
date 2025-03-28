import { Suspense } from 'react';
import ConfirmTeamPage from '@/views/team/ui/ConfirmTeamPage';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { matchId: string };
}

const Page = ({ params }: PageProps) => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <ConfirmTeamPage params={params} />
    </Suspense>
  );
};

export default Page;
