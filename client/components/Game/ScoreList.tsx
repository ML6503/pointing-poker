import { Grid, Typography } from '@material-ui/core';
import useStylesScoreList from '@styles/scoreList.style';
import React, { FC, useEffect, useState } from 'react';
import { roles } from 'utils/configs';
import { IGamePageIssue, IGamePagePlayer, IUser } from 'utils/interfaces';
import { ScoreCard } from './scoreCard';
import { UserGameCard } from './userGameCard';

interface ScoreListProps {
  users: Array<IUser>;
  issues: Array<IGamePageIssue>;
  activeIssueName: string;
}

export const ScoreList: FC<ScoreListProps> = ({
  users,
  issues,
  activeIssueName,
}) => {
  const classes = useStylesScoreList();
  const [currentIssuePlayers, setCurrentIssuePlayers] = useState<
    Array<IGamePagePlayer>
  >();

  useEffect(
    () => {
      const newIssue = issues?.find(
        (issue) => issue.issue.issueName === activeIssueName,
      );
      if (newIssue) {
        setCurrentIssuePlayers(newIssue.players);
      }

    },
    [issues],
  );

  return (
    <div className={classes.container}>
      <Grid
        container
        item
        spacing={1}
        justifyContent="space-around"
        className={classes.heading}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Scores:
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Players:
        </Typography>
      </Grid>
      {users &&
        users.map((user) => {
          const player = currentIssuePlayers?.find(
            (pl) => pl.player === user.id,
          );
          return (
            user.userRole === roles.member && (
              <Grid
                container
                item
                justifyContent="space-evenly"
                alignItems="center"
                key={user.id}
                className={classes.playerContainer}
              >
                <Grid item xl={6} xs={6} container justifyContent="center">
                  <ScoreCard player={player} />
                </Grid>
                <Grid
                  item
                  xl={6}
                  xs={6}
                  key={user.id}
                  container
                  justifyContent="center"
                >
                  <UserGameCard user={user} observer={false} score={true} />
                </Grid>
              </Grid>
            )
          );
        })}
    </div>
  );
};
