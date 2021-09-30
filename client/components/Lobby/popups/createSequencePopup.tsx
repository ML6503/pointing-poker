import React, { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";

import { useStylesCreateIssuePopup } from "@styles/createIssuePopup.style";
import { CreateIssuePopupProps } from "utils/interfaces";
import { issueErrorConfig, maxCardNumber, sequenceErrorConfig } from "utils/configs";


export interface CreateSequencePopupProps {
  // onSequenceCreate: (sequence: number[]) => void;
  openSequenceCreate: boolean;
  setOpenSequenceCreate: Dispatch<SetStateAction<boolean>>;
  sequence: number[];
  setSequence: Dispatch<SetStateAction<number[]>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      inputNumWrapper: {
      padding: 0
    },
    sequenceWrapper: {
      margin: '6px 0 ',
      // minWidth: 120,
    },
    inputNum: {
     padding: theme.spacing(4),
      minWidth: 120,
      textAlign: 'center',
    },
    container: {
      // width: '500px',
      // width: '70%',  
      margin: '0 auto',
      // padding: '5px 0',
      [theme.breakpoints.down(500)]: {
        width: '320px',
      },
    },
  }),
);

const CreateSequencePopup: FC<CreateSequencePopupProps> = ({ sequence, setSequence, openSequenceCreate, setOpenSequenceCreate }) => {
  const classes = useStyles();
  const [ sequenceError, setSequenceError ] = useState<string>('');
  const [ disabled, setDisabled ] = useState(true);

  const createHandleClose = () => {    
    if(sequence.includes(999)){
      setSequenceError(sequenceErrorConfig.noEntry);
      setDisabled(true);
    } else {     
      // onSequenceCreate(sequence);
      setOpenSequenceCreate(false);
    }
  };

  const handleClose = () => {
    setOpenSequenceCreate(false);
  }


  const createNewSequence = (index: string, value: string ) => {
    const updatedSeq = [...sequence];
    updatedSeq[Number(index)] = Number(value);
    setSequence(updatedSeq);
  };

  const onHandleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const index = evt.target.name;
    const newValue = evt.target.value;
    createNewSequence(index, newValue)
  };

  useEffect(
    () => {
      // if (!sequence) {
        console.log('sequence error ', !sequence.includes(999));
        if(!sequence.includes(999)){
          setSequenceError(sequenceErrorConfig.ok);
          setDisabled(false);
      } else {       
        setSequenceError(sequenceErrorConfig.noEntry);
        setDisabled(true); 
      }
    },
    [ sequence ],
  );
    console.log('sequence ', sequence);
  return (
    <div >
      <Dialog
        open={openSequenceCreate}
        onClose={handleClose}
        className={classes.container}
      >
        <DialogTitle id="form-dialog-title" style={{textAlign:'center'}}>Create Custom Sequence</DialogTitle>
        <FormHelperText id="component-helper-text" style={{textAlign:'center'}}>
          {sequenceError}
        </FormHelperText>
        <DialogContent className={classes.sequenceWrapper}>
        <Grid container spacing={5} justifyContent="center">
        {Array.from(Array(maxCardNumber + 1).keys()).map(item => (
            <Grid item xs={1} className={classes.inputNumWrapper}>
            <TextField
            // type={"number"}
            variant="outlined"
            size="small"
            // margin="normal"
            autoFocus={item === 0 ? true : false }
            // margin="none"
            name={item.toString()}
            id={item.toString()}
            // label="Issue"
            // fullWidth
            // value={sequence[item]}
            onChange={onHandleInput}
            required
            // placeholder={'1-500'}
            error={disabled}            
            // helperText={item === 0 ? sequenceError : ''}
            InputProps={{ inputProps: { min: 1,  max: 500, pattern: "[0-9]*" }, style: { textAlign: 'center', padding: 0 } }}
            className={classes.inputNum}
          />
          </Grid>)
        )}        
        </Grid>
          
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={3}>
            <Button onClick={createHandleClose} color="primary" variant="contained" fullWidth disabled={disabled}>
            Create
          </Button>
            </Grid>
            <Grid item xs={3}>
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

export default CreateSequencePopup;
