'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getStageGame } from '@/entities/community/api/getStageGame';
import { postTeam } from '@/entities/team/api/postTeam';
import ExclamationIcon from '@/shared/assets/svg/ExclamationIcon';
import { StageData } from '@/shared/types/stage/create';
import { Student } from '@/shared/types/stage/create';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import InviteStudentInput, {
  InviteStudentInputRef,
} from '@/shared/ui/InviteStudentInput';
import { cn } from '@/shared/utils/cn';

interface CreateTeamContainerProps {
  params: {
    stageId: string;
    matchId?: string;
    category?: string;
  };
}

const SUPPORTED_SPORTS = ['BASKET_BALL', 'BADMINTON', 'SOCCER', 'VOLLEY_BALL'];

const CreateTeamContainer = ({ params }: CreateTeamContainerProps) => {
  const [teamName, setTeamName] = useState('');
  const [teamCapacity, setTeamCapacity] = useState({ min: 0, max: 0 });
  const router = useRouter();
  const { stageId, matchId, category } = params;

  useEffect(() => {
    const fetchGameInfo = async () => {
      if (stageId) {
        const response = await getStageGame(stageId);
        if (response.games && response.games.length > 0) {
          const { teamMinCapacity, teamMaxCapacity } = response.games[0];
          setTeamCapacity({ min: teamMinCapacity, max: teamMaxCapacity });
        }
      }
    };
    fetchGameInfo();
  }, [stageId]);

  const inviteStudentRef = useRef<InviteStudentInputRef>(null);
  const {
    register,
    setValue,
    handleSubmit: handleFormSubmit,
  } = useForm<StageData>();

  const handleTeamCreation = async (selectedStudents: Student[]) => {
    if (!matchId) {
      toast.error('게임 정보가 없습니다.');
      return;
    }

    try {
      const participants = selectedStudents.map((student) => ({
        studentId: student.studentId,
        positionX: '0',
        positionY: '0',
      }));

      await postTeam({
        teamName,
        participants,
        gameId: matchId,
      });

      router.push(`/team/place/${matchId}/${category}`);
    } catch (error) {
      console.error(error);
      toast.error('팀 생성에 실패했습니다.');
    }
  };

  const onSubmit = async (_data: StageData) => {
    if (
      !teamName.trim() ||
      teamName.trim().length > 10 ||
      teamName.trim().length < 1
    ) {
      toast.error('팀 이름을 올바르게 입력해주세요. (1~10글자)');
      return;
    }

    const selectedStudents =
      inviteStudentRef.current?.getSelectedStudents() || [];

    if (selectedStudents.length === 0) {
      toast.error('인원을 올바르게 입력해주세요.');
      return;
    }

    if (category && SUPPORTED_SPORTS.includes(category)) {
      sessionStorage.setItem('teamName', teamName);
      sessionStorage.setItem('members', JSON.stringify(selectedStudents));
      sessionStorage.setItem('gameId', matchId || '');
      sessionStorage.setItem('category', category);
      sessionStorage.setItem('stageId', stageId || '');
      router.push(`/team/place/${matchId}/${category}`);
    } else {
      await handleTeamCreation(selectedStudents);
    }
  };

  return (
    <div className={cn('h-screen', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <BackPageButton type="back" label="팀 생성하기" />
      </header>
      <form
        onSubmit={handleFormSubmit(onSubmit)}
        className={cn('flex-1', 'flex', 'flex-col', 'mt-28', 'gap-28')}
      >
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
              <span>최소 인원 : {teamCapacity.min}명</span>
              <span>최대 인원 : {teamCapacity.max}명</span>
            </h4>
          </div>
          <div className={cn('mt-24')}>
            <InviteStudentInput
              ref={inviteStudentRef}
              register={register}
              setValue={setValue}
              title=" "
              description=" "
            />
          </div>
        </div>
        <div className={cn('mt-60', 'mb-30')}>
          <Button type="submit" bg="bg-main-600" textColor="text-white">
            확인
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamContainer;
