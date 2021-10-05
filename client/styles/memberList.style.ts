import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStylesMemberList = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: '20px',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
    container: {
      width: '100%',
    },
    title: {
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
  }),
);

export default useStylesMemberList;
