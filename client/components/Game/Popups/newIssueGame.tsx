import { FC, useEffect, useState } from 'react';
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
import { useStylesCreateIssuePopup } from '@styles/createIssuePopup.style';
import { NewIssueGamePopupProps } from 'utils/interfaces';
import {
  checkValidateIssue,
  generateErrorName,
} from 'components/Lobby/lobbyDealerHelpers';
import { issueErrorConfig } from 'utils/configs';

export const NewIssueGamePopup: FC<NewIssueGamePopupProps> = ({
  onIssueCreate,
  isOpen,
  onAddCloseIssue,
  issues,
}) => {
  const classes = useStylesCreateIssuePopup();
  const [ priority, setPriority ] = useState('low');
  const [ issueName, setIssueName ] = useState('');
  const [ issueDescription, setIssueDescription ] = useState('');
  const [ issueError, setIssueError ] = useState<string>('');
  const [ disabled, setDisabled ] = useState(true);

  const onCreateClick = () => {
    onIssueCreate({
      issueName,
      priority,
      issueDescription,
    });
    setIssueName('');
    setIssueDescription('');
    setDisabled(false);
  };

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
    <div>
      <Dialog open={isOpen} onClose={onAddCloseIssue} className={classes.container}>
        <DialogTitle style={{ textAlign: 'center' }}>Create Issue</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="issueName"
            label="Issue"
            type="text"
            fullWidth
            value={issueName}
            onChange={(e) => setIssueName(e.target.value)}
            error={disabled}
            helperText={issueError}
          />
          <FormControl className={classes.select}>
            <InputLabel htmlFor="issue">Priority:</InputLabel>
            <NativeSelect
              fullWidth
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              inputProps={{
                name: 'issue',
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
            name="issueDescription"
            label="Issue description"
            type="text"
            fullWidth
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                onClick={onCreateClick}
                color="primary"
                variant="contained"
                fullWidth
                disabled={disabled}
              >
                Create
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={onAddCloseIssue}
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
