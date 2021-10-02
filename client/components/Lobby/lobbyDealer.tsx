import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'components/Cards/userCard';
import NameGame from './nameGame';
import GameSettings from './gameSettings';
import IssueList from './issueList';
import AppContext from 'store/store';
import { IGameIssue, IGameSettings, IssueData, IUser } from 'utils/interfaces';
import { ObserverList } from './observerList';
import {
  cardDecks,
  custom_Seq,
  initGameSettings,
  maxCardNumber,
  minCardNumber,
  roles,  
  sequences,
} from 'utils/configs';
import { CardList } from './cardList';
import { apiCreateGame } from 'services/apiServices';
import KickPlayerPopup from './popups/kickPlayerPopup';
import {
  issueChanged,
  issueCreate,
  selectCard,
  selectCardDeck,
  selectCardSequence,
  timeChange,
  timerChange,
  autoJoinChange,
  sprintNameChange,
  sequenceCreate,
} from './lobbyDealerHelpers';
import { DealerLeavePage } from 'components/Game/Popups/dealerLeavePage';

export interface LobbyDealerProps {
  users: Array<IUser>;
  issues: Array<string>;
}

export const LobbyDealer: FC<LobbyDealerProps> = ({ users, issues }) => {
  const classes = useStylesLobbyPart();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [dealer, setDealer] = useState<IUser>();
  const [isOpenKickUser, setIsOpenKickUser] = useState(false);
  const [kickOffUser, setKickOffUser] = useState<IUser>();
  const [gameSettings, setGameSettings] =
    useState<IGameSettings>(initGameSettings);
  const [chosenDeck, setChosenDeck] = useState<Array<string>>();
  const [chosenSeq, setChosenSeq] = useState<Array<string>>();
  const [cardPot, setCardPot] = useState('');
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [customSequence, setCustomSequence] = useState<Array< string>>(custom_Seq); 
  

  const onStartGameClick = async () => {
    if (
      !gameSettings.issues.length ||
      !gameSettings.card.cardNumber ||
      (gameSettings.timer.isTimer && !gameSettings.timer.time)
    )
      return null;
    const create = await apiCreateGame(lobby, gameSettings);
    setGameSettings(initGameSettings);
    state.socket.emit('startGame', { roomId: lobby });    
  };

  const onIssueCreate = (issue: IssueData) => {
    setGameSettings((prev) => {
      const newState = issueCreate(prev, issue);
      state.socket.emit('changeIssuesLobby', {
        roomId: lobby,
        issues: newState.issues,
      });
      return newState;
    });
  };
    

  const onIssueDelete = (newIssues: Array<IGameIssue>) => {
    setGameSettings((prev) => {
      return issueChanged(prev, newIssues);
    });
  };

  const onIssueEdit = (newIssues: Array<IGameIssue>) => {
    setGameSettings((prev) => {
      return issueChanged(prev, newIssues);
    });
  };

  const onTimerChange = (isTimer: boolean) => {
    setGameSettings((prev) => {
      return timerChange(prev, isTimer);
    });
  };

  const onTimeChange = (timerData: string, dimension: string) => {
    setGameSettings((prev) => {
      return timeChange(prev, timerData, dimension);
    });
  };

  const onSelectClick = (choice: string, selectName: string) => {
    setGameSettings((prev) => {
      return selectCard(prev, choice, selectName);
    });

    const cardSequence = selectCardSequence(
      gameSettings.card.cardNumber,
      choice,
      gameSettings.customSequence
    );
    if (cardSequence && cardSequence.length) {
      setChosenSeq(cardSequence);
    }

    const cardDeck = selectCardDeck(gameSettings.card.cardNumber, choice);
    if (cardDeck && cardDeck.length) {
      setChosenDeck(cardDeck);
    }
  };

  const onCardTurn = (isChange: boolean) => {
    setGameSettings((prev) => {
      const card = { ...prev.card };
      if (isChange) {
        card.cardTurn = true;
      } else {
        card.cardTurn = false;
      }
      return {
        ...prev,
        card: card,
      };
    });
  };

  
  const onAddCard = () => {
    setGameSettings((prev) => {
      const card = { ...prev.card };
      if (card.cardNumber < maxCardNumber) {
        card.cardNumber++;
      }

      const cardSequence = selectCardSequence(card.cardNumber, card.sequence, gameSettings.customSequence);
     
      if (cardSequence && cardSequence.length) {
        setChosenSeq(cardSequence);
      }

      const cardDeck = selectCardDeck(card.cardNumber, card.cardDeck);
      if (cardDeck && cardDeck.length) {
        setChosenDeck(cardDeck);
      }

      return { ...prev, card: card };
    });
  };

  const onRemoveCard = () => {
    setGameSettings((prev) => {
      const card = { ...prev.card };
      if (card.cardNumber > minCardNumber) {
        card.cardNumber--;
      }

      const cardSequence = selectCardSequence(card.cardNumber, card.sequence, gameSettings.customSequence);
      if (cardSequence && cardSequence.length) {
        setChosenSeq(cardSequence);
      }

      const cardDeck = selectCardDeck(card.cardNumber, card.cardDeck);
      if (cardDeck && cardDeck.length) {
        setChosenDeck(cardDeck);
      }

      return { ...prev, card: card };
    });
  };

  const onRoomLeave = () => {
    state.socket.emit('leaveGame', {
      roomId: lobby,
      userId: state.userId,
    });
  };

  const onKickUser = (user: IUser) => {
    setIsOpenKickUser(true);
    setKickOffUser(user);
  };

  const onDeleteUser = (user: IUser) => {
    state.socket.emit('kickPlayerFromLobby', {
      roomId: lobby,
      userId: user.id,
    });
  };

  const onAutoJoinChange = (isAutoJoin: boolean) => {
    setGameSettings((prev) => {
      return autoJoinChange(prev, isAutoJoin);
    });
  };

  const gameFinish = (message: string) => {
    state.socket.emit('gameOverFinish', { roomId: lobby });
    router.push('/');
  };

  const onSprintNameChange = (sprintName: string) => {
    setGameSettings((prev) => sprintNameChange(prev, sprintName));
    state.socket.emit('changeSprintName', {
      roomId: lobby,
      sprintName,
    });
  };

  useEffect(() => {
    if(customSequence.indexOf('') === -1) {
     
      setGameSettings((prev) => {
        const newState = sequenceCreate(prev, customSequence);   
        return newState;
      });
      
    }

  }, [customSequence, chosenSeq]);

  useEffect(() => {
    
    if(gameSettings.card.sequence === 'Custom sequence') {
      
      setChosenSeq(
        Array.from(
          { length: gameSettings.card.cardNumber },
          (_, i) => customSequence[i],
        ),
      );
    }

  }, [customSequence]);

  useEffect(() => {
    const dealer = users?.find((user) => user.dealer);
    setDealer(dealer);
  }, [users]);

  useEffect(() => {
    if(gameSettings.card.sequence === 'Custom sequence') {
      setChosenSeq(
        Array.from(
          { length: gameSettings.card.cardNumber },
          (_, i) => customSequence[i],
        ),
      );
    } else {
      setChosenSeq(
        Array.from(
          { length: gameSettings.card.cardNumber },
          (_, i) => sequences[0].sequence[i],
        ),
      );
    }
    
    setChosenDeck(
      Array.from(
        { length: gameSettings.card.cardNumber },
        (_, i) => cardDecks[0].deck[i],
      ),
    );

    state.socket.on('gameOver', (message) => {
      gameFinish(message);
    });
    return () => {
      state.socket.off('gameOver', (message) => {
        gameFinish(message);
      });
    };
  }, []);

  useEffect(() => {
    const deckName = initGameSettings.card.cardDeck;
    const deck = cardDecks.find((item) => item.name === deckName).deck;
    if (deck) {
      setCardPot(deck[deck.length - 1]);
    }
  }, [chosenDeck]);
  
  return (
    <Grid
      container
      direction='column'
      item
      xs={12}
      md={9}
      sm={7}
      className={classes.lobbyPartDealerContainer}
      wrap='nowrap'
    >
      <Grid item>
        <Typography variant='h4' align='center' gutterBottom>
          Lobby
        </Typography>
      </Grid>
      <NameGame onSprintNameChange={onSprintNameChange} issues={issues} />
      <Grid item className={classes.mBottom}>
        <Typography variant='subtitle2'>Dealer:</Typography>
        {dealer && (
          <UserCard
            user={dealer}
            observer={dealer.userRole === roles.observer ? true : false}
            onKickUser={onKickUser}
          />
        )}
      </Grid>
      <Grid container item>
        <Grid
          item
          container
          justifyContent='space-between'
          className={classes.mBottom}
        >
          <Button
            color='primary'
            variant='contained'
            className={classes.btn}
            onClick={onStartGameClick}
            disabled={!gameSettings.issues.length}
          >
            Start Game
          </Button>
          <Button
            variant='outlined'
            className={classes.btn}
            onClick={() => setIsLeaveOpen(true)}
          >
            Cancel Game
          </Button>
        </Grid>
        <div className={classes.errorWrapper}>
          {!gameSettings.issues.length ? (
            <Typography variant='subtitle2' className={classes.error}>
              To start the game, you need to create at least one issue
            </Typography>
          ) : null}
        </div>
      </Grid>
      <Grid item container>
        {users && <MemberList users={users} onKickUser={onKickUser} />}
      </Grid>
      <Grid item container>
        {users && <ObserverList users={users} onKickUser={onKickUser} />}
      </Grid>
      <Grid item container>
        <IssueList
          onIssueCreate={onIssueCreate}
          onIssueDelete={onIssueDelete}
          onIssueEdit={onIssueEdit}
          issues={gameSettings.issues}
        />
        <GameSettings
          onTimerChange={onTimerChange}
          onTimeChange={onTimeChange}
          timer={gameSettings.timer}
          onSelectClick={onSelectClick}
          onCardTurn={onCardTurn}
          isCardChange={gameSettings.card.cardTurn}
          onAutoJoinChange={onAutoJoinChange}
          isAutoJoin={gameSettings.isAutoJoin}
          sequence={customSequence}
          setSequence={setCustomSequence}          
        />
      </Grid>
      <Grid item container>
        <CardList
          cardDeck={chosenDeck}
          sequence={chosenSeq}
          onAddCard={onAddCard}
          onRemoveCard={onRemoveCard}
          cardPot={cardPot}
          customSequence={customSequence}
        />
      </Grid>
      <KickPlayerPopup
        isOpenKickUser={isOpenKickUser}
        onClosePopUp={(isOpen: boolean) => setIsOpenKickUser(isOpen)}
        user={kickOffUser}
        onDeleteUser={onDeleteUser}
      />
      <DealerLeavePage
        isOpen={isLeaveOpen}
        onLeaveClose={() => setIsLeaveOpen(false)}
        onLeaveConfirm={onRoomLeave}
      />
    </Grid>
  );
};
