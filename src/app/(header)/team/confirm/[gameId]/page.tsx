import { Suspense } from 'react';
import InspectionModal from '@/shared/ui/InspectionModal';
import ConfirmTeamPage from '@/views/team/ui/ConfirmTeamPage';

const Page = ({ params }: { params: { gameId: string } }) => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <ConfirmTeamPage params={params} />
      <InspectionModal service="GOGO" onClose={() => {}} />
    </Suspense>
  );
};

export default Page;
