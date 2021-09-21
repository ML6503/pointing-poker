import { useRouter } from 'next/router';
import React, { FC, useEffect, useState, useContext } from 'react';
import { Typography, Grid, Box, Button } from '@material-ui/core';
import {
  IGameIssue,
  IGamePageIssue,
  IUser,
  IGameTimer,
  ILatePlayer,
  ILatePlayerToJoin,
} from 'utils/interfaces';
import { LateMemberAccess } from './Popups/lateMemberAccess';

import AppContext from 'store/store';
import { UserCard } from 'components/Cards/userCard';
import { roles } from 'utils/configs';
import useStylesGamePart from '@styles/gamePart.style';
import { IssuesBlock } from './issuesBlock';
import { Timer } from './Timer/timer';
import { NewIssueGamePopup } from './Popups/newIssueGame';
import { ChangeScoreGamePopup } from './Popups/changeScoreGame';
import { DealerLeavePage } from './Popups/dealerLeavePage';
import GameResultPopup from './Popups/gameResultsPopup';
import clsx from 'clsx';

interface GameDealerProps {
  dealer: IUser;
  gameIssues: Array<IGamePageIssue>;
  onIssueClick: (issueName: string) => void;
  activeIssueName: string;
  calculateIssueScore: () => void;
  sprintTitle: string;
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
  sprintTitle,
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
  const [title, setTitle] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [requestToJoin, setRequestToJoin] = useState(false);
  const [lateMembers, setLateMembers] = useState<Array<ILatePlayer>>([]);
  const [lateMember, setLateMember] = useState<ILatePlayer>(null);
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [autoJoin, setAutoJoin] = useState(false);
  const [joined, setJoined] = useState(true);

  const btnHidden = clsx(
    timer && timer.isTimer ? classes.btnHidden : classes.mBottom,
  );

