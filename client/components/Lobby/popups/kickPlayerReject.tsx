import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { IUser } from 'utils/interfaces';

export interface KickPlayerRejectProps {
  isOpenReject: boolean;
  onCloseReject: (isOpen: boolean) => void;
  user: IUser;
}

const KickPlayerReject: FC<KickPlayerRejectProps> = ({
  isOpenReject,
  onCloseReject,
  user,
}) => {
  const onConfirmClick = () => {
    onCloseReject(false);
  };
  return (
    <div>
      {user && (
        <Dialog
          open={isOpenReject}
          onClose={() => onCloseReject(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
            No quorum for voting
          </DialogTitle>
          <DialogContent>
            You cannot remove {user.username}{' '}
            {user.userSurname} from the game session.
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justifyContent='center'>
              <Grid item xs={6}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => onCloseReject(false)}
                >
                  Ok
                </Button>
              </Grid>
              {/* <Grid item xs={6}>
                <Button
                  color="primary"
                  variant="outlined"
                  fullWidth
                  onClick={() => onCloseReject(false)}
                >
                  No
                </Button>
              </Grid> */}
            </Grid>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default KickPlayerReject;
