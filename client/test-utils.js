// fix the setImmediate usage for jest
import 'setimmediate';

if (!global.setImmediate) {
  global.setImmediate = setTimeout
};

import { useReducer } from 'react';
import { render } from "@testing-library/react";
// import '@testing-library/jest-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import AppContext, { appStore } from 'store/store';

import { appReducer } from 'store/reducer';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from 'utils/apiConfig';

export const socketIo = io(BASE_URL, {
  withCredentials: true,
  auth: {
    userId: '',
  },
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

socketIo.on('connect', () => {});
// socketIo.disconnect().connect();

if (process.env.NODE_ENV === 'test') {
  socketIo.disconnect();
  socketIo.close();
  socketIo.off('connect', () => {});

}

afterAll( () => socketIo.disconnect());

// jest.mock('socket.io-client', () => {
//   const mSocket = {
//     emit: jest.fn(),
//   };
//   return jest.fn(() => mSocket);
// });

// const ENDPOINT = 'localhost:5000';
//     const mockSocket = io(ENDPOINT, {
//         withCredentials: true,
//         auth: {
//           userId: '',
//         },
//         extraHeaders: {
//           'my-custom-header': 'abcd',
//         },
//       });

//     mockSocket.on('connect', () => {});
//     afterAll(() => mockSocket.close());

const initialValues = {
  // socket: mockSocket,
  socket: socketIo,
  userId: 'jkfl_5HJ',
  username: 'TestName',
  userSurname: 'TestSurname',
  avatar: '',
  roomId: 'jkjgh5df2FD',
  roomName: 'TestRoom',
  userRole: 'member',
  dealer: false,
};


// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }) => {
  // const [ state, dispatch ] = useReducer(appReducer, appStore);
  const [ state, dispatch ] = useReducer(appReducer, initialValues);
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ state, dispatch }}>      
        { children }
      </AppContext.Provider>
    </ThemeProvider>
    );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
