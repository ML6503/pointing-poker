import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStylesUserCard = makeStyles((theme: Theme) => 
createStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    width: '300px',
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)'
  },
  containerScore: {
    width: '92%',
    height: '50px',   
    alignItems: 'center',
    padding: '1px'
  },
  avatar: {
    height: '60px',
    width: '60px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'inset 0px 1px 3px rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: 0,
    marginRight: '10px',
    border: '3px solid',
    borderColor: theme.palette.primary.main,
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
  avatarObserver: {
    borderColor: theme.palette.secondary.main,
  },
  avatarScore: {
    height: '40px',
    width: '40px',
  },
  icon: {
    fontSize: '30px'
  },
  iconScore: {
    fontSize: '15px'
  },
  containerDealer: {
    justifyContent: 'flex-start',
  },
  dealerName: {
    width: '75%',
    textAlign: 'left'
  },
  userName: {
    width: '55%',
    textAlign: 'left'
  }
}));

export default useStylesUserCard;
