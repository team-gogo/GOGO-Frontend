import { Suspense } from 'react';
import { SetTimePage } from '@/views/stage/time';

const page = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <SetTimePage />
    </Suspense>
  );
};

export default page;
