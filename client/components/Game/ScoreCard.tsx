import { Typography } from '@material-ui/core';
import useStylesScoreCard from '@styles/scoreCard.style';
import React, { useState } from 'react';
import { nonVoted } from 'utils/configs';
import { IGamePagePlayer } from 'utils/interfaces';

interface UserCardProps {
  player: IGamePagePlayer;
}

export const ScoreCard = ({ player }: UserCardProps) => {
  const classes = useStylesScoreCard();

  return (
    <div className={classes.container}>
      {player && (
        <Typography variant="h5">
          {player.choice === +nonVoted || player.choice === 0 ? (
            'unknown'
          ) : (
            `${player.choice} points`
          )}
        </Typography>
      )}
      {!player && <Typography variant="h5">unknown</Typography>}
    </div>
  );
};
