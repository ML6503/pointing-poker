import { FC } from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { IGamePageIssueScore } from 'utils/interfaces';
import { nonVoted } from 'utils/configs';

const useStylesStatisticsCard = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: 115,
      marginRight: theme.spacing(0, 1),
    },
  }),
);

interface StatisticsCardProps {
  stat: IGamePageIssueScore;
}

export const StaticticsCard: FC<StatisticsCardProps> = ({ stat }) => {
  const classes = useStylesStatisticsCard();

  return (
    <Button
      variant="outlined"
      className={classes.container}      
    >
      <div>
        <Typography variant="h3" gutterBottom>{stat.choice === +nonVoted ? '?' : `${stat.choice}`}</Typography>
        <Typography variant="h5">{`${stat.ratio}%`}</Typography>
      </div>
    </Button>
  );
};
