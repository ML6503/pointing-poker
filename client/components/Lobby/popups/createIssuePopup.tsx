import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useStylesCreateIssuePopup } from "@styles/createIssuePopup.style";
import { CreateIssuePopupProps } from "utils/interfaces";
import { checkValidateIssue, generateErrorName } from "../lobbyDealerHelpers";
import { issueErrorConfig } from "utils/configs";

const CreateIssuePopup: FC<CreateIssuePopupProps> = ({ onIssueCreate, issues }) => {
  const classes = useStylesCreateIssuePopup();
  const [priority, setPriority] = useState('low');
  const [issueName, setIssueName] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [ issueError, setIssueError ] = useState<string>('');
  const [ disabled, setDisabled ] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const createHandleClose = () => {
    setOpen(false);
    onIssueCreate({
      issueName,
      priority,
      issueDescription
    })
    setIssueName('');
    setIssueDescription('');
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  }

  const onChangeIssueName = (e: ChangeEvent<HTMLInputElement>) => {
    setIssueName(e.target.value);
  }

  const onChangeIssueDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setIssueDescription(e.target.value);
  }

  // const disabled = checkValidateIssue(issueName, issues);
  // const errorInfo = generateErrorName(issueName, issues);

  useEffect(
    () => {
      if (!issueName) {
        setIssueError(issueErrorConfig.noEntry);
        setDisabled(true);
      } else if (issues.find((issue) => issue.issueName === issueName)) {
        setIssueError(issueErrorConfig.existIssue);
        setDisabled(true);
      } else {
        setIssueError(issueErrorConfig.ok);
        setDisabled(false);
      }
    },
    [ issueName ],
  );

  return (
    <div data-testid="create-issue-popup">
      <AddIcon color="primary" onClick={handleClickOpen} className={classes.btn}>
        Create new Issue
      </AddIcon>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.container}
      >
        <DialogTitle id="form-dialog-title" style={{textAlign:'center'}}>Create Issue</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Issue"
            fullWidth
            value={issueName}
            onChange={onChangeIssueName}
            required
            error={disabled}
            helperText={issueError}
          />
          <FormControl className={classes.select}>
            <InputLabel htmlFor="issue">Priority:</InputLabel>
            <NativeSelect
              fullWidth
              value={priority}
              onChange={handleChangePriority}
              inputProps={{
                name: "issue",
              }}
            >
              <option value="low">Low</option>
              <option value="middle">Middle</option>
              <option value="high">High</option>
            </NativeSelect>
            <FormHelperText>choose the priority of issue</FormHelperText>
          </FormControl>
          <TextField
            margin="dense"
            id="description"
            label="Issue description"
            fullWidth
            value={issueDescription}
            onChange={onChangeIssueDescription}
          />
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Button onClick={createHandleClose} color="primary" variant="contained" fullWidth disabled={disabled}>
            Create
          </Button>
            </Grid>
            <Grid item xs={6}>
            <Button onClick={handleClose} color="primary" variant="outlined" fullWidth>
            Cancel
          </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateIssuePopup;