import { makeStyles, Theme } from '@material-ui/core';

export const useStylesTimer = makeStyles((theme: Theme) => ({
  mBottom: {
    marginBottom: '20px',
  },
  timerContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    marginRight: 80,
  },
  timerBox: {
    width: '190px',
    height: '53px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
  },
  timerText: {
    fontSize: '40px',
    fontWeight: 500,
  },
  timerColon: {
    fontSize: '20px',
    fontWeight: 400,
    padding: theme.spacing(1),
  },
}));
