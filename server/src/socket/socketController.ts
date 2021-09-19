import { Server } from 'socket.io';
import {
  socketRoomIssueInward,
  socketRoomNewIssueInward,
  socketRoomPlayerChoiceInward,
  socketRoomUserIdInward,
  socketRoomUserIdmessageInward,
  socketRoomUserInward,
  socketRoomUserKickVote,
} from '../models/interfaces';
import roomContoller from '../roomServices/roomController';

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Connected to socket: ${socket.id}`);
    console.log('Socket userId', socket.handshake.auth.userId);
    // console.log('ALL rooms', io.sockets.adapter.rooms);

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
      const { roomId, userId } = message;
      const room = roomContoller.getRoomId(roomId);
      if (room) {
        let users = roomContoller.getRoomUsers(roomId);
        const userDealer = users.find((user) => user.id === userId);
        if (userDealer && userDealer.dealer) {
          roomContoller.gameOver(roomId);
          io.in(roomId).emit('gameOver', 'The end');
        } else {
          roomContoller.leaveUserFromRoom(roomId, userId);
          users = roomContoller.getRoomUsers(roomId);
          socket.to(roomId).emit('userLeft', users);
        }
        socket.leave(roomId);
      }
    });

    socket.on('startGame', (message: { roomId: string }) => {
      socket.to(message.roomId).emit('gameStarted');
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
        io
          .in(roomId)
          .emit('timerStarted', { time: Date.now(), timer, voting: true });
      }
    });

    // socket.on('isVotingStarted', (message: { roomId: string }) => {
    //   const voting = roomContoller.getIsVoting(message.roomId);
    //   socket.to(message.roomId).emit('votingStarted',  voting );
    // });

    socket.on('addNewGameIssue', (message: socketRoomNewIssueInward) => {
      const { roomId, newIssue } = message;
      roomContoller.addNewIssue(roomId, newIssue);
      const issues = roomContoller.getGameIssues(roomId);
      io.in(roomId).emit('newGameIssue', issues);
    });

    socket.on('getGameData', (message) => {
      console.log('getGameData', message);
      const { roomId, user } = message;
      const newPlayer = {
        player: user.id,
        choice: 0,
      };
      const gameInitData = roomContoller.getGameInitData(roomId);
      const issues = roomContoller.getGameIssues(roomId);
      Object.values(issues).map(
        (issue) => (issue.players = [...issue.players, newPlayer]),
      );

      // console.log('issues from socket updated game data', issues);
      const gameData = { ...gameInitData, issues: issues };
      console.log('game data updated from socket', gameData);
      if (gameData && gameData.isStarted && !gameData.isAutoJoin) {
        console.log('late mem - game in process and ask to join', user);
        socket.to(roomId).emit('lateMemberAskToJoin', user);
      }
      io
        .in(message.roomId)
        .emit('gameData', { gameData: gameData, lateMember: user });
    });

    socket.on('allowLateMemberIntoGame', (message) => {
      const { roomId, userId } = message;
      socket.to(roomId).emit('lateMemberMayJoin', userId);
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
      console.log('from SOCKET - declined', message);
      const { roomId, userId } = message;
      const room = roomContoller.getRoomId(roomId);
      if (room) {
        socket.to(roomId).emit('memberIsDeclined', userId);
      }
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

    socket.on('changeIssuesLobby', message => {
      const { roomId, issues } = message;
      io.in(roomId).emit('issuesLobbyChanged', issues);
    })
  })
};

export default socketServer;
