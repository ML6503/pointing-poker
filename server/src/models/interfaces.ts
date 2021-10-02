export interface IRoomInfo {
  roomId: string;
  roomName: string;
}

export interface IUserData {
  username: string;
  userSurname: string;
  avatar: string;
  id: string;
  userRole: string;
  dealer: boolean;
}

export interface IChatMessage {
  user: IUserData;
  message: string;
}

export interface IIssue {
  issueName: string;
  priority: string;
  issueDescription: string;
}

export interface IGameTimer {
  isTimer: boolean;
  time: number;
  // minutes: number;
  // seconds: number;
}

export interface IGameCard {
  cardDeck: string;
  sequence: string;
  cardNumber: number;
  cardTurn: boolean;
}

export interface IGamePlayer {
  player: string | IUserData;
  choice: number;
}

export interface IGameIssueScore  {
  choice: number;
  ratio: number;
}

export interface IPlayerChoice {
  issue: string;
  playerId: string;
  playerChoice: number;
}

export interface IGameIssue {
  issue: IIssue;
  players: Array<IGamePlayer>;
  score: Array<IGameIssueScore>;
  totalScore: number;
  amendedScore: number;
}

export interface IGameSettingsFromClient {
  sprintName: string;
  issues: Array<IIssue>;
  timer: IGameTimer;
  card: IGameCard;
  isAutoJoin: boolean;
  isStarted: boolean;
  isVoting: boolean;
  customSequence?:  Array<string>;
}

export interface IGameSettings {
  sprintName: string;
  issues: Array<IGameIssue>;
  timer: IGameTimer;
  card: IGameCard;
  isAutoJoin: boolean;
  isStarted: boolean;
  customSequence?: Array<string>;
}

export interface socketRoomUserIdInward {
  roomId: string;
  userId: string;
}

export interface socketRoomUserInward {
  room: IRoomInfo;
  user: IUserData;
}

export interface socketRoomIssueInward {
  roomId: string;
  issueName: string;
}

export interface socketRoomNewIssueInward {
  roomId: string;
  newIssue: IIssue;
}

export interface socketRoomPlayerChoiceInward {
  roomId: string;
  playerChoice: IPlayerChoice;
}

export interface socketRoomUserIdmessageInward {
  roomId: string;
  userId: string;
  message: string;
}

export interface socketRoomUserKickVote {
  roomId: string;
  user: IUserData;
  vote: number;
}

export interface IKickUserVotes {
  votes: number;
  voted: number;
}

export interface IGameStatus {
  isStarted: boolean;
  isAutoJoin: boolean;
  isVoting: boolean;
}

export interface socketRoomUserDataInward {
  roomId: string;
  userId: string;
  username: string;
  userSurname: string;
  userRole: string;
}
