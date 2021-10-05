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

export interface DealerLeavePageProps {
  onLeaveConfirm: () => void;
  onLeaveClose: () => void;
  isOpen: boolean;
}

export const DealerLeavePage: FC<DealerLeavePageProps> = ({
  onLeaveConfirm,
  isOpen,
  onLeaveClose,
}) => {
  const classes = useStylesAmendIssueScore();

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onLeaveClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.amendContainer}>
          <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
            You are going to leave page
          </DialogTitle>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  onClick={onLeaveConfirm}
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={onLeaveClose}
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
