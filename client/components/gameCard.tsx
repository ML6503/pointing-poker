import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { FC, useState } from 'react';
import { Grid } from '@material-ui/core';

const useStyles = props => makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: props.width,
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    },

    media: {
      height: '100%',
      width: '100%',
    },
    avatar: {
      backgroundColor: 'transparent',
      border: '3px solid',
      borderColor: theme.palette.primary.main,
      marginRight: '-16px',
      marginBottom: 8,
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
    avatarRoot: {
      width: 30,
      height: 30,
    },
    cardHeader: {
      padding: theme.spacing(0, 1),
    },
    cardContainer: {
      width: 'calc(100%)',
      height: props.ratio*props.width,
    }
  }),
);

const cardSize = {
  width: 130,
  ratio: 1.38
}

const gameCards = [ '/cards/card_1.png', '/cards/card_2.png' ];
const sequence = [1, 2, 3, 5, 8]

{/* <Grid container>
        {gameCards.map((card, i) => <GameCard cardImg={card} cardNumber={sequence[i]} key={card} />)}
      </Grid> */}


interface GameCardProps {
  cardImg: string
  cardNumber: number
}

export const GameCard: FC<GameCardProps> = ({cardImg, cardNumber}) => {
  const classes = useStyles(cardSize)();
  const [ expanded, setExpanded ] = useState(false);
  // const card = '/card_1.png';

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <Grid container direction="column">
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <CardHeader
              className={classes.cardHeader}
              avatar={
                <Avatar aria-label="card number" className={`${classes.avatar} ${classes.avatarRoot}`}>
                  {cardNumber}
                </Avatar>
              }
            />
          </Grid>
          <Grid item>
            <CardHeader
              className={classes.cardHeader}
              avatar={
                <Avatar aria-label="card number" className={`${classes.avatar} ${classes.avatarRoot}`}>
                  {cardNumber}
                </Avatar>
              }
            />
          </Grid>
        </Grid>
        <Grid item className={classes.cardContainer}>
          <CardMedia
            className={classes.media}
            image={cardImg}
            title="Game Card"
          />
        </Grid>
      </Grid>
    </Card>
  );
}
