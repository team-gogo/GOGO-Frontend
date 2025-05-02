import MatchItem from '@/entities/stage/time/ui/MatchItem';

interface MatchData {
  index: number;
  teamAName: string;
  teamBName: string;
  round: string;
  startDate?: string;
  endDate?: string;
}

interface MatchViewProps {
  matches: {
    quarterFinals: MatchData[];
    semiFinals: MatchData[];
    finals: MatchData[];
  };
  teamIds: Record<string, number>;
  finalStage?: number;
  gameId?: number;
  handleMatchSelect: (round: string, index: number) => void;
  isMatchSelected: (round: string, index: number) => boolean;
  isMatchTimeSet: (round: string, index: number) => boolean;
}

const LeagueMatchView = ({
  matches,
  teamIds,
  handleMatchSelect,
  isMatchSelected,
  isMatchTimeSet,
}: MatchViewProps) => (
  <div className="flex w-full flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
    <h2 className="text-center text-h4s text-white">리그</h2>
    <div className="grid grid-cols-3 gap-10">
      {matches.finals.length > 0 ? (
        matches.finals.map((match) => (
          <div key={`${match.round}-${match.index}`} className="relative">
            <MatchItem
              index={match.index}
              teamAName={match.teamAName}
              teamBName={match.teamBName}
              teamAId={teamIds[match.teamAName]}
              teamBId={teamIds[match.teamBName]}
              selected={isMatchSelected(match.round, match.index)}
              solved={!isMatchTimeSet(match.round, match.index)}
              onClick={() => handleMatchSelect(match.round, match.index)}
            />
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center text-gray-400">경기 없음</div>
      )}
    </div>
  </div>
);

export default LeagueMatchView;
