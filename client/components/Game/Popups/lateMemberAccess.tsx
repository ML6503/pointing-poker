import {
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { FC } from 'react';
import { ILatePlayer } from 'utils/interfaces';

interface LateMemberAccessProps {
  requestToJoin: boolean;
  lateMember: ILatePlayer;
  onAllow: (lateMember: ILatePlayer) => void;
  onRoomLeaveLateMember: (lateMember: ILatePlayer) => void;
  classBtn: string;
}

export const LateMemberAccess: FC<LateMemberAccessProps> = ({
  requestToJoin,
  lateMember,
  onAllow,
  onRoomLeaveLateMember,
  classBtn,
}) => (
  <Dialog
    open={requestToJoin}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle id='alert-dialog-title'>
      {`Member ${lateMember.username} ${lateMember.userSurname} is asking your authorization to join.`}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id='alert-dialog-description' align='center'>
        Do you agree to let this late member in?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Grid container justifyContent='space-around'>
        <Box boxShadow={4} mb={1}>
          <Button className={classBtn} onClick={() => onAllow(lateMember)}>
            YES
          </Button>
        </Box>
        <Box boxShadow={4} mb={1}>
          <Button className={classBtn} onClick={() => onRoomLeaveLateMember(lateMember)}>
            NO
          </Button>
        </Box>
      </Grid>
    </DialogActions>
  </Dialog>
);
