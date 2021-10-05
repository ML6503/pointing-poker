import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { IGamePageIssue } from 'utils/interfaces';
import { useStylesAmendIssueScore } from '@styles/amendIssueScorePopup.style';

export interface ChangeScoreGamePopupProps {
  onScoreChange: (amendedIssue: IGamePageIssue) => void;
  onChangeCloseIssue: () => void;
  isOpen: boolean;
  issue: IGamePageIssue;
}

export const ChangeScoreGamePopup: FC<ChangeScoreGamePopupProps> = ({
  onScoreChange,
  isOpen,
  onChangeCloseIssue,
  issue,
}) => {
  const classes = useStylesAmendIssueScore();
  const [ issueScore, setIssueScore ] = React.useState('');

  const onCreateClick = () => {
    onScoreChange({
      ...issue,
      amendedScore: +issueScore,
    });
    setIssueScore('');
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onChangeCloseIssue}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.amendContainer}>
          <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
            Amend Issue Score
          </DialogTitle>
          <Typography variant="h6" color="primary">
            Issue name: {issue.issue.issueName}
          </Typography>
          <Typography variant="h6" color="primary">
            Current issue score: {issue.totalScore}
          </Typography>
          <DialogContent className={classes.marginBtm}>
            <TextField
              autoFocus
              margin="dense"
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              id="name"
              label="Amend issue score"
              fullWidth
              value={issueScore}
              onChange={(e) => setIssueScore(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  onClick={onCreateClick}
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Amend
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={onChangeCloseIssue}
                  color="primary"
                  variant="outlined"
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
