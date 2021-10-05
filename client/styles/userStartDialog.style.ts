import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyleDialog = makeStyles((theme: Theme) =>
  createStyles({
    rightPad: {
      padding: theme.spacing(1, 2),
      [theme.breakpoints.down(600)]: {
        padding: theme.spacing(1, 3),
      },
    },
    label: {
      [theme.breakpoints.down(600)]: {
        marginLeft: '0',
      },
    },
    root: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      [theme.breakpoints.down(600)]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
  }),
);