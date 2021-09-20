import Game from './gameModel';
import {
  IChatMessage,
  IGameSettings,
  IGameIssue,
  IPlayerChoice,
  IUserData,
  IGameSettingsFromClient,
  IIssue,
  IGameTimer,
  IKickUserVotes,
  IRoomInfo,
  IGameStatus,
} from './interfaces';

const initKickUser = {
  votes: 0,
  voted: 0,
};

class Room {
  private users: Array<IUserData> = [];
  private roomId: string;
  private roomName: string;
  private chatMessages: Array<IChatMessage> = [];
  private game: Game;
  private kickUserVotes: IKickUserVotes = initKickUser;

  constructor(room: IRoomInfo) {
    this.roomId = room.roomId;
    this.roomName = room.roomName;
    this.game = new Game(this.roomId);
    console.log('new room created');
  }

  getRoomId = (): string | null => {
    if (this.roomId) return this.roomId;
    return null;
  };

  getRoom = (): IRoomInfo | null => {
    if (this.roomId) return {roomId: this.roomId, roomName: this.roomName};
    return null;
  };

  joinUser = (user: IUserData): void => {
    const userFoundIndex = this.findUser(user.id);
    if (userFoundIndex >= 0) {
      const leftPart = this.users.slice(0, userFoundIndex);
      leftPart.push(user);
      const rightPart = this.users.slice(userFoundIndex + 1);
      this.users = leftPart.concat(rightPart);
    } else {
      this.users.push(user);
    }
  };

  leaveUser = (userId: string): void => {
    this.users = this.users.filter((item) => item.id !== userId);
  };

  getUser = (userId: string): IUserData => {
    const userIndex = this.findUser(userId);
    if (userIndex >= 0) {
      return this.users[userIndex];
    }
    return null;
  };

  getUsers = (): Array<IUserData> => {
    return this.users;
  };

  addMessage = (userId: string, message: string): void => {
    const userFound = this.users.find((item) => item.id === userId);
    if (userFound) {
      userFound.username;
      this.chatMessages.push({
        user: userFound,
        message,
      });
    }
  };
  getChatMessages = (): Array<IChatMessage> => {
    console.log('request for CHAT');
    return this.chatMessages;
  };

  findUser = (userId: string): number => {
    const userFoundIndex = this.users.findIndex((user) => user.id === userId);
    if (userFoundIndex >= 0) return userFoundIndex;
    return -1;
  };

  getGameId = (): string => {
    return this.game.getGameId();
  };

  getIsVoting = (): boolean => {
    return this.game.getIsVoting();
  };

  setUserChoice = (userChoice: IPlayerChoice) => {
    this.game.setPlayerChoice(userChoice);
  };

  setVoting = ( voting: boolean ) => {
    this.game.setVoting(voting);
  };

  getGameIssue = (issueName: string): IGameIssue => {
    const issue = this.game.getGameIssue(issueName);
    const users = issue.players.map((task) => {
      const userFound = this.users.find((us) => us.id === task.player);
      if (userFound) {
        const newUser = {
          player: userFound,
          choice: task.choice,
        };
        return newUser;
      }
      return null;
    });
    issue.players = users;

    return issue;
  };

  gameInit = (client: IGameSettingsFromClient): void => {
    const players = this.users.map((user) => {
      if (user.userRole === 'member') {
        return user.id;
      }
    });
    this.game.gameInit({ playerIds: players, client });
  };

  getGameInitData = (): IGameSettings => {
    return this.game.getGameInitData();
  };

  calculateIssueScore = (issueName: string): void => {
    this.game.calculateIssueScore(issueName);
  };

  getGameIssues = (): Array<IGameIssue> => {
    return this.game.getGameIssues();
  };

  getCardTurnStatus = (): boolean => {
    return this.game.getCardTurnStatus();
  };

  checkVoting = (issueName: string): Array<IGameIssue> | null => {
    return this.game.checkVoting(issueName);
  };

  addNewIssue = (issue: IIssue): void => {
    const playerIds = this.users.map((user) => {
      if (user.userRole === 'member') {
        return user.id;
      }
    });
    this.game.addNewIssue(issue, playerIds);
  };

  
  getTimer = (): IGameTimer => {
    const timer = this.game.getTimer();
    if (timer) return timer;
  };

  amendedIssueScore = (amendedIssue: IGameIssue): void => {
    this.game.amendedIssueScore(amendedIssue);
  };

  setKickUserVotes = (vote: number): void => {
    this.kickUserVotes.votes += vote;
    this.kickUserVotes.voted += 1;
  };

  getKickUserVotesStatus = (): boolean => {
    if (this.kickUserVotes.voted === this.users.length - 2) {
      if (this.kickUserVotes.votes >= (this.users.length - 2) / 2 + 1) {
        this.cleanKickedUserVotes();
        return true;
      }
      this.cleanKickedUserVotes();
      return false;
    }
    return false;
  };

  cleanKickedUserVotes = (): void => {
    this.kickUserVotes.voted = 0;
    this.kickUserVotes.votes = 0;
  };

  getGameStatus = (): IGameStatus => {
    return this.game.getGameStatus();
  }

  addLatePlayer = (player: string): void => {
    this.game.addLatePlayer(player);
  }
}

export default Room;
