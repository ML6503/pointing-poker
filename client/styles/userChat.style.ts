import { makeStyles } from '@material-ui/core';

const useStylesUserChat = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5px 0',
    width: '100%',
  },
  avatar: {
    height: '30px',
    width: '30px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#60dabf',
    boxShadow: 'inset 0px 1px 3px rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: 0,
    marginRight: '10px',
  },
  avatarImg: {
    height: '100%',
    width: '100%',
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  avatarText: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '18px',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    color: '#fff',
  },
});

export default useStylesUserChat;
