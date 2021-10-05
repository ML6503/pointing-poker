import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

interface ErrorPopupProps {
  message: string;
  isOpen: boolean;
  onClosePopup: () => {}
}

export const ErrorPopup = ({ message, isOpen, onClosePopup }) => {
  const [ open, setOpen ] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    onClosePopup()
    setOpen(false);
  };

  useEffect(
    () => {
      setOpen(isOpen);
    },
    [ isOpen ],
  );

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => {}}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Something's going wrong..."}
        </DialogTitle>
        <DialogContent>
          {message && <DialogContentText>{message}</DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
