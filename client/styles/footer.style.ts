import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStylesFooter = makeStyles((theme: Theme) =>
  createStyles({
    footerRoot: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    footerContainer: {
      padding: theme.spacing(1),
      // position: 'sticky',
      // left: 0,
      // bottom: 0,
    },
    btn: {
      cursor: 'pointer',
    },
  }),
);

export default useStylesFooter;
