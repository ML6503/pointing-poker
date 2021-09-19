import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FC, useState } from 'react';
import {
  FormControlLabel,
  Grid,
  Switch,
  Theme,
  withStyles,
} from '@material-ui/core';
import { roles } from 'utils/configs';
import { CreateAvatar } from './avatar';
import { DialogInputBlock } from './dialogInputBlock';
import { IDialogUsers, IRoomCreateData } from 'utils/interfaces';
import { useStyleDialog } from '@styles/userStartDialog.style';


const MyDialog = withStyles((theme: Theme) => ({
  paper: {
    [theme.breakpoints.down(600)]: {
      minHeight: '580px',
    },
  },
}))(Dialog);
interface UserDialogProps {
  onDialogClose: () => void;
  confirm: () => void;
  changeUserData: (value: IDialogUsers) => void;
  changeRoomData?: (value: IRoomCreateData) => void;
  open: boolean;
  onRoleChange: () => void;
  role: string;
  loading: (status: boolean) => void;
  addAvatar: (data: string) => void;
  userInfo: IDialogUsers;
  roomInfo?: IRoomCreateData;
  newGame: boolean;
}

export const UserDialog: FC<UserDialogProps> = ({
  onDialogClose,
  open,
  changeUserData,
  changeRoomData,
  confirm,
  onRoleChange,
  role,
  loading,
  addAvatar,
  userInfo,
  roomInfo,
  newGame,
}) => {
  const classes = useStyleDialog();

  return (
    <div>
      <MyDialog open={open} onClose={onDialogClose}>
        <Grid container className={classes.root} wrap="nowrap">
          <Grid item xl={9}>
            <DialogTitle>Connect to lobby</DialogTitle>
          </Grid>
          <Grid item xl={3} className={classes.rightPad}>
            <FormControlLabel
              className={classes.label}
              control={
                <Switch
                  checked={role === roles.observer ? true : false}
                  onChange={onRoleChange}
                  name="checkedB"
                  color="secondary"
                />
              }
              labelPlacement="start"
              label="Connect as Observer"
            />
          </Grid>
        </Grid>
        <DialogInputBlock
          changeUserData={changeUserData}
          userInfo={userInfo}
          newGame={newGame}
          changeRoomData={changeRoomData}
          roomInfo={roomInfo}
        />
        <DialogContent>
          <CreateAvatar loading={loading} addAvatar={addAvatar} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </MyDialog>
    </div>
  );
};
