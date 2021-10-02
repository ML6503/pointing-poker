import React, { FC, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import {  FormHelperText } from "@material-ui/core";
import { useStylesSequenceIssuePopup } from "@styles/createSequencePopup.style";
import { CreateSequencePopupProps } from "utils/interfaces";
import { seqLength, sequenceErrorConfig } from "utils/configs";
import { OneSequenceInput } from "./oneSequenceInput";


const CreateSequencePopup: FC<CreateSequencePopupProps> = ({
    sequence,
    setSequence,
    openSequenceCreate,
    setOpenSequenceCreate,
  }) => {
  const classes = useStylesSequenceIssuePopup();  
  const [ sequenceError, setSequenceError ] = useState<string>('');
  const [ disabled, setDisabled ] = useState(true);

  const correctCustomSequence = sequence.every(val => /(?!999$)^[^\s]{1,3}$/g.test(val.toString()));
  
  const createHandleClose = () => {    
    if(!correctCustomSequence){
      setSequenceError(sequenceErrorConfig.notAllEntryValidator);
      setDisabled(true);
 
    } else {  
      setOpenSequenceCreate(false);  
    }
  };

  const handleClose = () => {
    setOpenSequenceCreate(false);
  };

  useEffect(() => {
    if (correctCustomSequence) {
      setSequenceError(sequenceErrorConfig.ok);
      setDisabled(false);
    } else {
      setSequenceError(sequenceErrorConfig.noEntry);
      setDisabled(true);
    }
  }, [sequence, sequenceError]);

  return (
    <div>
      <Dialog open={openSequenceCreate} onClose={handleClose}>
        <div className={classes.container}>
          <DialogTitle id='form-dialog-title' style={{ textAlign: 'center' }}>
            Create Custom Sequence
          </DialogTitle>
          <FormHelperText
            id='component-helper-text'
            className={classes.errorText}
          >
            {sequenceError}
          </FormHelperText>
          <DialogContent className={classes.sequenceWrapper}>
            <Grid container justifyContent='center'>
              {Array.from(Array(seqLength).keys()).map((item) => (
                <OneSequenceInput
                  key={item}
                  item={item}
                  sequence={sequence}
                  setSequence={setSequence}
                  sequenceError={sequenceError}
                  setSequenceError={setSequenceError}
                />
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justifyContent='center'>
              <Grid item xs={3}>
                <Button
                  onClick={createHandleClose}
                  color='primary'
                  variant='contained'
                  fullWidth
                  disabled={disabled}
                >
                  Create
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={handleClose}
                  color='primary'
                  variant='outlined'
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateSequencePopup;
