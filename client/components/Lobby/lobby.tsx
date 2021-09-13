import { Grid } from '@material-ui/core';
import useStylesLobby from '@styles/lobby.style';
import { Chat } from 'components/Chat/chat';
import { ErrorPopup } from 'components/Error/errorPopup';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import {
  setDealer,
  setRoomId,
  setUserAvatar,
  setUserId,
  setUsername,
  setUserRole,
  setUserSurname,
} from 'store/actionCreators';
import AppContext from 'store/store';
import { IApiGetLobbyInfo, IChatMessage, IUser } from 'utils/interfaces';
import appStorage from 'utils/storage';
import { userCreate } from 'utils/userCreate';
import { LobbyDealer } from './lobbyDealer';
import { LobbyUser } from './lobbyUsers';

interface LobbyProps {
  lobbyInfo: IApiGetLobbyInfo;
}

const Lobby: FC<LobbyProps> = ({ lobbyInfo }) => {
  const classes = useStylesLobby();
  const [ chatMessages, setChatMessages ] = useState<Array<IChatMessage>>();
  const [ users, setUsers ] = useState<Array<IUser>>();
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;

  const onUserJoinLeave = (users: Array<IUser>) => {
    setUsers(users);
  };

  const onLobbyEntrance = () => {
    const message = userCreate(
      lobby,
      state.username,
      state.userSurname,
      state.avatar,
      state.userId,
      state.userRole,
      state.dealer,
    );
    state.socket.emit('joinRoom', message);
  };

  const onLobbyReconnect = (user: IUser) => {
    dispatch(setRoomId(lobby));
    dispatch(setUserId(user.id));
    dispatch(setUsername(user.username));
    dispatch(setUserSurname(user.userSurname));
    dispatch(setUserAvatar(user.avatar));
    dispatch(setUserRole(user.userRole));
    dispatch(setDealer(user.dealer));
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

  useEffect(() => {
    router.beforePopState(({url, as}) => {
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
    // if (process.browser) {
    //   window.onbeforeunload =() => {
    //     router.push('/');
    //     console.log('Lobby reload');
    //     state.socket.emit('leaveRoom', {
    //       roomId: lobby,
    //       userId: state.userid,
    //     });

    //   }
    // }

    if (lobbyInfo.error === 'no room') {
      <ErrorPopup
        isOpen={true}
        message={'No Room found'}
        onClosePopup={router.push('/404')}
      />;
      // router.push('/404');
    } else {
      if (lobbyInfo.error === 'no users') {
        if (!state.dealer) {
          console.log('no users');
          <ErrorPopup
            isOpen={true}
            message={'No Room found'}
            onClosePopup={kickOffUser(state.userId)}
          />;
          // kickOffUser(state.userId);
        }
      }

      if (lobbyInfo.chat.length) {
        setChatMessages(lobbyInfo.chat);
      }
      if (lobbyInfo.users) {
        setUsers(lobbyInfo.users);
      }

      if (!state.username) {
        state.socket.emit('userRoomReconnect', {
          roomId: lobby,
          userId: appStorage.getSession(),
        });
        state.socket.on('reconnectToLobby', (message: IUser) => {
          if (!state.username) {
            router.push('/404');
          } else {
            onLobbyReconnect(message);
            onLobbyEntrance();
          }
        });
      } else {
        onLobbyEntrance();
      }

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

      // state.socket.on('gameOver', (message) => {
      //   gameFinish(message);
      // });

      return () => {
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

        // state.socket.off('gameOver', (message) => {
        //   gameFinish(message);
        // });

      };
    }
  }, []);

  return (
    <div
      className={state.dealer ? classes.containerDealer : classes.containerUser}
    >
      <Grid container style={{ height: '100%' }}>
        {state.dealer && users && <LobbyDealer users={users} />}
        {!state.dealer && users && <LobbyUser users={users} />}
        <Grid item xs={12} md={3} sm={5} className={classes.chatPartContainer}>
          {chatMessages && <Chat chatMessages={chatMessages} />}
          {!chatMessages && <Chat chatMessages={chatMessages} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Lobby;
