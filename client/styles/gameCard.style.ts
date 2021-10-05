import { makeStyles, Theme, createStyles, alpha } from '@material-ui/core';

export const useStylesGameCard = (props) =>
  makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: props.width,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
      },

      media: {
        height: '100%',
        width: '100%',
        borderRadius: 6,
      },
      avatar: {
        backgroundColor: 'transparent',
        border: '2px solid',
        borderColor: theme.palette.primary.main,
        marginRight: '-16px',
        marginBottom: 8,
        borderRadius: '10px',
      },
      avatarRoot: {
        width: 40,
        height: 30,
      },
      cardHeader: {
        padding: theme.spacing(0, 0.5),
      },
      paddingForButtons: {
        paddingTop: '19px'
      },
      cardContainer: {
        width: 'calc(100%)',
        height: props.ratio * props.width,
        position: 'relative',
        borderRadius: 10,
        backgroundColor: '#eee'
      },
      cardCover: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardCoverActive: {
        backgroundColor: alpha(theme.palette.primary.main, 0.4),
      },
      iconUnder: {
        backgroundColor: '#fff',
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
      },
      icon: {
        width: '100%',
        height: '100%',
      },
      emptyCardIcon: {
        fontSize: '4rem',
        color: theme.palette.primary.main,
        cursor: 'pointer',
        marginBottom: theme.spacing(1),
      },
      disabledCardIcon: {
        color: theme.palette.grey[500],
      }
    }),
  );
