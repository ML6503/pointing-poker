import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStylesLobbyPart = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      width: '190px',
      marginBottom: '10px',
    },
    mBottom: {
      marginBottom: '20px',
    },
    lobbyPartUserContainer: {
      padding: '10px 10px 0',
      height: '100%',
      boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
      [theme.breakpoints.down(600)]: {
        height: '100%',
        paddingBottom: '20px',
      },
    },
    lobbyPartDealerContainer: {
      padding: '10px 10px 0',
      height: '100%',
      boxShadow: '1px 0 3px rgba(0, 0, 0, 0.3)',
      [theme.breakpoints.down(740)]: {
        height: '100%',
        paddingBottom: '20px',
      },
    },
    error: {
      color: 'red',
      textAlign: 'center',
      width: '100%'
    },
    errorWrapper: {
      height: '21px',
      width: '100%'
    }
  }),
);

export default useStylesLobbyPart;
