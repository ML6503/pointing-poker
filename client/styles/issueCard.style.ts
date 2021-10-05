import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesIssueCard = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 65,
      minHeight: 65,
      maxHeight: 65,
      width: 250,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
      cursor: 'pointer',
      padding: theme.spacing(1),
    },
    block: {
      padding: 0,
    },
    blockScore: {
      padding: 0,
      cursor: 'pointer',
    },
    title: {
      fontSize: 12,
      padding: 0,
    },
    text: {
      fontSize: 16,
      padding: 0,
    },
    activeCard: {
      backgroundColor: theme.palette.primary.light,
      color: '#fff',
    },
  }),
);
