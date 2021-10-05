import { makeStyles } from "@material-ui/core";

export const useStylesAmendIssueScore = makeStyles((theme) => ({
  amendContainer: {
    width: 350,
    padding: theme.spacing(2),
  },
  marginBtm: {
    marginBottom: theme.spacing(4),
  },
  
  btn: {
    cursor: 'pointer',
  }
}));