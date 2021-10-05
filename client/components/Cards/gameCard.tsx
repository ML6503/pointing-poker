import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import { FC, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import clsx from 'clsx';
import { useStylesGameCard } from '@styles/gameCard.style';
import { maxCardNumber, minCardNumber } from 'utils/configs';

const cardSize = {
  width: 130,
  ratio: 1.38,
};

interface GameCardProps {
  cardImg: string;
  cardNumber: string;
  game?: boolean;
  empty?: boolean;
  onAddCard?: () => void;
  onRemoveCard?: () => void;
  deckLength?: number;
  onGameCardClick?: (cardName: string, cardNumber: string) => void
  activeCard?: string
  voting?: boolean
}

export const GameCard: FC<GameCardProps> = ({
  cardImg,
  cardNumber,
  onAddCard,
  onRemoveCard,
  game = false,
  empty = false,
  deckLength,
  onGameCardClick,
  activeCard,
  voting
}) => {
  const classes = useStylesGameCard(cardSize)();
  const [ clicked, setClicked ] = useState(false);

  const onCardClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <Card className={classes.root} >
      <Grid container direction="column" className={clsx(empty && classes.paddingForButtons)}> 
      { !empty && 
        <Grid item container justifyContent="space-between" alignItems="center">    
            <Grid item>
            <CardHeader
              className={classes.cardHeader}
              avatar={
                <Avatar
                  aria-label="card number"
                  className={clsx(classes.avatar, classes.avatarRoot)}
                >
                  <Typography color="textPrimary" variant="body1">
                    {cardNumber}
                  </Typography>
                </Avatar>
              }
            />
          </Grid>
          
          <Grid item>
            <CardHeader
              className={classes.cardHeader}
              avatar={
                <Avatar
                  aria-label="card number"
                  className={clsx(classes.avatar, classes.avatarRoot)}
                >
                  <Typography color="textPrimary" variant="body1">
                    {cardNumber}
                  </Typography>
                </Avatar>
              }
            />
          </Grid>
        </Grid>
      }
        <Grid item className={classes.cardContainer} onClick={game ? () => onGameCardClick(cardImg, cardNumber): () => {}}>
          {cardImg && <CardMedia
            className={classes.media}
            image={cardImg}
            title="Game Card"
          />}
          
          {game && (
            <div
              className={
                activeCard===cardImg && voting ? (
                  `${classes.cardCover} ${classes.cardCoverActive}`
                ) : (
                  classes.cardCover
                )
              }
            >
              {activeCard===cardImg && voting && (
                <div className={classes.iconUnder}>
                  <CheckCircleIcon color="primary" className={classes.icon} />
                </div>
              )}
            </div>
          )}
          {!game &&
          empty && (
            <div className={classes.cardCover}>
              <Grid container direction='column' alignItems='center'>
              <AddCircleIcon                
                className={clsx(classes.emptyCardIcon, deckLength === maxCardNumber && classes.disabledCardIcon)}
                onClick={onAddCard}
              />
              <RemoveCircleIcon                
                className={clsx(classes.emptyCardIcon, deckLength === minCardNumber && classes.disabledCardIcon)}
                onClick={onRemoveCard}
              />
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};
