import { ChangeEvent, FC, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { useStylesCreateIssuePopup } from '@styles/createIssuePopup.style';
import { ChangeIssueProps, IGameIssue } from 'utils/interfaces';
import { checkValidateIssue, generateErrorName } from '../lobbyDealerHelpers';

const ChangeIssuePopup: FC<ChangeIssueProps> = ({
  onIssueChangeClick,
  issueSelected,
  issues
}) => {
  const classes = useStylesCreateIssuePopup();
  const [ issue, setIssue ] = useState<IGameIssue>(issueSelected);
  const [ open, setOpen ] = useState(false);

  const changeIssue = () => {
    setOpen(false);
    onIssueChangeClick(issue);
    onClosePopup();
  };

  const onClosePopup = () => {
    setOpen(false);
    setIssue({ issueName: '', priority: '', issueDescription: ''});
  };

  const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
    setIssue((prev) => ({ ...prev, priority: e.target.value }));
  };

  const onChangeIssueName = (e: ChangeEvent<HTMLInputElement>) => {
    setIssue((prev) => ({ ...prev, issueName: e.target.value }));
  };

  const onChangeIssueDescription = (e: ChangeEvent<HTMLInputElement>) => { 
    setIssue((prev) => ({ ...prev, issueDescription: e.target.value }));
  };

  const onOpenPopup = () => {
    setOpen(true);
  };

  const disabled = checkValidateIssue(issue.issueName, issues);
  const errorInfo = generateErrorName(issue.issueName, issues)

  return (
    <div>
      <CreateIcon
        color="primary"
        className={classes.btn}
        onClick={onOpenPopup}
      />
      <Dialog
        open={open}
        onClose={changeIssue}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
          Change Issue
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Issue"
            fullWidth
            value={issue?.issueName}
            onChange={onChangeIssueName}
          />
          <FormControl className={classes.select}>
            <InputLabel htmlFor="issue">Priority:</InputLabel>
            <NativeSelect
              fullWidth
              value={issue?.priority}
              onChange={onChangePriority}
              inputProps={{
                name: 'issue',
              }}
            >
              <option value="low">Low</option>
              <option value="middle">Middle</option>
              <option value="hight">Hight</option>
            </NativeSelect>
            <FormHelperText>choose the priority of issue</FormHelperText>
          </FormControl>
          <TextField
            margin="dense"
            id="description"
            label="Issue description"
            fullWidth
            value={issue?.issueDescription}
            onChange={onChangeIssueDescription}
          />
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                onClick={changeIssue}
                color="primary"
                variant="contained"
                fullWidth
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={changeIssue}
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

export default ChangeIssuePopup;
