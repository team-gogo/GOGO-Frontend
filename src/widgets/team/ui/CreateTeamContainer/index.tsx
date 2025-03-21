'use client';

import { useState } from 'react';
// import { postPassCode } from '@/entities/team/api/postPassCode';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const CreateTeamContainer = () => {
  const [members, setMembers] = useState('');
  const [passCode, setPassCode] = useState('');

  // const handleSubmit = async () => {
  //   try {
  //     const stageId =
  //     const response = await postPassCode(stageId, passCode);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className={cn('h-screen', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <BackPageButton type="back" label="팀 생성하기" />
      </header>
      <div className={cn('flex-1', 'flex', 'flex-col', 'mt-28')}>
        <h1 className={cn('text-h3e', 'text-white', 'mb-28', 'mt-28')}>
          경기 이름
        </h1>
        <h2 className={cn('text-body2e', 'text-white', 'mt-24')}>
          {'입장 번호'}
        </h2>
        <div className={cn('mt-24')}>
          <Input
            placeholder="입장 번호 입력"
            value={passCode}
            onChange={(e) => setPassCode(e.target.value)}
          />
        </div>
        <h2 className={cn('text-body2e', 'text-white', 'mt-24')}>{'인원'}</h2>
        <div className={cn('mt-24')}>
          <Input
            placeholder="학생을 입력해주세요."
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />
        </div>
      </div>
      <div className={cn('mt-60', 'mb-30')}>
        <Button bg="bg-main-600" textColor="text-white">
          확인
        </Button>
      </div>
    </div>
  );
};

export default CreateTeamContainer;
