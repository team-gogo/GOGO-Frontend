import { Suspense } from 'react';
import CreateTeamPage from '@/views/team/ui/CreateTeamPage';

export default function Page() {
  return (
    <Suspense>
      <CreateTeamPage />
    </Suspense>
  );
}
