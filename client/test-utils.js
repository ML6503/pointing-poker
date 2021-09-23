import { useReducer } from 'react';
import { render } from "@testing-library/react";
// import '@testing-library/jest-dom';
import 'mutationobserver-shim';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import AppContext, { appStore } from 'store/store';

import { appReducer } from 'store/reducer';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from 'utils/apiConfig';

const socketIo = io(BASE_URL, {
  withCredentials: true,
  auth: {
    userId: '',
  },
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

socketIo.on('connect', () => {});
socketIo.disconnect().connect();

const initialValues = {
  socket: socketIo,
  userId: 'jkfl_5HJ',
  username: 'TestName',
  userSurname: 'TestSurname',
  avatar: '',
  roomId: 'fo_rt99FF',
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
