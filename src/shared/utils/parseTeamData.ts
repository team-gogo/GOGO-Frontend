export const parseTeamData = (matchId: number) => {
  const placedTeamsKey = `placedTeams_${matchId}`;
  const confirmedTeamsKey = `confirmedTeams_${matchId}`;

  const placedTeamsData = sessionStorage.getItem(placedTeamsKey);
  const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);

  return {
    placedTeams: placedTeamsData ? JSON.parse(placedTeamsData) : null,
    confirmedTeams: confirmedTeamsData ? JSON.parse(confirmedTeamsData) : [],
    totalTeamCount: confirmedTeamsData
      ? JSON.parse(confirmedTeamsData).length
      : 0,
  };
};
