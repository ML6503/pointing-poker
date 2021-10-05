import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStylesScoreList = makeStyles((theme: Theme) => createStyles({
  card: {
    width: '190px',
  },
  container: {
    width: '100%',
    marginBottom: theme.spacing(2.5),
    
  },
  heading: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(1.5),
  },
  playerContainer : {
    paddingBottom: theme.spacing(1),
  }
}));

export default useStylesScoreList;
