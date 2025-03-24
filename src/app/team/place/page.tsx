import { Suspense } from 'react';
import PlaceTeamPage from '@/views/team/ui/PlaceTeamPage/index';

export default function Page() {
  return (
    <Suspense>
      <PlaceTeamPage />
    </Suspense>
  );
}
