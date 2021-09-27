export const mockedGameIssues = [
  {issue: {issueName: '44', priority: 'low', issueDescription: ''},
   players: [
    {player: 'R-sYpgSjJc3DsUbQ3keeA', choice: 0},
    {player: 'FGDGwb4kUHc9abTSb9CjA', choice: 0}
   ],
   score:[],
   totalScore: 0, amendedScore: 0 }
];

export const mockedGamePlayerProps = {
    dealer: {
      avatar: "",
      dealer: true,
      id: "R-sYpgSjJc3DsUbQ3keeA",
      userRole: "member",
      userSurname: "Dealer",
      username: "Smith",
    },
    gameIssues: mockedGameIssues,
    activeIssueName: "44",
    timer: undefined,
    timeStarted: undefined,
    onTimerStop: jest.fn(),
    sprintTitle: '12',
};



const mockUserOne = {
  username: 'Wizy',
  userSurname: 'Bizy',
  avatar: '',
  id: 'ffd_ddd23L',
  userRole: 'member',
  dealer: false,
  score: '',
};

const mockUserTwo = {
  username: 'Janine',
  userSurname: 'Butterfly',
  avatar: '',
  id: 'DFaaa-dfd45',
  userRole: 'member',
  dealer: false,
  score: '',
};

export const chatProps = {
  chatMessages: [
      {
          user: mockUserOne,
          message: 'hello',
      },
      {
          user: mockUserTwo,
          message: 'Hey Wizy!',
      },
  ] 
};

const mockedIssues = [
  {
      issueName: '12',
      priority: 'low',
      issueDescription: 'blah blah',
    },
    {
      issueName: '20',
      priority: 'High',
      issueDescription: 'blah',
    }
];

export const mockIssuesProps = {
  onIssueCreate: jest.fn(),
  onIssueDelete: jest.fn(),
  onIssueEdit: jest.fn(),
  issues: mockedIssues,
};
