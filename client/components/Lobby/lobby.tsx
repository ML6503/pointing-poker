import { Grid } from '@material-ui/core';
import useStylesLobby from '@styles/lobby.style';
import { Chat } from 'components/Chat/chat';
import { ErrorPopup } from 'components/Error/errorPopup';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import { apiGetLobbyChats, apiGetLobbyUsers } from 'services/apiServices';
import {
  setDealer,
  setRoom,
  setUserAvatar,
  setUserId,
  setUsername,
  setUserRole,
  setUserSurname,
} from 'store/actionCreators';
import AppContext from 'store/store';
import {
  IApiGetLobbyInfo,
  IChatMessage,
  IGameIssue,
  IRoomInfo,
  IUser,
} from 'utils/interfaces';
import appStorage from 'utils/storage';
import { userCreate } from 'utils/userCreate';
import { LobbyDealer } from './lobbyDealer';
import { LobbyUser } from './lobbyUsers';

interface LobbyProps {
  lobbyInfo: IApiGetLobbyInfo;
}

const Lobby: FC<LobbyProps> = ({ lobbyInfo }) => {
  const classes = useStylesLobby();
  const [chatMessages, setChatMessages] = useState<Array<IChatMessage>>();
  const [users, setUsers] = useState<Array<IUser>>([]);
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [sprintName, setSprintName] = useState('');
  const [issues, setIssues] = useState<Array<string>>();
  const [errorPage, setErrorPage] = useState(false);
  const [isAutoJoin, setIsAutoJoin] = useState(false);

  const onUserJoinLeave = (users: Array<IUser>) => {
    setUsers(users);
  };

  const onLobbyEntrance = (data: { room: IRoomInfo; userId: string }) => {
    const userFound = state.userId === data.userId;
    if (userFound) {
      const message = userCreate(
        data.room.roomId,
        data.room.roomName,
        state.username,
        state.userSurname,
        state.avatar,
        state.userId,
        state.userRole,
        state.dealer,
      );
      state.socket.emit('joinRoom', message);
    }
  };

  const onLobbyReconnect = (message: { user: IUser; room: IRoomInfo }) => {
    dispatch(setRoom(message.room.roomId, message.room.roomName));
    dispatch(setUserId(message.user.id));
    dispatch(setUsername(message.user.username));
    dispatch(setUserSurname(message.user.userSurname));
    dispatch(setUserAvatar(message.user.avatar));
    dispatch(setUserRole(message.user.userRole));
    dispatch(setDealer(message.user.dealer));
  };

  const kickOffUser = (userId: string) => {
    const userFound = state.userId === userId;
    if (userFound) {
      state.socket.emit('leaveRoom', {
        roomId: lobby,
        userId,
      });
      router.push('/');
    }
  };

  const onSprintNameChange = (sprint: string) => {
    setSprintName(sprint);
  };

  const onIssuesChange = (issues: Array<IGameIssue>) => {
    const newIssues = issues.map((issue) => issue.issueName);
    setIssues(newIssues);
  };

  const onLobbyInfoRequest = async (room: string | Array<string>) => {
    try {
      const users = await apiGetLobbyUsers(room);
      const userData = (await users.data) as Array<IUser> | string;

      const chat = await apiGetLobbyChats(room);
      const chatData = await chat.data;

      if (users.status === 200 && chat.status === 200) {
        if (typeof userData === 'string') {
          setUsers([]);
          setChatMessages([]);
          if (!state.dealer) {
            setErrorPage(true);
          }
        } else {
          const selfDealer = userData.find(
            (user) => user.id === state.userId && user.dealer === true,
          );
          const hasDealer = !!userData.find((user) => user.dealer === true);
          if (selfDealer) {
            setUsers([]);
            setChatMessages([]);
            setErrorPage(true);
            state.socket.emit('abandonedRoom', lobby);
          } else if (!selfDealer && !hasDealer) {
            setUsers([]);
            setChatMessages([]);
            setErrorPage(true);
            state.socket.emit('abandonedRoom', lobby);
          } else {
            setUsers(userData);
            setChatMessages(chatData);
            setErrorPage(false);
          }
        }

        if (!state.username) {
          state.socket.emit('userRoomReconnect', {
            roomId: lobby,
            userId: appStorage.getSession(),
          });
        } else {
          state.socket.emit('getGameData', {
            roomId: lobby,
            userId: state.userId,
            username: state.username,
            userSurname: state.userSurname,
            userRole: state.userRole,
          });
        }
      }
    } catch {
      setUsers([]);
      setChatMessages([]);
      setErrorPage(true);
    }
  };

  useEffect(() => {
    if (isAutoJoin) {
      const userFound = users.find((user) => user.id === state.userId);
      if (userFound) {
        router.push(`/${lobby}/game`);
      }
    }
  }, [isAutoJoin, users]);

  useEffect(() => {
    router.beforePopState(({ url, as }) => {
      console.log('beforePopState');
      state.socket.emit('leaveRoom', {
        roomId: lobby,
        userId: state.userId,
      });
      if (as !== '/') {
        window.location.href = as;
        return false;
      }
      return true;
    });

    setChatMessages(lobbyInfo.chat);
    setUsers(lobbyInfo.users);

    onLobbyInfoRequest(lobby);

    state.socket.on(
      'reconnectToLobby',
      (message: { user: IUser; room: IRoomInfo }) => {
        if (!state.username) {
          router.push('/404');
        } else {
          onLobbyReconnect(message);
        }
      },
    );

    state.socket.on('joinToLobby', (message) => {
      onLobbyEntrance(message);
    });

    state.socket.on('allowToAutoJoin', (message) => {
      onLobbyEntrance(message);
      setIsAutoJoin(true);
    });

    state.socket.on('lateMemberMayJoin', (message) => {
      onLobbyEntrance(message);
      setIsAutoJoin(true);
    });

    state.socket.on('userJoined', (message) => {
      onUserJoinLeave(message);
    });

    state.socket.on('userLeft', (message) => {
      onUserJoinLeave(message);
    });

    state.socket.on('userToBeKickedOff', (message) => {
      kickOffUser(message);
    });

    state.socket.on('disconnected', () => {
      console.log('Disconnected!!!');
      router.push('/');
    });

    state.socket.on('sprintNameChanged', (message) => {
      onSprintNameChange(message);
    });

    state.socket.on('issuesLobbyChanged', (message) => {
      onIssuesChange(message);
    });

    state.socket.on('gameStarted', () => {
      router.push(`/${lobby}/game`);
    });

    return () => {
      state.socket.off('joinToLobby', (message) => {
        onLobbyEntrance(message);
      });

      state.socket.off('userJoined', (message) => {
        onUserJoinLeave(message);
      });

      state.socket.off('userLeft', (message) => {
        onUserJoinLeave(message);
      });

      state.socket.off('userToBeKickedOff', (message) => {
        kickOffUser(message);
      });

      state.socket.off('disconnected', () => {
        console.log('Disconnected!!!');
        router.push('/');
      });

      state.socket.off('sprintNameChanged', (message) => {
        onSprintNameChange(message);
      });

      state.socket.off('issuesLobbyChanged', (message) => {
        onIssuesChange(message);
      });

      state.socket.off('gameStarted', () => {});

      setUsers([]);
      setChatMessages([]);
      setSprintName('');
      setIssues([]);
    };
  }, []);

  return (
    <div
      className={state.dealer ? classes.containerDealer : classes.containerUser}
    >
      <Grid container style={{ height: '100%' }}>
        {state.dealer && users && <LobbyDealer users={users} issues={issues} />}
        {!state.dealer && users && (
          <LobbyUser users={users} sprintName={sprintName} issues={issues} />
        )}
        <Grid item xs={12} md={3} sm={5} className={classes.chatPartContainer}>
          {chatMessages && <Chat chatMessages={chatMessages} />}
          {!chatMessages && <Chat chatMessages={chatMessages} />}
        </Grid>
      </Grid>
      {errorPage && (
        <ErrorPopup
          isOpen={true}
          message={'No Room found'}
          onClosePopup={router.push('/404')}
        />
      )}
    </div>
  );
};

export default Lobby;
