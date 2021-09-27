import { ChangeEvent, FC, useState } from 'react';
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useStylesIssueList } from '@styles/issueList.style';
import CreateIssuePopup from './popups/createIssuePopup';
import ChangeIssuePopup from './popups/changeIssuePopup';
import { IGameIssue, IssueListProps } from 'utils/interfaces';

const IssueList: FC<IssueListProps> = ({
  onIssueCreate,
  onIssueDelete,
  onIssueEdit,
  issues,
}) => {
  const classes = useStylesIssueList();
  const [ issueSelected, setIssueSelected ] = useState<IGameIssue>();

  const onIssueSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const issue = e.target.value;
    const issueFound = issues.find((iss) => iss.issueName === issue);
    if (issueFound) {
      setIssueSelected(issueFound);
    }
  };

  const onIssueChangeClick = (changedIssue: IGameIssue) => {
    const issueIndex = issues.findIndex(
      (issue) => issue.issueName === issueSelected.issueName,
    );
    const newIssues = [ ...issues ];
    newIssues.splice(issueIndex, 1, changedIssue);
    onIssueEdit(newIssues);
    setIssueSelected({ issueName: '', priority: '', issueDescription: '' });
  };

  const onIssueDeleteClick = () => {
    const issueIndex = issues.findIndex(
      (issue) => issue.issueName === issueSelected.issueName,
    );
    const newIssues = [ ...issues ];
    newIssues.splice(issueIndex, 1);
    onIssueDelete(newIssues);
    setIssueSelected({ issueName: '', priority: '', issueDescription: '' });
  };

  return (
    <Grid item container spacing={2} justifyContent="center">
      <Typography variant="h5" gutterBottom className={classes.title}>
        Issues:
      </Typography>
      <Grid container item>
        <Grid container item className={classes.issueList}>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-issue">Issues:</InputLabel>
            <Select
              labelId="select-issue"
              value={
                issueSelected && issueSelected.issueName ? (
                  issueSelected.issueName
                ) : (
                  ''
                )
              }
              onChange={onIssueSelect}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {issues &&
                issues.map((issue) => (
                  <MenuItem value={issue.issueName} key={issue.issueName}>
                    {issue.issueName}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>select an issue to edit</FormHelperText>
          </FormControl>
        </Grid>
        <Grid
          container
          item
          className={classes.gap}
          alignContent="center"
          xs={6}
        >
          <Grid item>
            <CreateIssuePopup onIssueCreate={onIssueCreate} issues={issues} />
          </Grid>
          <Grid item>
            <ClearIcon
              color="error"
              onClick={onIssueDeleteClick}
              className={classes.deleteButton}
            />
          </Grid>
          <Grid item>
            {issueSelected &&
            issueSelected.issueName && (
              <ChangeIssuePopup
                onIssueChangeClick={onIssueChangeClick}
                issueSelected={issueSelected}
                issues={issues}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IssueList;
