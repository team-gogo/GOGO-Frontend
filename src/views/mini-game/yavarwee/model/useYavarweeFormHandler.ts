'use client';

import { useCallback } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { YavarweeForm } from '@/shared/types/mini-game/yavarwee';
import { useBetYavarweeMutation } from '../model/useBetYavarweeMutation';

interface Props {
  stageId: string;
  round: number;
  gameState: string;
  watch: UseFormWatch<YavarweeForm>;
  setLocalPoint: (fn: (prev: number) => number) => void;
  setLocalTicket: (fn: (prev: number) => number) => void;
  setBetUuid: (uuid: string) => void;
  startGameWithRound: (r: number) => void;
}

export function useYavarweeFormHandler({
  stageId,
  round,
  gameState,
  watch,
  setLocalPoint,
  setLocalTicket,
  setBetUuid,
  startGameWithRound,
}: Props) {
  const { mutate: betYavarwee, isPending } = useBetYavarweeMutation(stageId);

  const onSubmit = useCallback(
    (data: YavarweeForm) => {
      if (gameState !== 'betting') return;
      const payload = { ...data, amount: Number(data.amount) };
      betYavarwee(payload, {
        onSuccess: (res) => {
          const amt = Number(watch('amount'));
          setLocalPoint((prev) => prev - amt);
          setLocalTicket((prev) => prev - 1);
          setBetUuid(res.uuid);
          startGameWithRound(round);
        },
        onError: (err) => {
          toast.error(err.message || '베팅 중 오류가 발생했습니다.');
        },
      });
    },
    [
      gameState,
      round,
      watch,
      betYavarwee,
      setLocalPoint,
      setLocalTicket,
      setBetUuid,
      startGameWithRound,
    ],
  );

  return { onSubmit, isPending };
}
