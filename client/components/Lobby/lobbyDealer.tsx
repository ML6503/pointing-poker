import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'Cards/userCard';
import NameGame from './nameGame';
import GameSettings from './gameSettings';
import IssueList from './issueList';
import AppContext, { appStore } from 'store/store';
import { IGameSettings, IRoomData, IssueData, IUser } from 'utils/interfaces';
import { ObserverList } from './observerList';
import { cardDecks, initGameSettings, roles, sequences } from 'utils/configs';
import { CardList } from './cardList';

interface LobbyPartProps {
  users: Array<IUser>;
}

export const LobbyDealer: FC<LobbyPartProps> = ({ users }) => {
  const classes = useStylesLobbyPart();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ dealer, setDealer ] = useState<IUser>();
  const [ userArr, setUserArr ] = useState<Array<IUser>>(users);
  const [ gameSettings, setGameSettings ] = useState<IGameSettings>(
    initGameSettings,
  );
  const [ chosenDeck, setChosenDeck ] = useState<Array<string>>();
  const [ chosenSeq, setChosenSeq ] = useState<Array<number>>();

  const onStartGameClick = () => {
    if (
      !gameSettings.issues.length ||
      // !gameSettings.card.cardNumber ||
      (gameSettings.timer.isTimer &&
        (!gameSettings.timer.minutes || !gameSettings.timer.seconds))
    )
      return null;
    router.push(`/${lobby}/game`);
  };

  const onIssueCreate = (issue: IssueData) => {
    setGameSettings((prev) => {
      const issues = prev.issues;
      issues.push({
        issueName: issue.issueName,
        priority: issue.priority,
      });
      return {
        ...prev,
        issues: issues,
      };
    });
  };

  const onIssueDelete = (issue: string) => {
    setGameSettings((prev) => {
      const issues = prev.issues.filter(
        (issueItem) => issueItem.issueName !== issue,
      );
      return {
        ...prev,
        issues: issues,
      };
    });
  };

  const onTimerChange = (isTimer: boolean) => {
    setGameSettings((prev) => {
      const timer = { ...prev.timer };
      if (isTimer) {
        timer.isTimer = true;
      } else {
        timer.isTimer = false;
        timer.minutes = 0;
        timer.seconds = 0;
      }
      return {
        ...prev,
        timer: timer,
      };
    });
  };

  const onTimeChange = (timerData: string, dimension: string) => {
    setGameSettings((prev) => {
      const timer = { ...prev.timer };
      if (timer.isTimer) {
        timer[dimension] = +timerData;
      }
      return {
        ...prev,
        timer: timer,
      };
    });
  };

  const onSelectClick = (choice: string, selectName: string) => {
    setGameSettings((prev) => {
      const card = { ...prev.card };
      card[selectName] = choice;
      return {
        ...prev,
        card: card,
      };
    });

    const seq = sequences.filter((item) => item.name === choice);
    if (seq.length) {
      setChosenSeq(
        Array.from(
          { length: gameSettings.card.cardNumber },
          (_, i) => seq[0].sequence[i],
        ),
      )
    }

    const deck = cardDecks.filter((item) => item.name === choice);

    if (deck.length) {
      setChosenDeck(
        Array.from(
          { length: gameSettings.card.cardNumber },
          (_, i) => deck[0].deck[i],
        ),
      );
    }
  };

  console.log('chosenDeck', chosenDeck);

  const onCardChange = (isChange: boolean) => {
    setGameSettings((prev) => {
      const card = { ...prev.card };
      if (isChange) {
        card.cardChange = true;
      } else {
        card.cardChange = true;
      }
      return {
        ...prev,
        card: card,
      };
    });
  };

  const onAddCard = () => {
    
    setGameSettings(prev => {
      const card = {...prev.card};
      console.log('card', card);
      if (card.cardNumber !== cardDecks[0].deck.length) {
        card.cardNumber++;
        card.cardNumberStart++;
      }
      return {...prev, card: card}
    });    
  };

  const onRemoveCard = () => {
    console.log('we are on remove card');
    setGameSettings(prev => {
      const card = {...prev.card};
      console.log('card', card);
      if (card.cardNumber > 0) {
        card.cardNumber--;
        card.cardNumberStart--;
      }
      return {...prev, card: card}
    });  
  };
  console.log('game settings ', gameSettings);

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId,
    });
    router.push('/');
  };

  state.socket.on('userJoined', (message) => {
    setUserArr(message);
    console.log('Lobby join user', message);
  });

  state.socket.on('userLeft', (message) => {
    setUserArr(message);
    console.log('Lobby user left', message);
  });

  useEffect(
    () => {
      const dealer = userArr.find((user) => user.dealer);
      setDealer(dealer);
    },
    [ userArr ],
  );
  useEffect(
    () => {
      setChosenSeq(
        Array.from(
          { length: (gameSettings.card.cardNumber - gameSettings.card.cardNumberStart) },
          (_, i) => sequences[0].sequence[gameSettings.card.cardNumberStart + i],
        ),
      );

      setChosenDeck(
        Array.from(
          { length: (gameSettings.card.cardNumber - gameSettings.card.cardNumberStart) },
          (_, i) =>  cardDecks[0].deck[gameSettings.card.cardNumberStart + i],
        ),
      );

      // not allow more than three cards except 666
      // when add cards first from left move to deck
      //and next in sequence appears

      console.log('chosenDeck', chosenDeck);
      console.log('cardDecks', cardDecks);
    },
    [ gameSettings.card.cardNumber, gameSettings.card.cardNumberStart ],
  );

  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      md={9}
      sm={7}
      className={classes.lobbyPartDealerContainer}
      wrap="nowrap"
    >
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom>
          Lobby
        </Typography>
      </Grid>
      <NameGame />
      <Grid item className={classes.mBottom}>
        <Typography variant="subtitle2">Dealer:</Typography>
        {dealer && (
          <UserCard
            user={dealer}
            observer={dealer.userRole === roles.observer ? true : false}
          />
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        className={classes.mBottom}
      >
        <Button
          color="primary"
          variant="contained"
          className={classes.btn}
          onClick={onStartGameClick}
        >
          Start Game
        </Button>
        <Button
          variant="outlined"
          className={classes.btn}
          onClick={onRoomLeave}
        >
          Cancel Game
        </Button>
      </Grid>
      <Grid item container>
        {userArr && <MemberList users={userArr} />}
      </Grid>
      <Grid item container>
        {userArr && <ObserverList users={userArr} />}
      </Grid>
      <Grid item container>
        <IssueList
          onIssueCreate={onIssueCreate}
          onIssueDelete={onIssueDelete}
          issues={gameSettings.issues}
        />
        <GameSettings
          onTimerChange={onTimerChange}
          onTimeChange={onTimeChange}
          timer={gameSettings.timer}
          onSelectClick={onSelectClick}
          onCardChange={onCardChange}
          isCardChange={gameSettings.card.cardChange}
        />
      </Grid>
      <Grid item container>
        <CardList cardDeck={chosenDeck} sequence={chosenSeq} onAddCard={onAddCard} onRemoveCard={onRemoveCard}/>
      </Grid>
    </Grid>
  );
};
