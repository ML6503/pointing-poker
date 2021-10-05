import { makeStyles, Theme } from '@material-ui/core';

export const useStyleHomePage = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
    height: 'calc(100vh - 56px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
  container: {
    width: '1000px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
    padding: theme.spacing(3, 2),
    [theme.breakpoints.down(1020)]: {
      width: '600px',
    },
    [theme.breakpoints.down(650)]: {
      width: '300px',
    },
  },
  titleWrapper: {
    margin: '0 auto',
    color: theme.palette.primary.dark,
  },
  title: {
    padding: theme.spacing(5, 2),
    color: theme.palette.primary.dark,
    marginBottom: '40px',
    [theme.breakpoints.down(650)]: {
      marginBottom: '0',
    },
  },
  btn: {
    width: '170px',
  },
  choiceWrapper: {
    marginBottom: '40px',
    [theme.breakpoints.down(650)]: {
      marginBottom: '10px',
    },
  },
  choiceContainer : {
    width: '250px',
  }
}));