  const onRoomLeave = () => {
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

  const onChangeOpenIssue = () => {
    setIsScoreOpen(true);
  };

  const onChangeCloseIssue = () => {
    setIsScoreOpen(false);
  };

  const onIssueCreate = (newIssue: IGameIssue) => {
    state.socket.emit('addNewGameIssue', { roomId: lobby, newIssue });
    onAddCloseIssue();
  };

  const onScoreChange = (amnendedIssue: IGamePageIssue) => {
    state.socket.emit('amendScoreGameIssue', { roomId: lobby, amnendedIssue });
    onChangeCloseIssue();
  };

  const handleCloseDialog = () => {
    setRequestToJoin(false);
    setLateMembers([]);
    setLateMember(null);
    setAutoJoin(false);
    setJoined(true);
  };

  const onAllow = (user: ILatePlayer) => {
    state.socket.emit('allowLatePlayerIntoGame', {
      roomId: lobby,
      user,
    });
  };

  const onAllowConfirm = (user: ILatePlayer) => {
    state.socket.emit('allowLatePlayerIntoGame', {
      roomId: lobby,
      user,
    });
    setJoined(true);
    setLateMembers((prev) =>
      prev.filter((member) => member.userId !== user.userId),
    );
  };

  const onRoomLeaveLateMember = (user: ILatePlayer) => {
    state.socket.emit('declineLateMember', {
      roomId: lobby,
      userId: user.userId,
    });
    setJoined(true);
    setLateMembers((prev) =>
      prev.filter((member) => member.userId !== user.userId),
    );
  };

  const onLeaveRoomDealer = () => {
    setIsLeaveOpen(true);
  };

  const lateMemberToJoin = (data: ILatePlayerToJoin) => {
    setLateMembers((prev) => {
      const newLatePlayer = {
        userId: data.userId,
        username: data.username,
        userSurname: data.userSurname,
        userRole: data.userRole,
      };
      return [...prev, newLatePlayer];
    });
    setRequestToJoin(true);
  };

  const lateMemberAutoJoin = (data: ILatePlayerToJoin) => {
    setLateMembers((prev) => {
      const newLatePlayer = {
        userId: data.userId,
        username: data.username,
        userSurname: data.userSurname,
        userRole: data.userRole,
      };
      return [...prev, newLatePlayer];
    });
    setAutoJoin(true);
  };

  useEffect(() => {
    if (!voting && lateMembers && lateMembers.length && autoJoin) {
      lateMembers.forEach((member) => onAllow(member));
      handleCloseDialog();
    }
  }, [lateMembers, autoJoin, voting]);

  useEffect(() => {
    console.log('voiting', voting);
    console.log('requestToJoin', requestToJoin);
    console.log('lateMembers.length', lateMembers.length);
    console.log('joined', joined);

    if (!voting && requestToJoin) {
      if (lateMembers.length && joined) {
        setJoined(false);
        setLateMember(lateMembers[lateMembers.length - 1]);
      } else if (!lateMembers.length) handleCloseDialog();
    }
  }, [requestToJoin, voting, joined]);

  useEffect(() => {
    const newTitle = gameIssues.map((item) => item.issue.issueName).join(', ');
    setTitle(newTitle);
  }, [gameIssues]);

  useEffect(() => {
    state.socket.on('gameOver', (message) => {
      gameFinish(message);
    });

    state.socket.on('latePlayerAskToJoin', (message) => {
      lateMemberToJoin(message);
    });

    state.socket.on('allowToAutoJoinGame', (message) => {
      lateMemberAutoJoin(message);
    });

    return () => {
      state.socket.off('gameOver', (message) => {
        gameFinish(message);
      });

      state.socket.off('latePlayerAskToJoin', (message) => {
        lateMemberToJoin(message);
      });

      state.socket.off('allowToAutoJoinGame', (message) => {
        lateMemberAutoJoin(message);
      });
    };
  }, []);

  return (
    <div>
      <Typography variant='h6' align='center' gutterBottom>
        Spring: {sprintTitle} planning (issues: {title})
      </Typography>

      <Typography variant='subtitle2'>Dealer:</Typography>
      <Grid container direction='column'>
        <Grid container justifyContent='space-between' alignItems='flex-end'>
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
            <GameResultPopup
              onLeaveRoom={onLeaveRoomDealer}
              gameIssues={gameIssues}
            />
          </Grid>
          <Grid container item justifyContent='space-between'>
            <Grid
              container
              item
              direction='column'
              className={classes.btnContainer}
            >
              <Grid item className={classes.mBottom}>
                <Box boxShadow={2} mr={10}>
                  <Button
                    variant='outlined'
                    className={classes.btn}
                    onClick={onStartVoting}
                    disabled={voting}
                  >
                    Start Voting
                  </Button>
                </Box>
              </Grid>
              <Grid item className={btnHidden}>
                <Box boxShadow={2} mr={10}>
                  <Button
                    variant='outlined'
                    className={classes.btn}
                    onClick={calculateIssueScore}
                    disabled={!result}
                    hidden={timer && timer.isTimer}
                  >
                    Voting results
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              {timer && timer.isTimer && (
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
            onAmendScore={onChangeOpenIssue}
          />
        )}
        <NewIssueGamePopup
          onIssueCreate={onIssueCreate}
          onAddCloseIssue={onAddCloseIssue}
          isOpen={isOpen}
          issues={gameIssues.map((el) => ({
            issueName: el.issue.issueName,
            priority: el.issue.priority,
            issueDescription: el.issue.issueDescription,
          }))}
        />
        <ChangeScoreGamePopup
          onScoreChange={onScoreChange}
          onChangeCloseIssue={onChangeCloseIssue}
          isOpen={isScoreOpen}
          issue={gameIssues.find(
            (iss) => iss.issue.issueName === activeIssueName,
          )}
        />
        <DealerLeavePage
          isOpen={isLeaveOpen}
          onLeaveConfirm={onRoomLeave}
          onLeaveClose={() => setIsLeaveOpen(false)}
        />
      </Grid>

      {!voting && requestToJoin && lateMember && (
        <LateMemberAccess
          requestToJoin={requestToJoin}
          lateMember={lateMember}
          onAllow={onAllowConfirm}
          onRoomLeaveLateMember={onRoomLeaveLateMember}
          classBtn={classes.btn}
        />
      )}
    </div>
  );
};
