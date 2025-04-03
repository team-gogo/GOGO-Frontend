import MatchItem from '@/entities/stage/time/ui/MatchItem';

interface MatchData {
  index: number;
  teamAName: string;
  teamBName: string;
  round: string;
  startDate?: string;
  endDate?: string;
}

interface MatchSectionProps {
  title: string;
  matchList: MatchData[];
  finalStage: number;
  teamIds: Record<string, number>;
  onMatchSelect: (round: string, index: number) => void;
  isMatchSelected: (round: string, index: number) => boolean;
  isMatchTimeSet: (round: string, index: number) => boolean;
}

const MatchSection = ({
  title,
  matchList,
  finalStage,
  teamIds,
  onMatchSelect,
  isMatchSelected,
  isMatchTimeSet,
}: MatchSectionProps) => (
  <div className="flex w-1/3 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
    <h2 className="text-center text-h4s text-white">{title}</h2>
    <div className="flex flex-col items-center gap-10">
      {matchList.length > 0 ? (
        matchList
          .filter(
            (match) =>
              !(
                (finalStage === 8 &&
                  match.round === '8강' &&
                  match.teamBName === 'TBD' &&
                  match.teamAName === 'TBD') ||
                (finalStage === 4 &&
                  match.round === '4강' &&
                  match.teamBName === 'TBD' &&
                  match.teamAName === 'TBD')
              ),
          )
          .map((match) => (
            <div key={`${match.round}-${match.index}`} className="relative">
              <MatchItem
                index={match.index}
                teamAName={match.teamAName}
                teamBName={
                  match.teamBName === '부전승'
                    ? `${match.teamAName}(부전승)`
                    : match.teamBName
                }
                teamAId={teamIds[match.teamAName]}
                teamBId={teamIds[match.teamBName]}
                selected={isMatchSelected(match.round, match.index)}
                solved={!isMatchTimeSet(match.round, match.index)}
                onClick={() => onMatchSelect(match.round, match.index)}
              />
            </div>
          ))
      ) : (
        <div className="text-center text-gray-400">경기 없음</div>
      )}
    </div>
  </div>
);

export default MatchSection;
