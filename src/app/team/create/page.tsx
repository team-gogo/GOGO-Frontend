import CreateTeamContainer from '@/widgets/team/ui/CreateTeamContainer';

export default function CreateTeamPage({
  params,
}: {
  params: { stageId: string };
}) {
  return <CreateTeamContainer params={params} />;
}
