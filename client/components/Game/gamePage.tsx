import { Grid } from '@material-ui/core';
import useStylesGame from '@styles/game.style';
import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import AppContext from 'store/store';
import {
  IApiStartGame,
  IGamePageIssue,
  IGameTimer,
  IUser,
} from 'utils/interfaces';
import { cardDecks, nonVoted, roles, sequences } from 'utils/configs';
import { GameDealer } from './gameDealer';
import { GamePlayer } from './gamePlayer';
import { ScoreList } from './scoreList';
import { ObserverList } from './observerList';
import { GameCard } from 'components/Cards/gameCard';
import { apiGetLobbyUsers, apiStartGame } from 'services/apiServices';
import { ErrorPopup } from 'components/Error/errorPopup';

interface GamePageProps {
  gameData: IApiStartGame;
  userData: Array<IUser>;
  errorStatus: string;
}

export const GamePage: FC<GamePageProps> = ({
  gameData,
  userData,
  errorStatus,
}) => {
  const classes = useStylesGame();
  const [users, setUsers] = useState<Array<IUser>>();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [gameIssues, setGameIssues] = useState<Array<IGamePageIssue>>();
  const [activeIssueName, setActiveIssueName] = useState<string>();
  const [chosenDeck, setChosenDeck] = useState<Array<string>>();
  const [chosenSeq, setChosenSeq] = useState<Array<number>>();
  const [cardPot, setCardPot] = useState('');
  const [activeCard, setActiveCard] = useState<string>('');
  const [dealer, setDealer] = useState<IUser>();
  const [sprintTitle, setSprintTitle] = useState('');
  const [timer, setTimer] = useState<IGameTimer>();
  const [voting, setVoting] = useState(false);
  const [result, setResult] = useState(false);
  const [timeStarted, setTimeStarted] = useState<number>();
  const [errorPage, setErrorPage] = useState(false);

  const onUserJoinLeave = (users: Array<IUser>) => {
    setUsers(users);
    console.log('Lobby Dealer join/left user');
  };

  const onIssueClick = (issueName: string) => {
    state.socket.emit('changeActiveIssue', { roomId: lobby, issueName });
  };

  const changeActiveIssue = (message: {
    issueName: string;
    gameIssues: Array<IGamePageIssue>;
    timer: IGameTimer
  }) => {
    setActiveIssueName(message.issueName);
    setActiveCard('');
    setGameIssues(message.gameIssues);
    if (message.timer && message.timer.isTimer) {
      setTimer(message.timer);
    }
    setVoting(false);
    setResult(false);
  };

  const onTimerStop = () => {
    console.log(('Timer Stop'));
    if (timer.isTimer) {
      setTimer({
        isTimer: true,
        time: 0,
      });
    }

    state.socket.emit('calcScore', {
      roomId: lobby,
      issueName: activeIssueName,
    });
    setVoting(false);
    setResult(true);
  }

  const onGameCardClick = (cardName: string, cardNumber: number) => {
    if (voting) {
      setActiveCard(cardName);
      state.socket.emit('gameCardChoice', {
        roomId: lobby,
        playerChoice: {
          playerId: state.userId,
          playerChoice: cardNumber,
          issue: activeIssueName,
        },
      });
    }

  };

  const calculateIssueScore = () => {
    state.socket.emit('calcScore', {
      roomId: lobby,
      issueName: activeIssueName,
    });
  };

  const newIssueAdded = (newIssue: Array<IGamePageIssue>) => {
    setGameIssues(newIssue);
  };

  const onStartVoting = () => {
    setVoting(true);

    state.socket.emit('startVoting', {
      roomId: lobby,
      voting: true
    });
    if (!timer?.isTimer) {
      setResult(true);
    }

  };

  const onTimerStart = (message: { time: number, timer: IGameTimer, voting: boolean }) => {
    setTimer(message.timer)
    setTimeStarted(message.time);
    setVoting(message.voting)
  };

  const gameInit = (gameData: IApiStartGame) => {
    if (gameData && typeof gameData !== 'string') {
      setGameIssues(gameData.issues);
      setActiveIssueName(gameData.issues[0].issue.issueName);
      setSprintTitle(gameData.sprintName);
      if (gameData.timer.isTimer) {
        setTimer(gameData.timer);
      }

      const seq = gameData.card.sequence;
      const currentSeq = sequences.find((item) => item.name === seq);
      if (currentSeq) {
        setChosenSeq(
          Array.from(
            { length: gameData.card.cardNumber },
            (_, i) => currentSeq.sequence[i],
          ),
        );
      }

      const deck = gameData.card.cardDeck;
      const currentDeck = cardDecks.find((item) => item.name === deck);
      if (currentDeck) {
        setChosenDeck(
          Array.from(
            { length: gameData.card.cardNumber },
            (_, i) => currentDeck.deck[i],
          ),
        );
        setCardPot(currentDeck.deck[currentDeck.deck.length - 1]);
      }
    }
  };

  const onGameInfoRequest = async () => {

    try {
      const user = await apiGetLobbyUsers(lobby);
      const userData = await user.data;

      const game = await apiStartGame(lobby);
      const gameData = await game.data;

      if (user.status === 200 && game.status === 200) {
        if (typeof userData === 'string') {
          setErrorPage(true);
        } else {
          setUsers(userData);
          const dealer = userData.find((user) => user.dealer);
          setDealer(dealer);
        }
        if (typeof gameData === 'string') {
          setErrorPage(true);
        } else {
          gameInit(gameData);
        }
      }
    } catch {
      setErrorPage(true)
    }
  }

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

    setUsers(userData);
    if (userData) {
      const dealer = userData && userData.find((user) => user.dealer);
      setDealer(dealer);
    }
    gameInit(gameData);

    onGameInfoRequest();

    state.socket.on('userJoined', (message) => {
      onUserJoinLeave(message);
    });

    state.socket.on('userLeft', (message) => {
      onUserJoinLeave(message);
    });

    state.socket.on('newGameIssue', (message) => {
      newIssueAdded(message);
    });

    state.socket.on('timerStarted', (message) => {
      onTimerStart(message);
    });

    state.socket.on('activeIssueChanged', (message) => {
      changeActiveIssue(message);
    });
    // }

    return () => {
      state.socket.off('userJoined', (message) => {
        onUserJoinLeave(message);
      });

      state.socket.off('userLeft', (message) => {
        onUserJoinLeave(message);
      });

      state.socket.off('newGameIssue', (message) => {
        newIssueAdded(message);
      });

      state.socket.off('timerStarted', (message) => {
        onTimerStart(message);
      });

      state.socket.off('activeIssuechanged', (message) => {
        changeActiveIssue(message);
      });

      setUsers([]);
      setGameIssues([]);
      setTimer(null)
      setTimeStarted(0);
      setVoting(false)
      setResult(false);
      setActiveIssueName('');
      setActiveCard('');
    };
  }, []);

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        direction="column"
        item
        xl={9}
        md={8}
        sm={7}
        xs={12}
        className={classes.gamePartContainer}
      >
        {state.dealer &&
          gameIssues && (
            <GameDealer
              dealer={dealer}
              gameIssues={gameIssues}
              onIssueClick={onIssueClick}
              activeIssueName={activeIssueName}
              calculateIssueScore={calculateIssueScore}
              sprintTitle={sprintTitle}
              timer={timer}
              onStartVoting={onStartVoting}
              voting={voting}
              result={result}
              timeStarted={timeStarted}
              onTimerStop={onTimerStop}
            />
          )}
        {!state.dealer &&
          gameIssues && (
            <GamePlayer
              dealer={dealer}
              gameIssues={gameIssues}
              activeIssueName={activeIssueName}
              sprintTitle={sprintTitle}
              timer={timer}
              timeStarted={timeStarted}
              onTimerStop={() => { }}
            />
          )}
        <Grid container item>
          {state.userRole === roles.member &&
            chosenDeck &&
            chosenSeq &&
            chosenDeck.map((card, i) => (
              <GameCard
                key={card}
                cardImg={card}
                cardNumber={chosenSeq[i]}
                game={true}
                onGameCardClick={onGameCardClick}
                activeCard={activeCard}
                voting={voting}
              />
            ))}
          {state.userRole === roles.member &&
            cardPot && (
              <GameCard
                cardImg={cardPot}
                cardNumber={nonVoted}
                game={true}
                onGameCardClick={onGameCardClick}
                activeCard={activeCard}
                voting={voting}
              />
            )}
        </Grid>
      </Grid>
      <Grid
        item
        container
        xl={3}
        md={4}
        sm={5}
        xs={4}
        className={classes.scorePartContainer}
      >
        {users && (
          <ScoreList
            users={users}
            issues={gameIssues}
            activeIssueName={activeIssueName}
          />
        )}
        {users && <ObserverList users={users} />}
      </Grid>
      {errorPage && (
        <ErrorPopup
          isOpen={true}
          message={'No Room found'}
          onClosePopup={router.push('/404')}
        />
      )}
    </Grid>
  );
};
