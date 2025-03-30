import { Suspense } from 'react';
import { CreateBracketPage } from '@/views/stage/bracket';

const page = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <CreateBracketPage />
    </Suspense>
  );
};

export default page;
