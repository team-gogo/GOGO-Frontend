'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePointTicketStore } from '@/shared/stores';
import { PlinkoFormType, PlinkoResponse } from '@/shared/types/mini-game';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { formatPlinkoData } from '@/views/mini-game/model/formatPlinkoData';
import { useGetBetLimit } from '@/views/mini-game/model/useGetBetLimit';
import { useGetMyPointQuery } from '@/views/mini-game/model/useGetMyPointQuery';
import { useGetMyTicketQuery } from '@/views/mini-game/model/useGetMyTicketQuery';
import { usePlinkoForm } from '@/views/mini-game/model/usePlinkoForm';
import { usePostPlinkoGame } from '@/views/mini-game/model/usePostPlinkoGame';
import { PlinkoGame, PlinkoInputBox } from '@/widgets/mini-game';

const PlinkoPage = () => {
  const params = useParams<{ boardId: string; stageId: string }>();
  const { stageId } = params;
  const { back } = useRouter();

  const { point, setPoint, ticket, setTicket } = usePointTicketStore();

  const [plinkoData, setPlinkoData] = useState<PlinkoResponse | null>(null);
  const [gameRunningCount, setGameRunningCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data: myPoint, refetch: refetchMyPoint } =
    useGetMyPointQuery(stageId);
  const { data: myTicket, refetch: refetchMyTicket } = useGetMyTicketQuery(
    String(stageId),
  );

  useEffect(() => {
    if (myPoint !== undefined && myPoint !== null) {
      setPoint(myPoint.point || 0);
    }

    if (myTicket !== undefined && myTicket !== null) {
      setTicket(myTicket.plinko || 0);
    }
  }, [myPoint, myTicket]);

  useEffect(() => {
    const handlePopState = () => {
      refetchMyPoint();
      refetchMyTicket();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    onError,
    setValue,
    selectedRisk,
    setSelectedRisk,
  } = usePlinkoForm();

  const amount = watch('amount');
  const risk = watch('risk');

  const isDisabled = !!(!amount || !risk || ticket === 0 || amount > point);

  const { mutate: PostPlinko } = usePostPlinkoGame(Number(stageId), amount);
  const { data: betLimitData } = useGetBetLimit(stageId);

  const minBetLimit = betLimitData?.plinko.minBetPoint || 0;
  const maxBetLimit = betLimitData?.plinko.maxBetPoint || 0;

  const onSubmit = (data: PlinkoFormType) => {
    if (isLoading) return;

    const formattedAmount = data.amount;

    if (formattedAmount < minBetLimit || formattedAmount > maxBetLimit) {
      toast.error(
        `배팅 금액은 최소 ${minBetLimit} 이상, 최대 ${maxBetLimit} 이하여야 합니다.`,
      );
      return;
    }

    setIsLoading(true);
    const formattedData = formatPlinkoData(data, selectedRisk);

    PostPlinko(formattedData, {
      onSuccess: (response: PlinkoResponse) => {
        setPlinkoData(response);
        setIsLoading(false);
      },
      onError: () => {
        console.error('게임 요청 실패');
        setIsLoading(false);
      },
    });
  };

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'items-center',
        'justify-center',
        'py-[5rem]',
      )}
    >
      <div
        className={cn(
          'w-full',
          'max-w-[82.5rem]',
          'px-[1rem]',
          'flex',
          'flex-col',
          'gap-[3rem]',
        )}
      >
        <BackPageButton
          label="플린코"
          onClick={() => {
            refetchMyPoint();
            refetchMyTicket();
            back();
          }}
        />
        <div
          className={cn(
            'w-full',
            'flex',
            'desktop:items-start',
            'items-center',
            'desktop:flex-row',
            'flex-col-reverse',
            'justify-between',
            'gap-[2rem]',
          )}
        >
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className={cn(
              'flex',
              'gap-[2.5rem]',
              'flex-col',
              'desktop:w-[24.5rem]',
              'w-full',
            )}
          >
            <PlinkoInputBox
              money={point}
              ticket={ticket}
              isDisabled={isDisabled}
              register={register}
              setValue={setValue}
              selectedRisk={selectedRisk}
              setSelectedRisk={setSelectedRisk}
              gameRunningCount={gameRunningCount}
              minBetLimit={minBetLimit}
              maxBetLimit={maxBetLimit}
            />
          </form>

          <PlinkoGame
            watch={watch}
            plinkoData={plinkoData}
            setGameRunningCount={setGameRunningCount}
          />
        </div>
      </div>
    </div>
  );
};

export default PlinkoPage;
