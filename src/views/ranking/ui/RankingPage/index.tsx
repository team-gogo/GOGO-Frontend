'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  CSSProperties,
} from 'react';
import { RankingUserItem } from '@/entities/ranking';
import { RankItem, RankingData } from '@/shared/types/ranking';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { TopRankListContainer } from '@/widgets/ranking';
import { getRank } from '../../api/getRank';
import type { PageResponse } from 'scrolloop';

const MemoRankingUserItem = React.memo(RankingUserItem);

const InfiniteList = dynamic(
  () => import('scrolloop').then((mod) => mod.InfiniteList),
  { ssr: false },
) as <T>(props: import('scrolloop').InfiniteListProps<T>) => JSX.Element;

const ITEM_HEIGHT = 76;
const PAGE_SIZE = 10;
const MIN_LIST_HEIGHT = 300;
const LIST_BOTTOM_GAP = 24;
const SKIP_TOP = 3;

const RankingPage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  const [topThreeRanks, setTopThreeRanks] = useState<RankItem[]>([]);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState(MIN_LIST_HEIGHT);
  const backendPagesRef = useRef<Map<number, Promise<RankingData>>>(new Map());

  useEffect(() => {
    backendPagesRef.current = new Map();
  }, [stageId]);

  useLayoutEffect(() => {
    const compute = () => {
      const el = listWrapperRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const available = window.innerHeight - top - LIST_BOTTOM_GAP;
      setListHeight(Math.max(MIN_LIST_HEIGHT, available));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const getBackendPage = useCallback(
    (page: number) => {
      let promise = backendPagesRef.current.get(page);
      if (!promise) {
        promise = getRank(stageId, page, PAGE_SIZE).catch((err) => {
          backendPagesRef.current.delete(page);
          throw err;
        });
        backendPagesRef.current.set(page, promise);
      }
      return promise;
    },
    [stageId],
  );

  const fetchPage = useCallback(
    async (page: number, size: number): Promise<PageResponse<RankItem>> => {
      const MAX_ATTEMPTS = 3;
      let lastError: unknown;
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
          const startIdx = SKIP_TOP + page * size;
          const firstBackendPage = Math.floor(startIdx / size);
          const offset = startIdx - firstBackendPage * size;

          const [first, second] = await Promise.all([
            getBackendPage(firstBackendPage),
            getBackendPage(firstBackendPage + 1),
          ]);
          let items = first.rank.slice(offset);
          if (items.length < size) {
            items = items.concat(second.rank.slice(0, size - items.length));
          }

          if (page === 0 && first.rank.length >= SKIP_TOP) {
            setTopThreeRanks(first.rank.slice(0, SKIP_TOP));
          }

          const hasMore = items.length === size;
          const loadedEnd = page * size + items.length;

          return {
            items,
            total: hasMore ? loadedEnd + size : loadedEnd,
            hasMore,
          };
        } catch (error) {
          lastError = error;
          if (attempt < MAX_ATTEMPTS - 1) {
            await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
          }
        }
      }
      throw lastError;
    },
    [getBackendPage],
  );

  const reorderedTopThreeRanks: RankItem[] =
    topThreeRanks.length >= 3
      ? [topThreeRanks[1], topThreeRanks[0], topThreeRanks[2]]
      : topThreeRanks;

  const renderItem = useCallback(
    (item: RankItem | undefined, _index: number, style: CSSProperties) => {
      if (!item) {
        return (
          <div style={style}>
            <div
              className={cn(
                'w-full',
                'h-[3.75rem]',
                'px-24',
                'py-12',
                'flex',
                'justify-between',
                'bg-gray-700',
                'rounded-lg',
                'items-center',
                'animate-pulse',
              )}
            />
          </div>
        );
      }

      return (
        <div style={style}>
          <MemoRankingUserItem rank={item} />
        </div>
      );
    },
    [],
  );

  const renderLoading = useCallback(
    () => (
      <div className={cn('flex', 'items-center', 'justify-center', 'h-full')}>
        <p className={cn('text-gray-400', 'text-body2s')}>로딩 중...</p>
      </div>
    ),
    [],
  );

  const renderEmpty = useCallback(
    () => (
      <div className={cn('flex', 'items-center', 'justify-center', 'h-full')}>
        <p className={cn('text-gray-400', 'text-body2s')}>
          랭킹 데이터가 없습니다.
        </p>
      </div>
    ),
    [],
  );

  const renderError = useCallback(
    (_error: Error, retry: () => void) => (
      <div
        className={cn(
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'h-full',
          'gap-4',
        )}
      >
        <p className={cn('text-gray-400', 'text-body2s')}>
          에러가 발생했습니다.
        </p>
        <button onClick={retry} className={cn('text-main-400', 'text-body2s')}>
          다시 시도
        </button>
      </div>
    ),
    [],
  );

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
        <div ref={listWrapperRef}>
          <InfiniteList<RankItem>
            fetchPage={fetchPage}
            renderItem={renderItem}
            itemSize={ITEM_HEIGHT}
            pageSize={PAGE_SIZE}
            height={listHeight}
            overscan={20}
            prefetchThreshold={3}
            className="scroll-hidden"
            renderLoading={renderLoading}
            renderEmpty={renderEmpty}
            renderError={renderError}
          />
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
