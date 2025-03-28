import CreateTeamPage from '@/views/team/ui/CreateTeamPage';

export default function Page({
  params,
  searchParams,
}: {
  params: { stageId: string };
  searchParams: { matchId?: string; category?: string };
}) {
  const combinedParams = {
    ...params,
    ...searchParams,
  };

  return <CreateTeamPage params={combinedParams} />;
}
