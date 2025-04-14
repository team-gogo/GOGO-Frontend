import InspectionModal from '@/shared/ui/InspectionModal';
import { MatchTeamPage } from '@/views/match';

const page = () => {
  return (
    <>
      <MatchTeamPage />
      <InspectionModal service="GOGO" onClose={() => {}} />
    </>
  );
};

export default page;
