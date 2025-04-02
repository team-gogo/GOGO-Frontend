'use client';

import React, { useEffect } from 'react';
import {
  RegisterHeader,
  RegisterItem,
} from '@/entities/stage/teams/registered';
import useTeamDetailInfoStore from '@/shared/stores/useTeamDetailInfoStore';
import { cn } from '@/shared/utils/cn';
import { useGetMatchApplyList } from '@/views/stage/apply/model/useGetMatchApplyList';
import { useGetTeamRegisterQuery } from '../../model/useGetTeamRegisterQuery';

interface RegisterContainerProps {
  gameId: string;
  stageId: string;
}

const RegisterContainer = ({ stageId, gameId }: RegisterContainerProps) => {
  const { data, isLoading, error } = useGetTeamRegisterQuery(gameId);
  const { data: matchApplyList } = useGetMatchApplyList(Number(stageId));

  const { category, setCategory } = useTeamDetailInfoStore();

  useEffect(() => {
    const matchGame = matchApplyList?.games.find(
      (game) => game.gameId.toString() === gameId,
    );

    if (matchGame && matchGame.category !== category) {
      setCategory(matchGame.category);
    }
  }, [matchApplyList, gameId, category, setCategory]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading teams</p>;

  const registerItems = data?.team ?? [];
  const teamCount = registerItems.length.toString();

  return (
    <div className={cn('space-y-24')}>
      <RegisterHeader TeamCount={teamCount} />

      {registerItems.map((item) => (
        <RegisterItem
          key={item.teamId}
          teamId={item.teamId}
          teamName={item.teamName}
        />
      ))}
    </div>
  );
};

export default RegisterContainer;
