import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStylesLobby = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // width: '100%',
      height: 'calc(100vh - 56px)',
      [theme.breakpoints.down(740)]: {
        height: '100%',
      },
    },
    containerDealer: {
      // width: '100%',
      height: '100%',
      [theme.breakpoints.down(740)]: {
        height: '100%',
      },
    },
    containerUser: {
      height: 'calc(100vh - 56px)',
      [theme.breakpoints.down(600)]: {
        height: '100%',
      },
    },
    chatPartContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
      flexGrow: 1,
      [theme.breakpoints.down(600)]: {
        height: '300px',
      },
    },
    lobbyPartContainer: {
      padding: '10px 10px 0',
      height: '100%',
      boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
      [theme.breakpoints.down(740)]: {
        height: '100%',
        paddingBottom: '20px',
      },
    },
  }),
);

export default useStylesLobby;
