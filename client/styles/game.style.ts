import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStylesGame = makeStyles((theme: Theme) => createStyles({

  container: {
    // width: '100%',
    // height: '100%',
    // height: 'calc(100vh - 60px)',
    [theme.breakpoints.down('xs')]: {
      // height: '100%',
    },
  },
  memberPartContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',  
    justifyContent: 'space-between',
    boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down(800)]: {
      height: '300px',
    },
  },
  gamePartContainer: {
    minHeight: 'calc(100vh - 60px)',
    padding: theme.spacing(2, 1),
    boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down(800)]: {
      height: '100%',
      paddingBottom: '20px',
      minWidth: '100%',
      minHeight: '100%'
    },
  },
  scorePartContainer: {
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    boxShadow:'1px 0 3px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down(800)]: {
      height: '300px',
      minHeight: '300px',
      minWidth: '100%'
    },
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
  gameCardContainer: {
    position: 'absolute',
    bottom: 0,
  }
})
);

export default useStylesGame;
