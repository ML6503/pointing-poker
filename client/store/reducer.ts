import { appStore } from './store';

export const actionTypes = {
  SOCKET_CONNECT: 'SOCKET_CONNECT',
  SET_USER_ID: 'SET_USER_ID',
  SET_ROOM: 'SET_ROOM',
  SET_USER_ROLE: 'SET_USER_ROLE',
  SET_DEALER: 'SET_DEALER',
  SET_USER_NAME: 'SET_USER_NAME',
  SET_USER_SURNAME: 'SET_USER_SURNAME',
  SET_USER_AVATAR: 'SET_USER_AVATAR',
};

export const appReducer = (state = appStore, action) => {
  switch (action.type) {
    case actionTypes.SOCKET_CONNECT:
      return { ...state, socket: action.payload };

    case actionTypes.SET_USER_ID:
      return { ...state, userId: action.payload };

    case actionTypes.SET_ROOM:
      return {
        ...state,
        roomId: action.payload.roomId,
        roomName: action.payload.roomName,
      };

    case actionTypes.SET_USER_ROLE:
      return { ...state, userRole: action.payload };

    case actionTypes.SET_DEALER:
      return { ...state, dealer: action.payload };

    case actionTypes.SET_USER_NAME:
      return { ...state, username: action.payload };

    case actionTypes.SET_USER_SURNAME:
      return { ...state, userSurname: action.payload };

    case actionTypes.SET_USER_AVATAR:
      return { ...state, avatar: action.payload };

    default:
      return state;
  }
};
