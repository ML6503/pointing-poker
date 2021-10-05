import { Grid, Button, IconButton, Typography } from '@material-ui/core';
import useStylesFooter from '@styles/footer.style';
import useStylesRssIcon from '@styles/rssIcon.style';
import { RssIcon } from 'components/svg-to-tsx/rss-logo';
import Link from 'next/link';

export const Footer = () => {
  const classesIcon = useStylesRssIcon();
  const classes = useStylesFooter();

  return (
    <div className={classes.footerContainer}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        className={classes.footerRoot}
      >
        <Grid item>
          <Typography variant="subtitle1">
            {new Date().getFullYear()}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            size="medium"
            href="https://github.com/Nata-Roma"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Nata-Roma
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="medium"
            href="https://github.com/ML6503"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ML6503
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="medium"
            href="https://github.com/IlayMorozoff"
            target="_blank"
            rel="noopener noreferrer"
          >
            @IlayMorozoff
          </Button>
        </Grid>
        <Grid item className={classesIcon.container}>
          <Link href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/pointing-poker.md">
            <a target="_blank" rel="noopener noreferrer">
              <RssIcon />
            </a>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
