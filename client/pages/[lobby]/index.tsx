import Lobby from 'components/Lobby/lobby';
import { FC } from 'react';
import { apiGetLobbyChats, apiGetLobbyUsers } from 'services/apiServices';
import { IApiGetLobbyInfo } from 'utils/interfaces';

interface LobbyPageProps {
  lobbyInfo: IApiGetLobbyInfo
}

const LobbyPage: FC<LobbyPageProps> = ({lobbyInfo}) => {
  return (
    <Lobby lobbyInfo={lobbyInfo} />
  );
};

export const getServerSideProps = async (context) => {
  const { lobby } = context.params;

  try {
    const users = await apiGetLobbyUsers(lobby);
    const chat = await apiGetLobbyChats(lobby);
    if(users.status === 200 && chat.status === 200) {
      if( typeof users.data === 'string' ) {
        return {
          props: {
            lobbyInfo: {
              users: [],
              chat: [],
              error: 'no users'
            }
          }
        }
      }
      return {
        props: {
          lobbyInfo: {
            users: users.data,
            chat: chat.data,
            error: 'no errors'
          }
        }
      }
    }
  } catch {
    return {
      props: {
        lobbyInfo: {
          users: [],
          chat: [],
          error: 'no room'
        }
      }
    }
  }
};


export default LobbyPage;
