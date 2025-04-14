import InspectionModal from '@/shared/ui/InspectionModal';
import { MainPage } from '@/views/main';

export default function Home() {
  return (
    <>
      <MainPage />
      <InspectionModal service="GOGO" onClose={() => {}} />
    </>
  );
}
