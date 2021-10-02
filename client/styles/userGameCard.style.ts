import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStylesUserGameCard = makeStyles((theme: Theme) => 
createStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
    width: '90%',
    maxWidth: 250,
    maxHeight: '56px',
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)'
  },
  avatar: {
    height: '40px',
    width: '40px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'inset 0px 1px 3px rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: 0,
    marginRight: '5px',
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
    fontSize:'16px',
    fontWeight: 500,
    lineHeight: '2em',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    color: '#fff',
  },
  avatarObserver: {
    borderColor: theme.palette.secondary.main,
  },
  icon: {
    fontSize: '30px'
  },
  iconScore: {
    fontSize: '15px'
  },
  dealerName: {
    width: '75%',
    textAlign: 'left'
  },
  containerDealer: {
    justifyContent: 'flex-start',
  },
}));

export default useStylesUserGameCard;
