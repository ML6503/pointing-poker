import React, { useContext, useEffect, FC, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { Button, Grid, Typography } from '@material-ui/core';
import { useStyleHomePage } from '@styles/initPage.style';
import { RoomSelect } from './roomSelect';
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
import { roles, roomInitData, userInitData } from 'utils/configs';
import {
  IDialogUsers,
  IRoomCreateData,
  IRoomData,
  IRoomInfo,
} from 'utils/interfaces';
import { UserDialog } from './Dialog/userDialog';
import pokerImage from '../../public/poker-cards_green.png';
import appStorage from 'utils/storage';
import { apiCreateRoom, apiGetRooms } from 'services/apiServices';

interface MakeChoiceProps {
  rooms: Array<IRoomInfo>;
}

export const InitPage: FC<MakeChoiceProps> = ({ rooms }) => {
  const classes = useStyleHomePage();
  const router = useRouter();
  const [roomList, setRoomList] = useState<Array<IRoomInfo>>(rooms);
  const [openCreate, setOpenCreate] = useState(false);
  const [openConnect, setOpenConnect] = useState(false);
  const [userData, setUserData] = useState({
    ...userInitData,
    username: {
      ...userInitData.username,
    },
    userSurname: {
      ...userInitData.userSurname,
    },
  });
  const [role, setRole] = useState(roles.member);
  const [roomInfo, setRoomInfo] = useState<IRoomCreateData>(roomInitData);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const onRoomList = (rooms: Array<IRoomInfo>) => {
    setRoomList(rooms);
  };

  const goToLobby = (id: string) => {
    const userId = appStorage.getSession();
    dispatch(setUserId(userId));
    dispatch(setUsername(userData.username.nameData));
    dispatch(setUserSurname(userData.userSurname.nameData));
    dispatch(setUserAvatar(userData.avatar));
    router.push({
      pathname: '/[lobby]',
      query: { lobby: id },
    });
  };

  const onCreateRoom = async () => {
    if (
      userData.username.statusData &&
      userData.userSurname.statusData &&
      roomInfo.statusData
    ) {
      const id = nanoid();
      setRoomInfo((prev) => ({ ...prev, room: { ...prev.room, roomId: id } }));
      dispatch(setRoom(id, roomInfo.room.roomName));

      const config = {
        data: {
          roomId: id,
          roomName: roomInfo.room.roomName,
        },
      };
      setOpenCreate(false);
      const created = await apiCreateRoom(config);
      console.log('Room', created);
      goToLobby(id);
    }
  };

  const onEnterRoom = () => {
    if (
      userData.username.statusData &&
      userData.userSurname.statusData &&
      roomInfo.statusData
    ) {
      dispatch(setRoom(roomInfo.room.roomId, roomInfo.room.roomName));
      setOpenConnect(false);
      goToLobby(roomInfo.room.roomId);
    }
  };

  const clearUserData = () => {
    setUserData({
      ...userInitData,
      username: {
        ...userInitData.username,
      },
      userSurname: {
        ...userInitData.userSurname,
      },
    });
    setRole(roles.member);
    setRoomInfo(roomInitData);
  };

  const onCreateCancel = () => {
    if (!loading) {
      setOpenCreate(false);
      dispatch(setDealer(false));
      clearUserData();
    }
  };
  const onConnectCancel = () => {
    if (!loading) {
      setOpenConnect(false);
      clearUserData();
      dispatch(setUserRole(roles.member));
    }
  };

  const changeUserData = (userData: IDialogUsers) => {
    setUserData(userData);
  };

  const changeRoomData = (roomData: IRoomCreateData) => {
    setRoomInfo(roomData);
  };

  const addAvatar = (data: string) => {
    setUserData((prev) => ({ ...prev, avatar: data }));
  };

  const onRoomRequest = async () => {
    try {
      const res = await apiGetRooms();
      const data = await res.data;
      if (res.status === 200) {
        if (typeof data === 'string') {
          setRoomList([]);
        } else {
          setRoomList(data);
        }
      }
    } catch {
      setRoomList([]);
    }
  };

  useEffect(() => {
    if (role === roles.observer) {
      dispatch(setUserRole(role));
    } else {
      dispatch(setUserRole(role));
    }
  }, [role]);

  useEffect(() => {
    window.onbeforeunload = () => {
      console.log('HHHHHHH');
    };
    dispatch(setRoom('', ''));
    dispatch(setUserId(''));
    dispatch(setDealer(false));
    dispatch(setUserRole(roles.member));
    if (!appStorage.getSession()) {
      appStorage.setSession(nanoid());
    }
    if (!state.socket.auth.userId) {
      const session = appStorage.getSession();
      state.socket.auth.userId = session;
    }

    onRoomRequest();

    state.socket.on('roomList', (message) => {
      onRoomList(message);
    });

    return () => {
      state.socket.off('roomList', (message) => {
        onRoomList(message);
      });
      setRoomList([]);
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          className={classes.titleWrapper}
        >
          <Grid item>
            <Image src={pokerImage} data-testid="poker-image" />
          </Grid>
          <Grid item>
            <Typography variant='h3' align='center'>
              Poker Planning
            </Typography>
          </Grid>
        </Grid>

        <Typography variant='h4' align='center' className={classes.title}>
          Start your planning:
        </Typography>
        <Grid container justifyContent='center'>
          <Grid
            container
            item
            alignItems='center'
            justifyContent='center'
            spacing={2}
            className={classes.choiceWrapper}
          >
            <Grid item className={classes.choiceContainer} />
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  setOpenCreate(true);
                  dispatch(setDealer(true));
                }}
                className={classes.btn}
                data-testid="start-new-game-btn"
              >
                Start New game
              </Button>
              <UserDialog
                onDialogClose={onCreateCancel}
                open={openCreate}
                confirm={onCreateRoom}
                onRoleChange={() =>
                  setRole((prev) =>
                    prev === roles.observer ? roles.member : roles.observer,
                  )
                }
                role={role}
                loading={(status) => setLoading(status)}
                changeUserData={changeUserData}
                changeRoomData={changeRoomData}
                addAvatar={addAvatar}
                userInfo={userData}
                roomInfo={roomInfo}
                newGame={true}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            alignItems='center'
            justifyContent='center'
            spacing={2}
            className={classes.choiceWrapper}
          >
            <Grid item className={classes.choiceContainer}>
              <RoomSelect
                rooms={roomList.map((item) => item)}
                onRoomSelect={changeRoomData}
              />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  setOpenConnect(true);
                }}
                className={classes.btn}
                data-testid="room-connect-btn"
              >
                Connect to Room
              </Button>
              <UserDialog
                onDialogClose={onConnectCancel}
                open={openConnect}
                confirm={onEnterRoom}
                onRoleChange={() =>
                  setRole((prev) =>
                    prev === roles.observer ? roles.member : roles.observer,
                  )
                }
                role={role}
                loading={(status) => setLoading(status)}
                changeUserData={changeUserData}
                addAvatar={addAvatar}
                userInfo={userData}
                newGame={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
