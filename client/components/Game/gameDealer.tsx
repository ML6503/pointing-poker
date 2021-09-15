import { useRouter } from 'next/router';
import { FC, useEffect, useState, useContext } from 'react';
import { Typography, Grid, Box, Button, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import {
  IGameIssue,
  IGamePageIssue,
  IUser,
  IGameTimer,
} from 'utils/interfaces';

import AppContext from 'store/store';
import { UserCard } from 'components/Cards/userCard';
import { roles } from 'utils/configs';
import useStylesGamePart from '@styles/gamePart.style';
import { IssuesBlock } from './issuesBlock';
import { Timer } from './Timer/timer';
import { NewIssueGamePopup } from './newIssueGame';
import { IssueCard } from './issueCard';
import { Socket } from 'socket.io-client';

interface GameDealerProps {
  dealer: IUser;
  gameIssues: Array<IGamePageIssue>;
  onIssueClick: (issueName: string) => void;
  activeIssueName: string;
  calculateIssueScore: () => void;
  springTitle: string;
  onStartVoting: () => void;
  voting: boolean;
  result: boolean;
  timer: IGameTimer;
  timeStarted: number;
  onTimerStop: () => void;
}

export const GameDealer: FC<GameDealerProps> = ({
  dealer,
  gameIssues,
  onIssueClick,
  activeIssueName,
  calculateIssueScore,
  springTitle,
  timer,
  onStartVoting,
  voting,
  result,
  timeStarted,
  onTimerStop,
}) => {
  const classes = useStylesGamePart();
  const router = useRouter();
  const { lobby } = router.query;
  const { state } = useContext(AppContext);
  const [ title, setTitle ] = useState<string>();
  const [ isOpen, setIsOpen ] = useState(false);
  const [ requestToJoin, setRequestToJoin ] = useState(false);
  const [ lateMember, setLateMember ] = useState<IUser>(null);

  const onRoomLeave = ()  => {
    state.socket.emit('leaveGame', {
      roomId: lobby,
      userId: state.userId,
    });
  
  };

  const gameFinish = (message: string) => {
    console.log('gameOver', message);
    state.socket.emit('gameOverFinish', { roomId: lobby });
    router.push('/');
  };

  const onAddOpenIssue = () => {
    setIsOpen(true);
  };

  const onAddCloseIssue = () => {
    setIsOpen(false);
  };

  const onIssueCreate = (newIssue: IGameIssue) => {
    state.socket.emit('addNewGameIssue', { roomId: lobby, newIssue });
    onAddCloseIssue();
  };


  useEffect(
    () => {
      const newTitle = gameIssues
        .map((item) => item.issue.issueName)
        .join(', ');
      setTitle(newTitle);
    },
    [ gameIssues ],
  );

  useEffect(() => {
    state.socket.on('gameOver', (message) => {
      gameFinish(message);
    });

    state.socket.on('lateMemberAskToJoin', (message) => {         
      setLateMember(message);
      setRequestToJoin(true);
    });

  
    return () => {
      state.socket.off('gameOver', (message) => {
        gameFinish(message);
      });

      state.socket.off('lateMemberAskToJoin', (message) => {
        
      });

    };
  }, []);

  const handleCloseDialog = () => {
    setRequestToJoin(false);
    setLateMember(null);
  };

  const onAllow = () => {    
    state.socket.emit('allowLateMemberIntoGame', {
      roomId: lobby,
      userId: lateMember.id,     
    });
    handleCloseDialog();
  };

  const onRoomLeaveLateMember = ()  => {   
    state.socket.emit('declineLateMember', {
      roomId: lobby,
      userId: lateMember.id,
    });    
    handleCloseDialog();    
  };

  return (
    <div>
      <Typography variant="h6" align="center" gutterBottom>
        Spring: {springTitle && `${springTitle}`} planning (issues:{' '}
        {title && `${title}`})
      </Typography>

      <Typography variant="subtitle2">Dealer:</Typography>
      <Grid container direction="column">
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid item className={classes.mBottom}>
            {dealer && (
              <UserCard
                user={dealer}
                observer={dealer.userRole === roles.observer ? true : false}
                onKickUser={() => {}}
              />
            )}
          </Grid>
          <Grid item className={classes.mBottom}>
            <Box boxShadow={2} mr={10}>
              <Button
                variant="outlined"
                className={classes.btn}
                onClick={onRoomLeave}
              >
                Stop Game
              </Button>
            </Box>
          </Grid>
          <Grid container item justifyContent="space-between">
            <Grid
              container
              item
              direction="column"
              className={classes.btnContainer}
            >
              <Grid item className={classes.mBottom}>
                <Box boxShadow={2} mr={10}>
                  <Button
                    variant="outlined"
                    className={classes.btn}
                    onClick={onStartVoting}
                    disabled={voting}
                  >
                    Start Voting
                  </Button>
                </Box>
              </Grid>
              <Grid item className={classes.mBottom}>
                <Box boxShadow={2} mr={10}>
                  <Button
                    variant="outlined"
                    className={classes.btn}
                    onClick={calculateIssueScore}
                    disabled={!result}
                  >
                    Voting results
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              {timer &&
              timer.isTimer && (
                <Timer
                  timer={timer}
                  timeStarted={timeStarted}
                  onTimerStop={onTimerStop}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        {gameIssues && (
          <IssuesBlock
            issues={gameIssues}
            activeIssueName={activeIssueName}
            onIssueClick={onIssueClick}
            onAddIssue={onAddOpenIssue}
          />
        )}
        <NewIssueGamePopup onIssueCreate={onIssueCreate} onAddCloseIssue={onAddCloseIssue} isOpen={isOpen} issues={gameIssues.map((el) => ({issueName: el.issue.issueName, priority: el.issue.priority}))}/>
      </Grid>

      { requestToJoin && lateMember &&  (
        <Dialog open={requestToJoin} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
          <DialogTitle id="alert-dialog-title">{`Member ${lateMember.username} ${lateMember.userSurname} is asking your authorization to join.` }</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" align="center">
              Do you agree to let this late member in?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Grid container justifyContent="space-around">
            <Box boxShadow={4} mb={1}>
              <Button className={classes.btn} onClick={onAllow} > YES </Button>
            </Box>
            <Box boxShadow={4} mb={1}>
              <Button className={classes.btn} onClick={onRoomLeaveLateMember} > NO </Button>
            </Box>            
          </Grid>
          </DialogActions>
        </Dialog>
      )
      }
    </div>
  );
};
