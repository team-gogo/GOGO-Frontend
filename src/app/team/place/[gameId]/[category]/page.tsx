import { Suspense } from 'react';
import PlaceTeamPage from '@/views/team/ui/PlaceTeamPage';

export default function Page({
  params,
}: {
  params: { gameId: string; category: string };
}) {
  return (
    <Suspense>
      <PlaceTeamPage params={params} />
    </Suspense>
  );
}
