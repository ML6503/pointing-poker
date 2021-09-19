import { GamePage } from 'components/Game/gamePage';
import { FC } from 'react';
import { apiGetLobbyUsers, apiStartGame } from 'services/apiServices';
import { IApiStartGame, IUser } from 'utils/interfaces';

interface GameProps {
  gameData: IApiStartGame,
  userData: Array<IUser>
  errorStatus: string
}

const Game: FC<GameProps> = ({ gameData, userData, errorStatus }) => {
  return <GamePage gameData={gameData} userData={userData} errorStatus={errorStatus} />;
};

export const getServerSideProps = async (context) => {
  const { lobby } = context.params;

  try {
    const userData = await apiGetLobbyUsers(lobby);
    const gameData = await apiStartGame(lobby);
    if (userData.status === 200 && gameData.status === 200) {
      if (typeof userData.data === 'string') {
        return {
          props: {
            userData: [],
            gameData: null,
            errorStatus: 'no users'
          }
        }
      }
      return {
        props: {
          userData: userData.data,
          gameData: gameData.data,
          errorStatus: 'no errors'
        }
      }
    }
  } catch {
    return {
      // redirect: {
      //   destination: '/404',
      // permanent: false,
      // },
      props: {
        userData: [],
        gameData: null,
        errorStatus: 'no room'
      },
    }
  }
};

export default Game;
