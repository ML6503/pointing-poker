import { IUserCreate } from './interfaces';

export const userCreate = (
  roomId: string | Array<string>,
  roomName: string,
  username: string,
  userSurname: string,
  avatar: string,
  userId: string,
  userRole: string,
  dealer: boolean,
): IUserCreate => {
  if (typeof roomId === 'string') {
    return {
      room: {
        roomId,
        roomName
      },
      user: {
        username,
        userSurname,
        avatar: avatar,
        id: userId,
        userRole,
        dealer,
      },
    };
  }
  return null;
};