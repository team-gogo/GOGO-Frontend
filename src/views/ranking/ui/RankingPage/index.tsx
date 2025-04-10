'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RankItem } from '@/shared/types/ranking';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { RankingUserContainer, TopRankListContainer } from '@/widgets/ranking';
import { useGetRankingQuery } from '../../model/useGetRankingQuery';

const RankingPage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  const [page, setPage] = useState(0);
  const size = 10;
  const [allRanks, setAllRanks] = useState<RankItem[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);

  const { data, isFetching } = useGetRankingQuery(stageId, page, size);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollYRef = useRef(0);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetching && !isLastPage) {
        prevScrollYRef.current = window.scrollY;
        setPage((prev) => prev + 1);
      }
    },
    [isFetching],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    if (data?.rank) {
      setAllRanks((prev) => {
        const newItems = data.rank.filter(
          (item) =>
            !prev.find((prevItem) => prevItem.studentId === item.studentId),
        );

        // ✅ 새로 추가된 게 없다면 마지막 페이지로 판단
        if (newItems.length === 0) {
          setIsLastPage(true);
        }

        if (newItems.length > 0) {
          requestAnimationFrame(() => {
            window.scrollTo({ top: prevScrollYRef.current, behavior: 'auto' });
          });
        }

        return [...prev, ...newItems];
      });
    }
  }, [data]);

  const topThreeRanks: RankItem[] = allRanks.slice(0, 3);
  const reorderedTopThreeRanks: RankItem[] = [
    topThreeRanks[1],
    topThreeRanks[0],
    topThreeRanks[2],
  ];
  const remainingRanks: RankItem[] = allRanks.slice(3);

  return (
    <div
      className={cn(
        'w-full',
        'max-w-[82.5rem]',
        'flex',
        'flex-col',
        'space-y-[3rem]',
      )}
    >
      <BackPageButton label="포인트 랭킹" type="back" />
      <div className={cn('space-y-[2.25rem]')}>
        <TopRankListContainer topRanks={reorderedTopThreeRanks} />
        <RankingUserContainer remainingRanks={remainingRanks} />
        <div ref={observerRef} className="h-10" />
      </div>
    </div>
  );
};

export default RankingPage;
