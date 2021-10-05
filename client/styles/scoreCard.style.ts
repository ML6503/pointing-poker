import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStylesUserCard = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
      maxHeight: '56px',
      width: '90%',
      maxWidth: 250,
      boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
    },
  }),
);

export default useStylesUserCard;
