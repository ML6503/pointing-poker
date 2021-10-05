import { actionTypes } from './reducer';

export const setRoom = (roomId: string | Array<string>, roomName: string) => {
  if (typeof roomId === 'string') {
    return {
      type: actionTypes.SET_ROOM,
      payload: {
        roomId,
        roomName
      },
    };
  }
};

export const setUserId = (id: string) => {
  return {
    type: actionTypes.SET_USER_ID,
    payload: id,
  };
};

export const setUserRole = (role: string) => {
  return {
    type: actionTypes.SET_USER_ROLE,
    payload: role,
  };
};

export const setDealer = (status: boolean) => {
  return {
    type: actionTypes.SET_DEALER,
    payload: status,
  };
};

export const setUsername = (username: string) => {
  return {
    type: actionTypes.SET_USER_NAME,
    payload: username,
  };
};

export const setUserSurname = (userSurname: string) => {
  return {
    type: actionTypes.SET_USER_SURNAME,
    payload: userSurname,
  };
};

export const setUserAvatar = (avatar: string) => {
  return {
    type: actionTypes.SET_USER_AVATAR,
    payload: avatar,
  };
};
