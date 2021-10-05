import { makeStyles, Theme } from '@material-ui/core';

const useStylesGamePart = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
    height: '100%',
    boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down(700)]: {
      height: '100%',
      paddingBottom: theme.spacing(2),
    },
  },
  btn: {
    width: '190px',
  },
  btnContainer: {
    width: '190px',
    marginRight: 80
  },
  mBottom: {
    marginBottom: '20px',
  },
  issuesContainer: {
    maxHeight: '40vh',
    width: 270,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    marginBottom: theme.spacing(2),
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#60dabf',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#8fe4d1',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: '#ccc',
    },

    '&::-webkit-scrollbar-track:hover': {
      backgroundColor: '#eee',
    },

    [theme.breakpoints.down(960)]: {
      maxHeight: '30vh',
    },
  },
  statContainer: {
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  btnHidden: {
    display: 'none',
  },
  voting: {
    flexGrow: 4,
    minWidth: '100px',
  }
}));

export default useStylesGamePart;
