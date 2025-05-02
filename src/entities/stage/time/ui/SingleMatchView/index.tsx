import MatchItem from '@/entities/stage/time/ui/MatchItem';
import { MatchData } from '@/shared/types/match';

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

const SingleMatchView = ({
  matches,
  teamIds,
  handleMatchSelect,
  isMatchSelected,
  isMatchTimeSet,
}: MatchViewProps) => (
  <div className="flex w-full flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
    <h2 className="text-center text-h4s text-white">단판승부전</h2>
    <div className="flex flex-col items-center gap-10">
      {matches.finals.length > 0 ? (
        matches.finals.map((match) => (
          <div key={`${match.round}-${match.index}`} className="relative">
            <MatchItem
              index={match.index}
              teamAName={match.teamAName}
              teamBName={match.teamBName}
              teamAId={teamIds[match.teamAName]}
              teamBId={teamIds[match.teamBName]}
              selected={isMatchSelected('단판승부전', match.index)}
              solved={!isMatchTimeSet('단판승부전', match.index)}
              onClick={() => handleMatchSelect('단판승부전', match.index)}
            />
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400">경기 없음</div>
      )}
    </div>
  </div>
);

export default SingleMatchView;
