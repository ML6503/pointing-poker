import { Grid } from '@material-ui/core';
import useStylesChat from '@styles/chat.style';
import { FC } from 'react';
import { IChatMessage } from 'utils/interfaces';
import { ChatMessage } from './chatMessage';
import { nanoid } from 'nanoid';

interface ChatMessagesProps {
  messages: Array<IChatMessage>;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ messages }) => {
  const classes = useStylesChat();

  return (
    <div data-testid="message-section">
      {messages &&
        messages.map((message) => (
          <Grid item key={nanoid()}>
            <ChatMessage message={message} />
          </Grid>
        ))}
    </div>
  );
};
