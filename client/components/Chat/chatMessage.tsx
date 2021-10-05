import { Grid, Typography } from '@material-ui/core';
import { IChatMessage } from 'utils/interfaces';
import { ChatUser } from './chatUser';

interface ChatMessageProps {
  message: IChatMessage;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <Grid item key={message.user.id}>
      <ChatUser message={message} />
      <Typography>{message.message}</Typography>
    </Grid>
  );
};
