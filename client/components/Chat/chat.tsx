import { Button, Grid, Input } from '@material-ui/core';
import useStylesChat from '@styles/chat.style';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { setRoom, setUserId } from 'store/actionCreators';
import AppContext from 'store/store';
import { IChatMessage } from 'utils/interfaces';
import appStorage from 'utils/storage';
import { ChatMessages } from './chatMessages';

interface ChatProps {
  chatMessages: Array<IChatMessage>;
}

export const Chat: FC<ChatProps> = ({ chatMessages }) => {
  const classes = useStylesChat();
  const { state, dispatch } = useContext(AppContext);
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState(chatMessages);
  const router = useRouter();

  const onSendClick = async () => {
    if (message) {
      if (!state.userId) {
        console.log('userId: ', state.userId);
        await dispatch(setUserId(appStorage.getSession()));
      }
      if (!state.roomId) {
        console.log('roomId: ', state.roomId);
        await dispatch(setRoom(router.query.lobby, ''));
      }
      state.socket.emit('sendMessage', {
        roomId: state.roomId,
        userId: state.userId,
        message,
      });
      setMessage('');
    }
  };

  const onSendEnter = async (e) => {
    if (message && e.key === 'Enter') {
      if (!state.userId) {
        await dispatch(setUserId(appStorage.getSession()));
        console.log('userId: ', state.userId);
      }
      if (!state.roomId) {
        await dispatch(setRoom(router.query.lobby, ''));
        console.log('roomId: ', state.roomId);
      }

      state.socket.emit('sendMessage', {
        roomId: state.roomId,
        userId: state.userId,
        message,
      });
      setMessage('');
    }
  };

  state.socket.on('chatMessage', (message) => {
    setMessages(message);
  });

  return (
    <div className={classes.container}>
      <Grid
        item
        container
        direction="column"
        wrap="nowrap"
        className={classes.chatMessages}
      >
        {messages && <ChatMessages messages={messages} />}
      </Grid>
      <Grid container wrap="nowrap">
        <div className={classes.inputField}>
          <Input
            placeholder="Your message..."
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => onSendEnter(e)}
            value={message}
          />
        </div>
        <div className={classes.noShrink}>
          <Button onClick={onSendClick}>Send</Button>
        </div>
      </Grid>
    </div>
  );
};
