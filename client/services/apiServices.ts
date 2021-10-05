import axios from 'axios';
import {
  IGameSettings,
  IRoomInfo,
} from 'utils/interfaces';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const apiGetLobbyUsers = async (room: string | Array<string>) => {
  if (typeof room === 'string') {
    const users = await axios({
      method: 'GET',
      url: `/users/${room}`,
    });
    return users;
  }
  return null;
};

export const apiGetLobbyChats = async (room: string | Array<string>) => {
  if (typeof room === 'string') {
    const chat = await axios({
      method: 'GET',
      url: `/chats/${room}`,
    });
    return chat;
  }
  return null;
};

export const apiGetRooms = async () => {
  const rooms = await axios({
    method: 'GET',
    url: `/rooms`,
  });
  return rooms;
};

export const apiStartGame = async (room: string | Array<string>) => {
  if (typeof room === 'string') {
    const gameInitData = await axios({
      method: 'GET',
      url: `/gamestart/${room}`,
    });
    return gameInitData;
  }
  return null;
};

export const apiCreateGame = async (
  room: string | Array<string>,
  data: IGameSettings,
) => {
  if (typeof room === 'string') {
    const users = await axios({
      method: 'POST',
      url: `/gamestart/${room}`,
      data: data,
    });
  }
};

export const apiCreateRoom = async (config: {data: IRoomInfo}): Promise<string> => {
  const createRoom = await axios({
    method: 'POST',
    url: `/rooms`,
    data: config,
  });
  return createRoom.data;
};
