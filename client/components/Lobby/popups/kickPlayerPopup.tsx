import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { IUser } from 'utils/interfaces';

export interface KickPlayerPopupProps {
  isOpenKickUser: boolean;
  onClosePopUp: (isOpen: boolean) => void;
  user: IUser;
  onDeleteUser: (user: IUser) => void;
}

const KickPlayerPopup: FC<KickPlayerPopupProps> = ({
  isOpenKickUser,
  onClosePopUp,
  user,
  onDeleteUser,
}) => {
  const onConfirmClick = () => {
    onDeleteUser(user);
    onClosePopUp(false);
  };
  return (
    <div>
      {user && (
        <Dialog
          open={isOpenKickUser}
          onClose={() => onClosePopUp(false)}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title' style={{ textAlign: 'center' }}>
            Kick player?
          </DialogTitle>
          <DialogContent>
            Do you really want to remove player {user.username}{' '}
            {user.userSurname} from the game session?
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  color='primary'
                  variant='contained'
                  fullWidth
                  onClick={onConfirmClick}
                >
                  Yes
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color='primary'
                  variant='outlined'
                  fullWidth
                  onClick={() => onClosePopUp(false)}
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

export default KickPlayerPopup;
