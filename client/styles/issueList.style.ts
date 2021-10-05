import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStylesIssueList = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    deleteButton: {
      cursor: 'pointer',
    },
    btn: {
      width: '190px',
      cursor: 'pointer',
    },
    gap: {
      gap: '10px'
    },
    issueList: {
      flexGrow: 0,
      flexBasis: '16.666667%'
    },
    title: {
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
  }),
);
