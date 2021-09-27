import { Server } from 'socket.io';
import {
  socketRoomIssueInward,
  socketRoomNewIssueInward,
  socketRoomPlayerChoiceInward,
  socketRoomUserDataInward,
  socketRoomUserIdInward,
  socketRoomUserIdmessageInward,
  socketRoomUserInward,
  socketRoomUserKickVote,
} from '../models/interfaces';
import roomContoller from '../roomServices/roomController';

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.SOCKET_URL_CONNECTION,
      // origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
  });
  console.log('URL', process.env.SOCKET_URL_CONNECTION);
  console.log('PORT', process.env.PORT);

  io.on('connection', (socket) => {
    console.log(`Connected to socket: ${socket.id}`);
    console.log('Socket userId', socket.handshake.auth.userId);

    socket.on('joinRoom', (message: socketRoomUserInward) => {
      const { room, user } = message;
      const roomFound = roomContoller.getRoomId(room.roomId);
      if (roomFound) {
        socket.join(message.room.roomId);
        console.log('SOCKET JOIN');
        if (user.id) {
          roomContoller.joinUserToRoom(room.roomId, user);
          const rooms = roomContoller.getRoomsInfo();
          const users = roomContoller.getRoomUsers(room.roomId);
          socket.broadcast.emit('roomList', rooms);
          io.in(room.roomId).emit('userJoined', users);
        }
      }
    });

    socket.on('userRoomReconnect', (message: socketRoomUserIdInward) => {
      const { roomId, userId } = message;
      const room = roomContoller.getRoomId(roomId);
      if (room) {
        const user = roomContoller.getRoomUser(roomId, userId);
        const room = roomContoller.getRoomsInfo();
        socket.emit('reconnectToLobby', { user, room });
      }
    });

    socket.on('sendMessage', (data: socketRoomUserIdmessageInward) => {
      const { roomId, userId, message } = data;

      if (roomId && userId && message) {
        roomContoller.addMessagetoRoomChat(roomId, userId, message);
        const chatMessages = roomContoller.getRoomChat(roomId);
        io.in(roomId).emit('chatMessage', chatMessages);
      }
    });

    socket.on('leaveRoom', (message: socketRoomUserIdInward) => {
      console.log('LEAVE ROOM');
      
      const { roomId, userId } = message;
      const room = roomContoller.getRoomId(roomId);
      if (room) {
        let users = roomContoller.getRoomUsers(roomId);
        const userDealer = users.find((user) => user.id === userId);
        if (userDealer && userDealer.dealer) {
          roomContoller.gameOver(roomId);
          io.in(roomId).emit('gameOver', 'The end');
          const rooms = roomContoller.getRoomsInfo();
          socket.broadcast.emit('roomList', rooms);
        } else {
          roomContoller.playerLeave(roomId, userId);
          roomContoller.leaveUserFromRoom(roomId, userId);
          users = roomContoller.getRoomUsers(roomId);
          socket.to(roomId).emit('userLeft', users);
        }
        socket.leave(roomId);
      }
    });

    socket.on('startGame', (message: { roomId: string }) => {
      io.in(message.roomId).emit('gameStarted');
    });

    socket.on('gameCardChoice', (message: socketRoomPlayerChoiceInward) => {
      const { roomId, playerChoice } = message;
      roomContoller.setGameUserChoice(roomId, playerChoice);
      const checkVotes = roomContoller.getCardTurnStatus(roomId);
      if (checkVotes) {
        const voteFinish = roomContoller.checkVoting(
          roomId,
          playerChoice.issue,
        );
        if (voteFinish) {
          roomContoller.calculateIssueScore(roomId, playerChoice.issue);
          const gameIssues = roomContoller.getGameIssues(roomId);

          io.in(roomId).emit('activeIssueChanged', {
            issueName: playerChoice.issue,
            gameIssues,
          });
        }
      }
    });

    socket.on('changeActiveIssue', (message: socketRoomIssueInward) => {
      const { roomId, issueName } = message;
      const gameIssues = roomContoller.getGameIssues(roomId);
      const timer = roomContoller.getTimer(roomId);
      io.in(roomId).emit('activeIssueChanged', {
        issueName,
        gameIssues,
        timer,
      });
    });

    socket.on('calcScore', (message: socketRoomIssueInward) => {
      const { roomId, issueName } = message;
      const voting = false;
      roomContoller.setVoting(roomId, voting);
      socket.to(roomId).emit('votingIsOver', voting);
      roomContoller.calculateIssueScore(roomId, issueName);
      const gameIssues = roomContoller.getGameIssues(roomId);
      const timer = roomContoller.getTimer(roomId);
      io.in(roomId).emit('activeIssueChanged', {
        issueName,
        gameIssues,
        timer: { isTimer: timer.isTimer, time: 0 },
      });
    });

    socket.on('leaveGame', (message: { roomId: string }) => {
      const { roomId } = message;
      roomContoller.gameOver(roomId);
      io.in(roomId).emit('gameOver', 'The end');
      const rooms = roomContoller.getRoomsInfo();
      socket.broadcast.emit('roomList', rooms);
    });

    socket.on('gameOverFinish', (message: { roomId: string }) => {
      socket.leave(message.roomId);
    });

    socket.on('kickPlayerFromLobby', (message: socketRoomUserIdInward) => {
      const { roomId, userId } = message;
      socket.to(roomId).emit('userToBeKickedOff', userId);
    });

    socket.on('startVoting', (message: { roomId: string; voting: boolean }) => {
      const { roomId, voting } = message;

      roomContoller.setVoting(roomId, voting);
      const timer = roomContoller.getTimer(roomId);
      if (timer) {
        io.in(roomId).emit('timerStarted', {
          time: Date.now(),
          timer,
          voting: true,
        });
      }
    });

    socket.on('addNewGameIssue', (message: socketRoomNewIssueInward) => {
      const { roomId, newIssue } = message;
      roomContoller.addNewIssue(roomId, newIssue);
      const issues = roomContoller.getGameIssues(roomId);
      io.in(roomId).emit('newGameIssue', issues);
    });

    socket.on('getGameData', (message: socketRoomUserDataInward) => {
      const { roomId, userId, username, userSurname, userRole } = message;
      const gameStatus = roomContoller.getGameStatus(roomId);
      const room = roomContoller.getRoom(roomId);

      if (gameStatus) {
        if (gameStatus.isAutoJoin && !gameStatus.isVoting) {
          if (userRole === 'member') {
            roomContoller.addLatePlayer(roomId, userId);
          }
          socket.emit('allowToAutoJoin', { room, userId });
        } else if (gameStatus.isAutoJoin && gameStatus.isVoting) {
          socket.to(roomId).emit('allowToAutoJoinGame', {
            room,
            userId,
            username,
            userSurname,
            userRole,
          });
          socket.emit('votingIsOn', userId);
        } else if (gameStatus.isStarted) {
          socket.to(roomId).emit('latePlayerAskToJoin', {
            room,
            userId,
            username,
            userSurname,
            userRole,
          });
          socket.emit('votingIsOn', userId);
        } else {
          socket.emit('joinToLobby', { room, userId });
        }
      }
    });

    socket.on('allowLatePlayerIntoGame', (message) => {
      const { roomId, user } = message;
      if (user.userRole === 'member') {
        roomContoller.addLatePlayer(roomId, user.userId);
      }
      const room = roomContoller.getRoom(roomId);
      socket.broadcast.emit('votingIsOff', user.userId);
      socket.broadcast.emit('lateMemberMayJoin', { room, userId: user.userId });
    });

    socket.on('checkTimer', (message) => {
      const { roomId } = message;
      socket.to(roomId).emit('sendTimerTime');
    });

    socket.on('dealerTimeStarted', (message) => {
      const { roomId, timeStarted } = message;
      socket.to(roomId).emit('currentDealerTimeStarted', timeStarted);
    });

    socket.on('declineLateMember', (message) => {
      const { roomId, userId } = message;
      socket.broadcast.emit('memberIsDeclined', userId);
    });

    socket.on('amendScoreGameIssue', (message) => {
      const { roomId, amnendedIssue } = message;
      roomContoller.amendedIssueScore(roomId, amnendedIssue);
      const issues = roomContoller.getGameIssues(roomId);
      io.in(roomId).emit('newGameIssue', issues);
    });

    socket.on('userWantsKick', (message) => {
      const { roomId, user } = message;
      const users = roomContoller.getRoomUsers(roomId);
      if (users && users.length >= 4) {
        io.in(roomId).emit('kickConfirm', user);
      } else {
        socket.emit('noQuorum', user);
      }
    });

    socket.on('confirmedKick', (message: socketRoomUserKickVote) => {
      const { roomId, user, vote } = message;
      roomContoller.setKickUserVotes(roomId, vote);
      const votesStatus = roomContoller.getKickUserVotesStatus(roomId);
      if (votesStatus) {
        socket.to(roomId).emit('userToBeKickedOff', user.id);
      }
    });

    socket.on('changeSprintName', (message) => {
      const { roomId, sprintName } = message;
      socket.to(roomId).emit('sprintNameChanged', sprintName);
    });

    socket.on('changeIssuesLobby', (message) => {
      const { roomId, issues } = message;
      io.in(roomId).emit('issuesLobbyChanged', issues);
    });

    socket.on('abandonedRoom', (roomId: string) => {
      roomContoller.gameOver(roomId);
      const rooms = roomContoller.getRoomsInfo();
      socket.broadcast.emit('roomList', rooms);
    })
  });
};

export default socketServer;
