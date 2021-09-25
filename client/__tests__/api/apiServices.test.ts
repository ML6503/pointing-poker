
import { BASE_URL } from 'utils/apiConfig';
import { apiGetLobbyUsers, apiGetLobbyChats, apiGetRooms, apiStartGame, apiCreateGame } from '../../services/apiServices';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('api methods check', () => {
    const room = 'dkfsl_F5ddd';
    const chatUrl = `${BASE_URL}/chats/dkfsl_F5ddd`;    
    const mockRoomData = ['FDTff_56DASddqaer'];
    
    test('apiGetLobbyUsers', async () => { 
        const mockUsersData = ['dfdf_9ASdd'];
          await apiGetLobbyUsers(room);
          mockedAxios.get.mockRejectedValue(null);
          mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockUsersData));
    });

    test('apiGetLobbyChats', async () => {
        const mockChat = {
            data: [],
            status: 200,
            statusText: 'OK',           
            headers: {},
            config: { url: chatUrl, method: 'get', withCredentials: false, upload: XMLHttpRequestUpload, headers: {Accept: 'application/json, text/plain, */*'} },
            request: XMLHttpRequest,
        }; 
        await apiGetLobbyChats(room);
        mockedAxios.get.mockRejectedValue(null);
        mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockChat));
  });

  test('apiGetRooms', async () => { 
    const mockRoomsData = ['FDTff_56DASddqaer', '12FDT-DfffPxcsgf'];
  
      await apiGetRooms();
      mockedAxios.get.mockRejectedValue(null);
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockRoomsData));
});

    test('apiStartGame', async () => { 
        const mockGameInitData = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        await apiStartGame(mockRoomData);
        mockedAxios.get.mockRejectedValue(null);
        mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockGameInitData));
    });

    test('apiCreateGame', async () => { 
        const gameMockSettings = {
            sprintName: '123',
            issues: [{issueName: '',priority: 'law', issueDescription: 'blah-blah' } ],
            timer: {isTimer: true, time: 1235},
            card: {cardDeck: 'Surr', sequence: 'Fibonacci', cardNumber: 5, cardNumberStart: 2, cardTurn: true},
            isAutoJoin: false,
            isStarted: true
        };
        const mockUsersData = ['dfdf_9ASdd'];
        await apiCreateGame(mockRoomData, gameMockSettings);
        mockedAxios.get.mockRejectedValue(null);
        mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockUsersData));
    });
});
