import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { IUser } from 'utils/interfaces';

export interface KickPlayerConfirmProps {
  isOpenConfirm: boolean;
  onCloseConfirm: (isOpen: boolean) => void;
  user: IUser;
  onConfirmClick: (user: IUser, vote: number) => void;
  onRejectClick: (user: IUser, vote: number) => void;
}

const KickPlayerConfirm: FC<KickPlayerConfirmProps> = ({
  isOpenConfirm,
  onCloseConfirm,
  user,
  onConfirmClick,
  onRejectClick,
}) => {
  
  return (
    <div>
      {user && (
        <Dialog
          open={isOpenConfirm}
          onClose={() => {}}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
            Player will be kicked off
          </DialogTitle>
          <DialogContent>
            Do you agree to remove {user.username}{' '}
            {user.userSurname} from the game session?
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => onConfirmClick(user, 1)}
                >
                  Yes
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="primary"
                  variant="outlined"
                  fullWidth
                  onClick={() => onRejectClick(user, -1)}
                >
                  No
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default KickPlayerConfirm;
