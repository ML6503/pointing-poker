import { makeStyles } from "@material-ui/core";

const useStylesUserCard = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    width: '300px',
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)'
  },
  avatar: {
    height: '60px',
    width: '60px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#60dabf',
    boxShadow: 'inset 0px 1px 3px rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: 0,
    marginRight: '10px'
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
    fontSize:'28px',
    fontWeight: 700,
    lineHeight: '3.5em',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    color: '#fff',
  },
  icon: {
    fontSize: '30px'
  }
});

export default useStylesUserCard;
