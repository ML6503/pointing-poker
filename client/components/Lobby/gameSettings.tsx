import { Typography, Grid, TextField, Switch } from '@material-ui/core';
import { useStylesSettingsGame } from '@styles/settings.style';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { cardDecks, gameSelectOptions, sequences, timerValid } from 'utils/configs';
import { IGameTimer } from 'utils/interfaces';
import { GameSelect } from './gameSelect';
import CreateSequencePopup from './popups/createSequencePopup';

interface GameSettingsProps {
  onTimerChange: (timer: boolean) => void;
  onTimeChange: (timerData: string, dimension: string) => void;
  onSelectClick: (option: string, selectName: string) => void;
  timer: IGameTimer;
  onCardTurn: (cardChange: boolean) => void;
  isCardChange: boolean;
  onAutoJoinChange: (isAutoJoin: boolean) => void;
  isAutoJoin: boolean;  
  sequence: Array<string>;
  setSequence: Dispatch<SetStateAction<Array<string>>>;
}

const GameSettings: FC<GameSettingsProps> = ({
  onTimerChange,
  onTimeChange,
  onSelectClick,
  timer,
  onCardTurn,
  isCardChange,
  onAutoJoinChange,
  isAutoJoin,
  sequence,
  setSequence,  
}) => {
  const classes = useStylesSettingsGame();
  const [ optionsArr, setOptionsArr ] = useState<Array<string>>();
  const [ cardDeckArr, setCardDeckArr ] = useState<Array<string>>();
  const [openSequenceCreate, setOpenSequenceCreate] = useState<boolean>(false); 

  const onTimerClick = (timerSwitch: string) => {
    onTimerChange(timerSwitch ? true : false);
  };

  const onAutoJoinClick = (isAutoJoin: string) => {
    onAutoJoinChange(isAutoJoin ? true : false);
  };

  const onChangingCardClick = (cardChangeSwitch: string): void => {
    onCardTurn(cardChangeSwitch ? true : false);
  };
  
  useEffect(() => {
    const optArr = sequences.map((seq) => seq.name);
    setOptionsArr(optArr);
    const deckArr = cardDecks.map(deck => deck.name);
    setCardDeckArr(deckArr);

  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h5" align="center" gutterBottom className={classes.title}>
        Game Settings:
      </Typography>
      <Grid container spacing={2}>
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Auto complete vote:
            </Typography>
          </Grid>
          <Grid item xl={6} xs={6}>
            <Switch
              color="primary"
              value={isCardChange ? '' : 'cardChange'}
              onChange={(e) => onChangingCardClick(e.target.value)}
              disabled={timer.isTimer}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Is timer needed:
            </Typography>
          </Grid>
          <Grid item xl={6} xs={6}>
            <Switch
              color="primary"
              value={timer.isTimer ? '' : 'timer'}
              onChange={(e) => onTimerClick(e.target.value)}
              disabled={isCardChange}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Automatically let in all new participants if the game has already started:
            </Typography>
          </Grid>
          <Grid item xl={6} xs={6}>
            <Switch
              color="primary"
              value={isAutoJoin ? '' : 'isAutoJoin'}
              onChange={(e) => onAutoJoinClick(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Number Sequence:
            </Typography>
          </Grid>
          <Grid item xl={6} xs={6}>
            {optionsArr && (
              <GameSelect
                selectName={gameSelectOptions.sequence}
                options={optionsArr}
                onSelectClick={onSelectClick}
                setOpenSequenceCreate={setOpenSequenceCreate}                
              />
            )}
          </Grid>
        </Grid>
        { openSequenceCreate &&
        <CreateSequencePopup          
          openSequenceCreate={openSequenceCreate}
          setOpenSequenceCreate={setOpenSequenceCreate}
          sequence={sequence}
          setSequence={setSequence}
          />
        }
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Deck type:
            </Typography>
          </Grid>
          <Grid item xl={6} xs={6}>
            {cardDeckArr && (
              <GameSelect
                selectName={gameSelectOptions.cardDeck}
                options={cardDeckArr}
                onSelectClick={onSelectClick}
              />
            )}
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xl={6} xs={6}>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              className={classes.settingsLabel}
            >
              Round time:
            </Typography>
          </Grid>
          <Grid container item xl={6} xs={6}>
            <TextField
              error={timer.time > timerValid.minutesMax ? true : false}
              helperText={timer.time > timerValid.minutesMax ? "Enter 3 or less" : ' '} 
              type="number"
              label="minutes"
              inputProps={{min: 0, max: 3}}
              className={classes.timerInput}
              name="minutes"
              value={Math.floor(timer.time / 1000 / 60 )}
              disabled={!timer.isTimer}
              onChange={(e) => onTimeChange(e.target.value, e.target.name)}
            />
            <TextField
              error={timer.isTimer && (timer.time === 0 || timer.time < timerValid.secondsMin) ? true : false}
              helperText={timer.isTimer && (timer.time === 0 || timer.time < timerValid.secondsMin) ? "Enter 10 or more" : ' '} 
              type="number"
              label="seconds"
              inputProps={{min: 0, max: 60}}
              className={classes.timerInputRigth}
              name="seconds"
              value={timer.time / 1000 % 60}
              disabled={!timer.isTimer}
              onChange={(e) => onTimeChange(e.target.value, e.target.name)}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default GameSettings;
