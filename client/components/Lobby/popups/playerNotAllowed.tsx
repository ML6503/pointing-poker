import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';

interface PlayerNotAllowedProps {
  isNotAllowed: boolean;
  onConfirmNotAllowed: () => void;
}

export const PlayerNotAllowed: FC<PlayerNotAllowedProps> = ({
  isNotAllowed,
  onConfirmNotAllowed,
}) => {
  return (
    <div>
      <Dialog open={isNotAllowed}>
        <DialogTitle id='alert-dialog-title'>
          You are not allowed for game entrance
        </DialogTitle>
        <Grid container justifyContent='center'>
          <DialogActions>
            <Button
              onClick={onConfirmNotAllowed}
              color='primary'
              variant='contained'
            >
              OK
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
};
