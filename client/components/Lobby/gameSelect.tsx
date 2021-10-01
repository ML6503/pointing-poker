import { Dispatch, FC, SetStateAction, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

interface GameSelectProps {
  selectName: string;
  options: Array<string>;
  onSelectClick: (option: string, selectName: string) => void;
  setOpenSequenceCreate?: Dispatch<SetStateAction<boolean>>;
}

const CUSTOM_SEQUENCE = 'Custom sequence';

export const GameSelect: FC<GameSelectProps> = ({
  selectName,
  options,
  onSelectClick,
  setOpenSequenceCreate,
}) => {
  const classes = useStyles();
  const [ option, setOptions ] = useState<string | number>(options[0]);
  const [ open, setOpen ] = useState(false);

  const handleCustomSequencePopup = (sequence: string) => {
    if (sequence === CUSTOM_SEQUENCE) {
      setOpenSequenceCreate(true);
    }
  };

  const handleChange = (e) => {
    const sequence = e.target.value;
    setOptions(sequence);    
    onSelectClick(sequence, e.target.name); 
    handleCustomSequencePopup(sequence);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleItemClick = (sequence: string) => {
    handleCustomSequencePopup(sequence);
  };

  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel id="sequence-select-label">Option</InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="sequence-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={option}
        name={selectName}
        onChange={handleChange}
        color="secondary"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options &&
          options.map((item) => {
            return (
              <MenuItem value={item} key={item} onClick={() => handleItemClick(item)}>
                {item}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};
