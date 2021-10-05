import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { sequenceErrorConfig } from "utils/configs";
import { useStylesSequenceIssuePopup } from "@styles/createSequencePopup.style";


interface OneSequenceInputProps {
  item: number;
  sequence: Array<number | string>;
  setSequence: Dispatch<SetStateAction<Array<number | string>>>;
  sequenceError: string;
  setSequenceError: Dispatch<SetStateAction<string>>;
}

export const OneSequenceInput: FC<OneSequenceInputProps> = ({ item, sequence, setSequence, sequenceError, setSequenceError }) => {
  const [ seqErr, setSeqErr ] = useState(true);
  const classes = useStylesSequenceIssuePopup();
  
  const createNewSequence = (index: string, value: string ) => {
    const updatedSeq = [...sequence];
    updatedSeq[Number(index)] = value;
    setSequence(updatedSeq);
  };

  const onHandleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const index = evt.target.name;
    const newValue = evt.target.value;
    createNewSequence(index, newValue);
     

    if(/(?!999$)^[^\s]{1,3}$/g.test(newValue.toString())){
      setSeqErr(false);
      
       
    } else {
      setSeqErr(true);
      setSequenceError(sequenceErrorConfig.noEntry);
    }
  };

  useEffect(() => {
    if(sequenceError === sequenceErrorConfig.ok) {
        setSeqErr(false);   
        
    } if(sequence.every(val => /(?!999$)^[^\s]{1,3}$/g.test(val.toString()))){
       
      setSeqErr(false);
     }
  }, []);

  useEffect(() => {
    if(seqErr) {     
      setSequenceError(sequenceErrorConfig.noEntry);    
    }
    if(sequenceError === sequenceErrorConfig.ok) {   
      setSeqErr(false);  
    }
  }, [seqErr, sequenceError]);

    return (
        <Grid item xs={1} className={classes.inputNumWrapper} key={item}>
        <TextField       
        variant="outlined"        
        autoFocus={item === 0 ? true : false }        
        name={item.toString()}
        id={item.toString()}        
        value={sequence[item]}
        onChange={onHandleInput}
        required        
        error={seqErr}
        InputProps={{ inputProps: {inputprops: { min: 1,  max: 3},  style: { textAlign: 'center', padding: '15px 5px' } } }}
        className={classes.inputNum}
      />
       </Grid>
      )
};
