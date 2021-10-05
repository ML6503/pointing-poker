import { makeStyles, Theme, createStyles, alpha } from '@material-ui/core';

export const useStyles404 = (props) =>
  makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        backgroundColor: theme.palette.background.default,
        minHeight: `calc(100vh - 60px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down(600)]: {
          minHeight: `calc(100vh - 185px)`,
        },
      },
      cardContainer: {
        width: props.width,
        height: props.ratio * props.width,
        padding: theme.spacing(1),
        borderRadius: 10,
      },
      media: {
        height: '100%',
        width: '100%',
        borderRadius: 6,
      },
      container: {
        padding: theme.spacing(0, 2),
      },
      icon: {
        width: 50,
        height: 50,
        color: theme.palette.secondary.main,
      },
      button: {
        marginTop: 20,
      },
      text: {
        [theme.breakpoints.down(600)]: {
          marginTop: 20,
          textAlign: 'center',
        },
      },
      innerContainer: {
        flexDirection: 'row',
        [theme.breakpoints.down(600)]: {
          flexDirection: 'column',
        },
      }
    }),
  );
