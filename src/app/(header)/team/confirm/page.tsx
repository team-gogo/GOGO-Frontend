import { Suspense } from 'react';
import ConfirmTeamPage from '@/views/team/ui/ConfirmTeamPage';

const Page = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <ConfirmTeamPage />
    </Suspense>
  );
};

export default Page;
