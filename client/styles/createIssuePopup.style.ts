import { makeStyles } from '@material-ui/core';

export const useStylesCreateIssuePopup = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  select: {
    width: '100%',
    margin: theme.spacing(2, 0),
  },
  btn: {
    cursor: 'pointer',
  },
  container: {
    width: '500px',
    margin: '0 auto',
    [theme.breakpoints.down(500)]: {
      width: '320px',
    },
  },
}));
