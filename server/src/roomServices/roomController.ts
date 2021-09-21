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
} from '../models/interfaces';
import Room from '../models/roomModel';

class Rooms {
  private rooms: Array<Room> = [];
  constructor() {}

  createRoom = (roomId: IRoomInfo): void => {
    const room = new Room(roomId);
    this.rooms.push(room);
    console.log('new room in rooms, length: ', this.rooms.length);
  };

  getRooms = (): Array<Room> => {
    return this.rooms;
  };

  getRoom = (roomId: string): IRoomInfo => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      return room.getRoom();
    }
  };

  getRoomIds = (): Array<string> => {
    const roomIds = this.rooms.map((room) => room.getRoomId());
    console.log('get rooms Ids', roomIds);
    return roomIds;
  };

  getRoomId = (roomId: string): string | null => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    console.log('get room by Id');
    if (room) return roomId;
    return null;
  };

  getRoomsInfo = (): Array<IRoomInfo> => {
    const rooms = this.rooms.map((room) => room.getRoom());
    return rooms;
  };

  getRoomUsers = (roomId: string): Array<IUserData> => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    const users = room.getUsers();
    return users;
  };

  joinUserToRoom = (roomId: string, user: IUserData): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      room.joinUser(user);
    }
  };

  leaveUserFromRoom = (roomId: string, userId: string): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      room.leaveUser(userId);
    }
  };

  getRoomChat = (roomId: string): Array<IChatMessage> => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      const chat = room.getChatMessages();
      if (chat) return chat;
    }
    return null;
  };

  addMessagetoRoomChat = (
    roomId: string,
    userId: string,
    message: string,
  ): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    room.addMessage(userId, message);
  };

  getGameId = (roomId: string): string => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    const id = room.getGameId();
    return id;
  };

  setGameUserChoice = (roomId: string, userChoice: IPlayerChoice): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      room.setUserChoice(userChoice);
    }
  };

  calculateIssueScore = (roomId: string, issueName: string) => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      room.calculateIssueScore(issueName);
    }
  };

  getGameIssue = (roomId: string, taskName: string): IGameIssue => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    const gameTask = room.getGameIssue(taskName);
    return gameTask;
  };

  getGameIssues = (roomId: string): Array<IGameIssue> => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    const gameIssues = room.getGameIssues();
    return gameIssues;
  };

  gameInit = (roomId: string, client: IGameSettingsFromClient): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      room.gameInit(client);
    }
  };

  getGameInitData = (roomId: string): IGameSettings | null => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      return room.getGameInitData();
    }
    return null;
  };

  userDisconnect = (userId: string): void => {
    this.rooms.forEach((room) => {
      const userIndex = room.findUser(userId);
      if (userIndex >= 0) {
        room.leaveUser(userId);
      } else return null;
    });
  };

  getRoomUser = (roomId: string, userId: string): IUserData | null => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      const user = room.getUser(userId);
      return user;
    }
    return null;
  };

  getCardTurnStatus = (roomId: string): boolean => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      return room.getCardTurnStatus();
    }
  };

  checkVoting = (
    roomId: string,
    issueName: string,
  ): Array<IGameIssue> | null => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      return room.checkVoting(issueName);
    }
  };

  gameOver = (roomId: string): void => {
    this.rooms = this.rooms.filter((room) => room.getRoomId() !== roomId);
  };

  addNewIssue = (roomId: string, issue: IIssue): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      return room.addNewIssue(issue);
    }
  };

  setVoting = (roomId: string, voting: boolean): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      return room.setVoting(voting);
    }
  };

  getIsVoting = (roomId: string): boolean => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      const isVoting = room.getIsVoting();
      return isVoting;
    }
  };

  getTimer = (roomId: string): IGameTimer => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      return room.getTimer();
    }
  };

  amendedIssueScore = (roomId: string, amendedIssue: IGameIssue): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      room.amendedIssueScore(amendedIssue);
    }
  };

  setKickUserVotes = (roomId: string, vote: number): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      room.setKickUserVotes(vote);
    }
  };

  getKickUserVotesStatus = (roomId: string): boolean => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      return room.getKickUserVotesStatus();
    }
  };

  getGameStatus = (roomId: string): IGameStatus => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      return room.getGameStatus();
    }
  };

  addLatePlayer = (roomId: string, player: string): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      room.addLatePlayer(player);
    }
  };

  playerLeave = (roomId: string, player: string): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    if (room) {
      room.playerLeave(player);
    }
  }
}

const roomContoller = new Rooms();
export default roomContoller;
