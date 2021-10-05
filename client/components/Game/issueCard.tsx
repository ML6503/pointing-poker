import { FC, useContext, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { useStylesIssueCard } from '@styles/issueCard.style';
import { Grid, Theme, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import AppContext from 'store/store';


const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}))(Tooltip);
interface IssueCardProps {
  issueName: string;
  priority: string;
  issueDescription?: string;
  activeIssueName?: string;
  onIssueClick?: (issueName: string) => void;
  addIssue: boolean;
  onAddIssue?: () => void
  score: number;
  amendedScore?: number
  onAmendScore?: () => void
}

export const IssueCard: FC<IssueCardProps> = ({
  issueName,
  priority,
  issueDescription,
  activeIssueName,
  onIssueClick,
  addIssue,
  onAddIssue,
  score,
  amendedScore,
  onAmendScore,
}) => {
  const classes = useStylesIssueCard();
  const { state } = useContext(AppContext);
  const [tooltip, setTooltip] = useState('');
  const activeCard = clsx(classes.root, activeIssueName === issueName && classes.activeCard);
  const activeText = clsx(classes.text, activeIssueName === issueName && classes.activeCard);

  useEffect(() => {
    if(addIssue) {
      setTooltip(issueName)
    } else {
      if(issueDescription) {
        setTooltip(`${issueDescription}`)
      } else setTooltip(`Issue: ${issueName}`)
      
    }
  }, [])

  return (
    <LightTooltip  title={tooltip} placement="bottom-end">
    <Card
      className={activeCard}
      onClick={!addIssue ? () => onIssueClick(issueName) : null}
    >
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <div className={classes.block}>
          <Typography
            className={activeText}
            variant="h6"
          >
            {issueName === 'Create New Issue' ? (
              issueName
            ) : (
              `Issue: ${issueName}`
            )}
          </Typography>
          {priority && (
            <Typography color="textSecondary" variant="subtitle2">
              Priority: {priority}
            </Typography>
          )}
        </div>
        <div className={classes.blockScore} onClick={score && state.dealer ? onAmendScore : null}>
          {!(issueName === 'Create New Issue') && (
            <>
              <Typography
                className={activeText}
                variant="h6"
                align="right"
              >
                Score
              </Typography>
              <Typography color="textSecondary" variant="h5" align="center">
                {amendedScore ? amendedScore : score ? score : '-'}
              </Typography>
            </>
          )}
        </div>
      </Grid>
      {addIssue && (
        <CardActions>
          <Button size="large" onClick={onAddIssue}>
            <AddIcon />
          </Button>
        </CardActions>
      )}
    </Card>
    </LightTooltip>
  );
};
