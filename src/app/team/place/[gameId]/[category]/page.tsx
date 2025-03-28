import { Suspense } from 'react';
import PlaceTeamContainer from '@/widgets/team/ui/PlaceTeamContainer';

export default function PlaceTeamPage({
  params,
}: {
  params: { gameId: string; category: string };
}) {
  return (
    <Suspense>
      <PlaceTeamContainer params={params} />
    </Suspense>
  );
}
