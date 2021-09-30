import { Grid, Typography } from '@material-ui/core';
import { GameCard } from 'components/Cards/gameCard';
import { FC } from 'react';
import { nonVoted } from 'utils/configs';

interface CardListProps {
  cardDeck: Array<string>;
  sequence: Array<number>;
  onAddCard: () => void;
  cardPot: string;
  onRemoveCard: () => void;
  customSequence: Array<number>;
}

export const CardList: FC<CardListProps> = ({
  cardDeck,
  sequence,
  onAddCard,
  cardPot,
  onRemoveCard,
  customSequence,
}) => {

  return (
    <>
      <Typography variant="subtitle1">Add card</Typography>
      <Grid container>
        {cardPot && <GameCard cardImg={cardPot} cardNumber={nonVoted} />}
        {cardDeck &&
          sequence &&
          cardDeck.map((deck, i) => (
            <GameCard cardImg={deck} cardNumber={!customSequence.includes(999) ? customSequence[i] : sequence[i]} key={deck} />
          ))}
        <GameCard
          cardImg={''}
          cardNumber={null}
          key={'null'}
          empty={true}
          onAddCard={onAddCard}
          onRemoveCard={onRemoveCard}
          deckLength={cardDeck && cardDeck.length}
        />
      </Grid>
    </>
  );
};
