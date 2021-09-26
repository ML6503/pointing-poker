export const mockedGamePlayerProps = {
    dealer: {
      avatar: "",
      dealer: true,
      id: "R-sYpgSjJc3DsUbQ3keeA",
      userRole: "member",
      userSurname: "Dealer",
      username: "Smith",
    },
    gameIssues: [
      {issue: {issueName: '44', priority: 'low', issueDescription: ''},
       players: [
        {player: 'R-sYpgSjJc3DsUbQ3keeA', choice: 0},
        {player: 'FGDGwb4kUHc9abTSb9CjA', choice: 0}
       ],
       score:[],
       totalScore: 0, amendedScore: 0 }
    ],
    activeIssueName: "44",
    timer: undefined,
    timeStarted: undefined,
    onTimerStop: jest.fn(),
    sprintTitle: '12',
};
