import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'components/Cards/userCard';
import AppContext from 'store/store';
import { IUser } from 'utils/interfaces';
import { ObserverList } from './observerList';
import { roles } from 'utils/configs';
import KickPlayerPopup from './popups/kickPlayerPopup';
import KickPlayerReject from './popups/kickPlayerReject';
import KickPlayerConfirm from './popups/kickPlayerConfirm';
import WaitForAuthPopup from './popups/waitForAuthPopup';

export interface LobbyUserProps {
  users: Array<IUser>;
}

export const LobbyUser: FC<LobbyUserProps> = ({ users }) => {
  const classes = useStylesLobbyPart();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ dealer, setDealer ] = useState<IUser>();
  const [ isOpenKickUser, setIsOpenKickUser ] = useState(false);
  const [ kickOffUser, setKickOffUser ] = useState<IUser>();
  const [ isOpenReject, setIsOpenReject ] = useState(false);
  const [ isOpenConfirm, setIsOpenConfirm ] = useState(false);
  const [ isGameStarted, setIsGameStarted] = useState(false);
  const [ isVoting, setIsVoting ] = useState(false);
  const [ isAutoJoin, setIsAutoJoin ] = useState(false);

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId,
    });
    router.push('/');
  };

  const onDeleteUser = (user: IUser) => {
    state.socket.emit('userWantsKick', { roomId: lobby, user });
  };

  const gameStart = () => {
    router.push(`/${lobby}/game`);
  };

  const gameFinish = (message: string) => {
    console.log('gameOver', message);
    state.socket.emit('gameOverFinish', { roomId: lobby });
    router.push('/');
  };

  const rejectUserRemove = (isOpen: boolean) => {
    setIsOpenReject(isOpen);
    setKickOffUser(null);
  };

  const userRemoveRejectPopup = () => {
    setIsOpenReject(true);
  };

  const onCloseConfirm = (isOpen: boolean) => {
    setIsOpenConfirm(isOpen);
    setKickOffUser(null);
  };

  const onConfirmClick = (user: IUser, vote: number) => {
    onCloseConfirm(false);
    state.socket.emit('confirmedKick', { roomId: lobby, user, vote });
  };

  const userKickVoting = (user: IUser) => {
    if (state.userId !== user.id) {
      setIsOpenConfirm(true);
      setKickOffUser(user);
    }
  };

  const onKickUser = (user: IUser) => {
    setIsOpenKickUser(true);
    setKickOffUser(user);
  };

  useEffect(
    () => {
      const dealer = users?.find((user) => user.dealer);
      setDealer(dealer);
    },
    [ users ],
  );

  useEffect(() => {
    state.socket.on('gameOver', (message) => {
      gameFinish(message);
    });

    state.socket.on('gameStarted', (message) => {
      gameStart();     
    });
          
    state.socket.emit('getGameData', { 
      roomId: lobby,
      user: { 
        username: state.username,
        userSurname: state.userSurname,
        avatar: state.avatar,
        id: state.userId,
        userRole: state.userRole,
      }
    });

    state.socket.on('gameData', (message) => {
    const { gameData } = message;
    console.log('game DATA', gameData);
    if(gameData && gameData.isStarted) {
      setIsGameStarted(true);
      setIsVoting(gameData.isVoting);
      setIsAutoJoin(gameData.isAutoJoin); 
    // state.socket.emit('isVotingStarted', { roomId: state.roomId });

    // state.socket.on('votingStarted', (message) => {
    //   console.log('LOBBY IS VOTING', message);
    //   setIsVoting(message.voting);
    // });

    state.socket.on('votingIsOver', (message) => {
      console.log('LOBBY VOTING IS OVER', message);
      setIsVoting(message);
    });


     
      if( !gameData.isVoting && gameData.isAutoJoin) {    
        gameStart();
      } if(!gameData.isAutoJoin) {    
        state.socket.on('lateMemberMayJoin', (message) => {     
            if( state.userId === message) {
              gameStart();
            }
        }); 
      }
    }
  
    });

    state.socket.on('memberIsDeclined', (message) => {   
      if(state.userId === message) {
        onRoomLeave();
      }
  });
  
    state.socket.on('noQuorum', (message) => {
      userRemoveRejectPopup();
    });

    state.socket.on('kickConfirm', (user: IUser) => {
      userKickVoting(user);
    });

    

    return () => {
      state.socket.off('gameOver', (message) => {
        gameFinish(message);
      });

      state.socket.off('gameStarted', (message) => {
        gameStart();
      });

      state.socket.off('gameData');

      state.socket.off('lateMemberMayJoin');
      
      state.socket.off('memberIsDeclined');

      // state.socket.off('votingStarted');

      // state.socket.off('isVotingStarted');

      state.socket.off('noQuorum', (message) => {
        userRemoveRejectPopup();
      });

      state.socket.off('kickConfirm', (user: IUser) => {
        userKickVoting(user);
      });
    };
  }, []);

  

  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      md={9}
      sm={7}
      className={classes.lobbyPartUserContainer}
      wrap="nowrap"
    >
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom>
          Lobby
        </Typography>
      </Grid>
      <Grid item className={classes.mBottom}>
        <Typography variant="subtitle2">Dealer:</Typography>
        {dealer && (
          <UserCard
            user={dealer}
            observer={dealer.userRole === roles.observer ? true : false}
            onKickUser={onKickUser}
          />
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent="flex-end"
        className={classes.mBottom}
      >
        <Button
          variant="outlined"
          className={classes.btn}
          onClick={onRoomLeave}
        >
          Exit
        </Button>
      </Grid>
      <Grid item container>
        {users && <MemberList users={users} onKickUser={onKickUser} />}
      </Grid>
      <Grid item container>
        {users && <ObserverList users={users} onKickUser={onKickUser} />}
      </Grid>
      <KickPlayerPopup
        isOpenKickUser={isOpenKickUser}
        onClosePopUp={(isOpen: boolean) => setIsOpenKickUser(isOpen)}
        user={kickOffUser}
        onDeleteUser={onDeleteUser}
      />
      <KickPlayerConfirm
        isOpenConfirm={isOpenConfirm}
        onCloseConfirm={onCloseConfirm}
        user={kickOffUser}
        onConfirmClick={onConfirmClick}
        onRejectClick={onConfirmClick}
      />
      <KickPlayerReject
        isOpenReject={isOpenReject}
        onCloseReject={rejectUserRemove}
        user={kickOffUser}
      />
      { isGameStarted &&
        (<WaitForAuthPopup
          isGameStarted={isGameStarted}
          isVoting={isVoting}
          isAutoJoin={isAutoJoin}
        /> )
      }
    </Grid>
  );
};
