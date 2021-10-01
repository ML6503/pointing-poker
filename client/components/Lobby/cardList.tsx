import { Grid, Typography } from '@material-ui/core';
import { GameCard } from 'components/Cards/gameCard';
import { FC } from 'react';
import { nonVoted } from 'utils/configs';

interface CardListProps {
  cardDeck: Array<string>;
  sequence: Array<number | string>;
  onAddCard: () => void;
  cardPot: string;
  onRemoveCard: () => void;
  customSequence: Array<number | string>;
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
            // <GameCard cardImg={deck} cardNumber={customSequence.indexOf('') === -1 ? Number(customSequence[i]) : sequence[i]} key={deck} />
            <GameCard cardImg={deck} cardNumber={sequence[i]} key={deck} />
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
