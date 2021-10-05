import { ChatMessages } from './../components/Chat/chatMessages';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStylesChat = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: '10px',
      paddingRight: '10px',
      paddingLeft: '5px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    messagesWrapper: {
      height: '100%',
    },
    inputBox: {
      paddingRight: '5px',
      display: 'flex',
      alignItems: 'center',
    },
    inputField: {
      width: '100%',
    },
    noShrink: {
      flexShrink: 0,
    },
    chatMessages: {
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#60dabf',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#8fe4d1',
      },

      '&::-webkit-scrollbar-track': {
        backgroundColor: '#ccc',
      },

      '&::-webkit-scrollbar-track:hover': {
        backgroundColor: '#eee',
      },
    },
  }),
);

export default useStylesChat;
