import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import { useStylesGameResultsPopup } from "@styles/gameResultsPopup.style";
import { IGameResultPopupProps } from "utils/interfaces";
import GameResultTable from "../gameResultTable";
import ExportCSV from "../exportCSV";

const GameResultPopup: FC<IGameResultPopupProps> = ({
  onLeaveRoom,
  gameIssues,
}) => {
  const classes = useStylesGameResultsPopup();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
    console.log(gameIssues)
  };

  const exportFile = () => {
    setOpen(false);
    console.log("export");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLeaveRoomInPopup = () => {
    onLeaveRoom();
  };

  return (
    <div>
      <Box boxShadow={2} mr={10}>
        <Button
          variant="outlined"
          className={classes.btn}
          onClick={handleClickOpen}
        >
          Stop Game
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.contrainerResultsPopup}
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Game results
        </DialogTitle>
        <DialogContent>
          <GameResultTable issues={gameIssues} />
        </DialogContent>
        <DialogActions className={classes.btnsContainer}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ExportCSV issues={gameIssues}/>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={onLeaveRoomInPopup}
                color="primary"
                variant="outlined"
                fullWidth
              >
                Leave room
              </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                  onClick={handleClose}
                  color="primary"
                  variant="outlined"
                  fullWidth
                >
                  Cancel
                </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GameResultPopup;
