import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';
import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, CardMedia, Grid } from '@material-ui/core';
import { useStyles404 } from '@styles/404.style';

const cardSize = {
  width: 200,
  ratio: 1.38,
};

interface PageNotFoundProps {
  message: string
}

const PageNotFound:FC<PageNotFoundProps> = ({message}) => {
  const classes = useStyles404(cardSize)();
  const cardImg = '/cards/card_error.png';

  return (
    <Paper className={classes.paper}>
      <Grid container justifyContent='center' alignItems='center' className={classes.innerContainer}>
        <Grid item className={classes.container}>
          <Card className={classes.cardContainer}>
            {cardImg && (
              <CardMedia
                className={classes.media}
                image={cardImg}
                title="Game Card"
              />
            )}
          </Card>
        </Grid>
        <Grid item className={classes.text}>
          <Typography variant="h2" color='primary'>404</Typography>
          <Typography variant="h4"  color='primary'>page not found</Typography>
          {message && <Typography variant="h5"  color='primary'>{message}</Typography>}
          <Link href="/">
          <Button
            color="secondary"
            aria-label="home"
            className={classes.button}
          >
            <Home className={classes.icon} />
          </Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PageNotFound;
