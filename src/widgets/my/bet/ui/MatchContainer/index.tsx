import Match from '@/shared/ui/match';
import { cn } from '@/shared/utils/cn';

const MatchContainer = () => {
  return (
    <div className={cn('w-full', 'flex', 'flex-col', 'gap-[1.5rem]')}>
      <h2 className={cn('text-body1e', 'text-white')}>내가 참여한 스테이지</h2>
      <div
        className={cn(
          'grid',
          'grid-cols-2',
          'gap-x-[2.5rem]',
          'gap-y-[2rem]',
          'tablet:grid-cols-1',
        )}
      >
        <Match
          sportType={'SOCCER'}
          point={10000}
          team={['A', 'B']}
          team1Point={1000}
          team2Point={500}
          time={'12:00'} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          isBetPossible={false} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          isPlaying={true} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          isFinish={false} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          winnerTeam={'A'}
          isPredictSuccess={true}
          resultPoint={100000}
        />
        <Match
          sportType={'SOCCER'}
          point={10000}
          team={['A', 'B']}
          team1Point={1000}
          team2Point={500}
          time={'12:00'} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          isBetPossible={false} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          isPlaying={true} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          isFinish={false} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          winnerTeam={'A'}
          isPredictSuccess={true}
          resultPoint={100000}
        />
        <Match
          sportType={'SOCCER'}
          point={10000}
          team={['A', 'B']}
          team1Point={1000}
          team2Point={500}
          time={'12:00'} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          isBetPossible={false} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          isPlaying={true} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          isFinish={false} //시간 관련 props 추후 백엔드 api spec 나올 시 반영
          winnerTeam={'A'}
          isPredictSuccess={true}
          resultPoint={100000}
        />
      </div>
    </div>
  );
};

export default MatchContainer;
