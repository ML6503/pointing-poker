import React, { FC, useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import { Typography, TextField, Grid } from '@material-ui/core';
import { useStylesSettingsGame } from '@styles/settings.style';

interface NameGameProps {
  onSprintNameChange: (sprintName: string) => void;
  issues: Array<string>;
}

const NameGame: FC<NameGameProps> = ({ onSprintNameChange, issues }) => {
  const classes = useStylesSettingsGame();
  const [editMode, setEditMode] = useState(false);
  const [sprintName, setSprintName] = useState('');

  const deactivateEditMode = () => {
    setEditMode(false);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onChangeConfirm = () => {
    onSprintNameChange(sprintName);
    deactivateEditMode();
  };

  return (
    <Grid container spacing={2}>
      {!editMode && (
        <Grid
          container
          item
          xs={12}
          justifyContent='center'
          alignItems='center'
        >
          <Grid item>
            <Typography variant='h6' align='left'>
              Sprint:{' '}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.gameName}
              variant='h5'
              onClick={activateEditMode}
            >
              {sprintName}
            </Typography>
          </Grid>
          <Grid item>
            <CreateIcon
              className={classes.icon}
              color='primary'
              onClick={() => setEditMode(true)}
            />
          </Grid>
          <Grid>
            <Typography variant='h6' align='left'>
              (issues {issues && issues.join(', ')})
            </Typography>
          </Grid>
        </Grid>
      )}
      {editMode && (
        <Grid
          container
          item
          xs={12}
          justifyContent='center'
          alignItems='center'
        >
          <TextField
            autoFocus
            value={sprintName}
            type='number'
            onChange={(e) => setSprintName(e.target.value)}
            style={{ width: '80px' }}
          />
          <CheckIcon
            className={classes.icon}
            color='primary'
            onClick={onChangeConfirm}
            style={{ marginLeft: '10px' }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default NameGame;
