'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import SearchIcon from '@/shared/assets/icons/SearchIcon';
import ExclamationIcon from '@/shared/assets/svg/ExclamationIcon';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const CreateTeamContainer = () => {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = () => {
    if (
      !teamName.trim() ||
      teamName.trim().length > 10 ||
      teamName.trim().length < 1
    ) {
      toast.error('팀 이름을 올바르게 입력해주세요. (1~10글자)');
      return;
    }

    const membersList = members.split(',').map((member) => member.trim());

    if (!members.trim() || membersList.some((member) => !member)) {
      toast.error('인원을 올바르게 입력해주세요.');
      return;
    }

    const stageId = searchParams.get('stageId');
    sessionStorage.setItem('teamName', teamName);
    sessionStorage.setItem('members', JSON.stringify(membersList));

    router.push(`/team/place?stageId=${stageId}`);
  };

  return (
    <div className={cn('h-screen', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <BackPageButton type="back" label="팀 생성하기" />
      </header>
      <div className={cn('flex-1', 'flex', 'flex-col', 'mt-28', 'gap-28')}>
        <h1 className={cn('text-h3e', 'text-white', 'mb-28')}>경기 이름</h1>
        <div>
          <h2 className={cn('text-body2e', 'text-white', 'mt-24')}>팀 이름</h2>
          <div className={cn('mt-24')}>
            <Input
              placeholder="팀 이름을 입력해주세요."
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              maxLength={10}
            />
          </div>
        </div>
        <div>
          <div className={cn('flex', 'justify-between', 'align-bottom')}>
            <h2 className={cn('text-body2e', 'text-white', 'mt-24')}>인원</h2>
            <h4
              className={cn(
                'text-body3s',
                'text-gray-500',
                'mt-24',
                'flex',
                'justify-between',
                'gap-16',
              )}
            >
              <ExclamationIcon />
              <span>최소 인원 : 0명</span>
              <span>최대 인원 : 4명</span>
            </h4>
          </div>
          <div className={cn('mt-24')}>
            <Input
              placeholder="학생을 입력해주세요."
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              icon={<SearchIcon size={30} />}
            />
          </div>
        </div>
      </div>
      <div className={cn('mt-60', 'mb-30')}>
        <Button bg="bg-main-600" textColor="text-white" onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default CreateTeamContainer;
