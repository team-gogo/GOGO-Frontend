'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  CSSProperties,
} from 'react';
import { RankingUserItem } from '@/entities/ranking';
import { RankItem } from '@/shared/types/ranking';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { TopRankListContainer } from '@/widgets/ranking';
import { getRank } from '../../api/getRank';

const MemoRankingUserItem = React.memo(RankingUserItem);

const VirtualList = dynamic(
  () => import('scrolloop').then((mod) => mod.VirtualList),
  { ssr: false },
);

const ITEM_HEIGHT = 76;
const PAGE_SIZE = 10;
const ALL_PAGE_SIZE = 200;
const MIN_LIST_HEIGHT = 300;
const LIST_BOTTOM_GAP = 24;
const SKIP_TOP = 3;

const supportsUntilFound = () =>
  typeof document !== 'undefined' &&
  document.body != null &&
  'onbeforematch' in document.body;

const findScroller = (root: HTMLElement): HTMLElement | null => {
  const candidates = root.querySelectorAll<HTMLElement>('*');
  for (const el of Array.from(candidates)) {
    const style = getComputedStyle(el);
    if (style.overflowY === 'auto' || style.overflowY === 'scroll') return el;
  }
  return null;
};

const SearchableRow = ({ index, rank }: { index: number; rank: RankItem }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.setAttribute('hidden', 'until-found');
  }, []);

  return (
    <div ref={ref} data-index={index}>
      {rank.rank}등 {rank.name}
    </div>
  );
};

const RankingPage = () => {
  const { stageId } = useParams<{ stageId: string }>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['ranking', stageId],
      queryFn: ({ pageParam }) => getRank(stageId, pageParam, PAGE_SIZE),
      initialPageParam: 0,
      getNextPageParam: (last, pages) =>
        last.rank.length === PAGE_SIZE ? pages.length : undefined,
    });

  const { data: fullData, refetch: fetchAll } = useQuery({
    queryKey: ['ranking-all', stageId],
    queryFn: () => getRank(stageId, 0, ALL_PAGE_SIZE),
    enabled: false,
    staleTime: 60_000,
  });

  const allRanks = useMemo<RankItem[]>(
    () => fullData?.rank ?? data?.pages.flatMap((p) => p.rank) ?? [],
    [data, fullData],
  );
  const topThree = useMemo(() => allRanks.slice(0, SKIP_TOP), [allRanks]);
  const remaining = useMemo(() => allRanks.slice(SKIP_TOP), [allRanks]);
  const reorderedTopThree = useMemo<RankItem[]>(
    () =>
      topThree.length >= SKIP_TOP
        ? [topThree[1], topThree[0], topThree[2]]
        : topThree,
    [topThree],
  );

  const listWrapperRef = useRef<HTMLDivElement>(null);
  const searchLayerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLElement | null>(null);
  const [listHeight, setListHeight] = useState(MIN_LIST_HEIGHT);
  const [canRenderSidecar, setCanRenderSidecar] = useState(false);

  useEffect(() => {
    setCanRenderSidecar(supportsUntilFound());
  }, []);

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

  const fullDataRef = useRef(fullData);
  fullDataRef.current = fullData;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!((e.metaKey || e.ctrlKey) && e.key === 'f')) return;
      if (fullDataRef.current) return;
      fetchAll();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fetchAll]);

  useEffect(() => {
    const layer = searchLayerRef.current;
    const wrapper = listWrapperRef.current;
    if (!layer || !wrapper) return;

    const onBeforeMatch = (e: Event) => {
      const target = e.target as HTMLElement;
      const idx = Number(target.dataset.index);
      if (!Number.isFinite(idx)) return;

      if (!scrollerRef.current) {
        scrollerRef.current = findScroller(wrapper);
      }

      setTimeout(() => {
        scrollerRef.current?.scrollTo({
          top: idx * ITEM_HEIGHT,
          behavior: 'smooth',
        });
        target.setAttribute('hidden', 'until-found');
      }, 0);
    };

    layer.addEventListener('beforematch', onBeforeMatch, true);
    return () => layer.removeEventListener('beforematch', onBeforeMatch, true);
  }, [canRenderSidecar]);

  const handleRangeChange = useCallback(
    ({ endIndex }: { startIndex: number; endIndex: number }) => {
      if (
        hasNextPage &&
        !isFetchingNextPage &&
        endIndex >= remaining.length - PAGE_SIZE / 2
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, remaining.length, fetchNextPage],
  );

  const renderItem = useCallback(
    (index: number, style: CSSProperties) => (
      <div style={style}>
        <MemoRankingUserItem rank={remaining[index]} />
      </div>
    ),
    [remaining],
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
        <TopRankListContainer topRanks={reorderedTopThree} />
        <div ref={listWrapperRef}>
          <VirtualList
            count={remaining.length}
            itemSize={ITEM_HEIGHT}
            height={listHeight}
            overscan={10}
            className="scroll-hidden"
            renderItem={renderItem}
            onRangeChange={handleRangeChange}
          />
        </div>
        {canRenderSidecar && (
          <div
            ref={searchLayerRef}
            aria-hidden="true"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 1,
              height: 1,
              padding: 0,
              margin: 0,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
              pointerEvents: 'none',
            }}
          >
            {remaining.map((rank, i) => (
              <SearchableRow key={rank.studentId} index={i} rank={rank} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingPage;
