import { FC, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { IRoomCreateData, IRoomInfo } from 'utils/interfaces';
import { roomInitData } from 'utils/configs';

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

interface RoomSelectProps {
  rooms: Array<IRoomInfo>;
  onRoomSelect: (room: IRoomCreateData) => void;
}

export const RoomSelect: FC<RoomSelectProps> = ({ rooms, onRoomSelect }) => {
  const classes = useStyles();
  const [ room, setRoom ] = useState<IRoomInfo>({roomId: '', roomName: ''});
  const [ open, setOpen ] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const selectedRoom = rooms.find((room) => room.roomId === event.target.value);
    if (selectedRoom) {
      setRoom(selectedRoom);
      onRoomSelect({room: selectedRoom, statusData: true});
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel id="demo-controlled-open-select-label">
          Select Room
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={room.roomId}
          onChange={handleChange}
          color="secondary"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {rooms &&
            rooms.map((item) => (
              <MenuItem value={item.roomId} key={item.roomId}>
                {item.roomName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};
