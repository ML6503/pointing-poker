import { DialogContent, TextField } from '@material-ui/core';
import { FC, useState } from 'react';
import { errorInfo } from 'utils/configs';
import { IDialogUsers, IRoomCreateData } from 'utils/interfaces';

interface DialogInputBlockProps {
  changeUserData: (value: IDialogUsers) => void;
  changeRoomData?: (value: IRoomCreateData) => void;
  userInfo: IDialogUsers,
  roomInfo?: IRoomCreateData,
  newGame: boolean;
}

export const DialogInputBlock: FC<DialogInputBlockProps> = ({
  changeUserData,
  changeRoomData,
  userInfo,
  roomInfo,
  newGame,
}) => {
  const [ nameErrorInfo, setNameErrorInfo ] = useState(errorInfo.nameError.bad);
  const [ surnameErrorInfo, setSurnameErrorInfo ] = useState(
    errorInfo.surnameError.bad,
  );
  const [ roomNameErrorInfo, setRoomNameErrorInfo ] = useState(
    errorInfo.roomNameError.bad,
  );
  const [ nameError, setNameError ] = useState(true);
  const [ surnameError, setSurnameError ] = useState(true);
  const [ roomNameError, setRoomNameError ] = useState(true);

  const onChangeInput = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    const newUserInfo = {
      ...userInfo,
      username: {
        ...userInfo.username
      },
      userSurname: {
        ...userInfo.userSurname
      },
    };

    if (targetName === 'username') {
      newUserInfo.username.nameData = targetValue;
      if (targetValue.length >= errorInfo.nameError.validator) {
        setNameErrorInfo(errorInfo.nameError.ok);
        setNameError(false);
        newUserInfo.username.statusData = true;
      } else {
        setNameErrorInfo(errorInfo.nameError.bad);
        setNameError(true);
        newUserInfo.username.statusData = false;
      }
    }
    if (targetName === 'userSurname') {
      newUserInfo.userSurname.nameData = targetValue;
      if (targetValue.length >= errorInfo.surnameError.validator) {
        setSurnameErrorInfo(errorInfo.surnameError.ok);
        setSurnameError(false);
        newUserInfo.userSurname.statusData = true;
      } else {
        setSurnameErrorInfo(errorInfo.surnameError.bad);
        setSurnameError(true);
        newUserInfo.userSurname.statusData = false;
      }
    }
    if(roomInfo) {
      const newRoomInfo = {
        ...roomInfo,
        room: {
          ...roomInfo.room,
        }
      }
  
      if (targetName === 'roomName') {
        newRoomInfo.room.roomName = targetValue;
        if (targetValue.length >= errorInfo.roomNameError.validator) {
          setRoomNameErrorInfo(errorInfo.roomNameError.ok);
          setRoomNameError(false);
          newRoomInfo.statusData = true;
        } else {
          setRoomNameErrorInfo(errorInfo.roomNameError.bad);
          setRoomNameError(true);
          newRoomInfo.statusData = false;
        }
      }
      changeRoomData(newRoomInfo);
    }
    changeUserData(newUserInfo);
    
    
  };

  return (
    <>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          name="username"
          onChange={(e) => onChangeInput(e)}
          error={nameError}
          helperText={nameErrorInfo}
          data-testid="name-create-input"
        />
        <TextField
          margin="dense"
          label="Surname"
          type="text"
          fullWidth
          name="userSurname"
          onChange={(e) => onChangeInput(e)}
          error={surnameError}
          helperText={surnameErrorInfo}
          data-testid="surname-create-input"
        />
        {newGame && (
          <TextField
          margin="dense"
          label="Room Name"
          type="text"
          fullWidth
          name="roomName"
          onChange={(e) => onChangeInput(e)}
          error={roomNameError}
          helperText={roomNameErrorInfo}
          data-testid="room-create-input"
        />
        )}
      </DialogContent>
    </>
  );
};
