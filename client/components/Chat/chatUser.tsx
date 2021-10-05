import { Typography } from '@material-ui/core';
import useStylesUserChat from '@styles/userChat.style';
import { IChatMessage } from 'utils/interfaces';

interface ChatUserProps {
  message: IChatMessage;
}

export const ChatUser = ({ message}: ChatUserProps) => {
  const classes = useStylesUserChat();
  const {avatar, username, userSurname} = message.user;

  return (
    <div className={classes.container}>
      <div className={classes.avatar}>
        {avatar && (
          <div
            className={classes.avatarImg}
            style={{ backgroundImage: `url(${avatar})` }}
          />
        )}
        {!avatar && <>
          <div className={classes.avatarText}>
              {username[0]}
            </div>
            <div className={classes.avatarText}>
              {userSurname[0]}
            </div>
        </>
          }
      </div>
      <Typography variant='subtitle2'>{username}</Typography>
    </div>
  );
};
