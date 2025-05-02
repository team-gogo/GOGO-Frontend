import MatchItem from '@/entities/stage/time/ui/MatchItem';
import MatchSection from '@/entities/stage/time/ui/MatchSection';
import { MatchData } from '@/shared/types/match';

interface TeamData {
  teamId: number;
  teamName: string;
}

interface MatchViewProps {
  matches: {
    quarterFinals: MatchData[];
    semiFinals: MatchData[];
    finals: MatchData[];
  };
  teamIds: Record<string, number>;
  finalStage: number;
  gameId: number;
  handleMatchSelect: (round: string, index: number) => void;
  isMatchSelected: (round: string, index: number) => boolean;
  isMatchTimeSet: (round: string, index: number) => boolean;
}

const TournamentMatchView = ({
  matches,
  teamIds,
  finalStage,
  gameId,
  handleMatchSelect,
  isMatchSelected,
  isMatchTimeSet,
}: MatchViewProps) => {
  if (finalStage === 4) {
    const confirmedTeamsData = sessionStorage.getItem(
      `confirmedTeams_${gameId}`,
    );

    if (confirmedTeamsData) {
      const teams = JSON.parse(confirmedTeamsData) as TeamData[];
      if (teams.length === 3) {
        const byeTeamData = sessionStorage.getItem(`threeTeamBye_${gameId}`);
        let byeTeamName = 'TBD';

        if (byeTeamData) {
          try {
            const byeTeam = JSON.parse(byeTeamData) as TeamData;
            byeTeamName = byeTeam.teamName;
          } catch (error) {
            console.error(error);
          }
        }

        const semiFinalTeams: string[] = [];
        if (matches.semiFinals.length > 0) {
          const match = matches.semiFinals[0];
          if (match.teamAName && match.teamAName !== 'TBD')
            semiFinalTeams.push(match.teamAName);
          if (match.teamBName && match.teamBName !== 'TBD')
            semiFinalTeams.push(match.teamBName);
        }

        return (
          <>
            <div className="flex w-1/2 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
              <h2 className="text-center text-h4s text-white">4강</h2>
              <div className="flex flex-col items-center gap-10">
                <div className="relative">
                  <MatchItem
                    index={1}
                    teamAName={semiFinalTeams[0] || 'TBD'}
                    teamBName={semiFinalTeams[1] || 'TBD'}
                    teamAId={teamIds[semiFinalTeams[0] || 'TBD']}
                    teamBId={teamIds[semiFinalTeams[1] || 'TBD']}
                    selected={isMatchSelected('4강', 1)}
                    solved={!isMatchTimeSet('4강', 1)}
                    onClick={() => handleMatchSelect('4강', 1)}
                  />
                </div>
              </div>
            </div>

            <div className="flex w-1/2 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
              <h2 className="text-center text-h4s text-white">결승</h2>
              <div className="flex flex-col items-center gap-10">
                <div className="relative">
                  <MatchItem
                    index={1}
                    teamAName="TBD"
                    teamBName={byeTeamName}
                    teamAId={teamIds['TBD']}
                    teamBId={teamIds[byeTeamName]}
                    selected={isMatchSelected('결승', 1)}
                    solved={!isMatchTimeSet('결승', 1)}
                    onClick={() => handleMatchSelect('결승', 1)}
                  />
                </div>
              </div>
            </div>
          </>
        );
      }
    }

    return (
      <>
        <div className="flex w-1/2 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
          <h2 className="text-center text-h4s text-white">4강</h2>
          <div className="flex flex-col items-center gap-10">
            {matches.semiFinals.length > 0 ? (
              matches.semiFinals
                .filter(
                  (match) =>
                    !(match.teamAName === 'TBD' && match.teamBName === 'TBD'),
                )
                .map((match) => (
                  <div
                    key={`${match.round}-${match.index}`}
                    className="relative"
                  >
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
                      onClick={() =>
                        handleMatchSelect(match.round, match.index)
                      }
                      solved={!isMatchTimeSet(match.round, match.index)}
                    />
                  </div>
                ))
            ) : (
              <div className="text-center text-gray-400">경기 없음</div>
            )}
          </div>
        </div>

        <div className="flex w-1/2 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
          <h2 className="text-center text-h4s text-white">결승</h2>
          <div className="flex flex-col items-center gap-10">
            {matches.finals.map((match) => (
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
                  onClick={() => handleMatchSelect(match.round, match.index)}
                />
              </div>
            ))}
            {matches.finals.length === 0 ? (
              <div className="text-center text-gray-400">경기 없음</div>
            ) : null}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-row gap-4 overflow-x-auto p-4 phone:w-full mobile:w-full pad:w-full laptop:w-full [&::-webkit-scrollbar]:hidden">
      <MatchSection
        title="8강"
        matchList={matches.quarterFinals}
        finalStage={finalStage}
        teamIds={teamIds}
        onMatchSelect={handleMatchSelect}
        isMatchSelected={isMatchSelected}
        isMatchTimeSet={isMatchTimeSet}
      />
      <MatchSection
        title="4강"
        matchList={matches.semiFinals}
        finalStage={finalStage}
        teamIds={teamIds}
        onMatchSelect={handleMatchSelect}
        isMatchSelected={isMatchSelected}
        isMatchTimeSet={isMatchTimeSet}
      />
      <MatchSection
        title="결승"
        matchList={matches.finals}
        finalStage={finalStage}
        teamIds={teamIds}
        onMatchSelect={handleMatchSelect}
        isMatchSelected={isMatchSelected}
        isMatchTimeSet={isMatchTimeSet}
      />
    </div>
  );
};

export default TournamentMatchView;
