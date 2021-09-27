import { FC, useEffect, useState } from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import { IGameTimer } from 'utils/interfaces';
import { useStylesTimer } from '@styles/timer.style';

interface TimerProps {
  timer: IGameTimer;
  timeStarted: number;
  onTimerStop: () => void;
}

export const Timer: FC<TimerProps> = ({ timer, timeStarted, onTimerStop }) => {
  const classes = useStylesTimer();
  const [ timeMin, setTimeMin ] = useState<string>();
  const [ timeSec, setTimeSec ] = useState<string>();

  const getMinutes = (time: number) => {
    const min = Math.floor(time / 1000 / 60);
    return min.toString();
  };

  const getSeconds = (time: number) => {
    const sec = Math.floor((time / 1000) % 60);
    const newSec = sec < 10 ? `0${sec}` : sec;
    return newSec.toString();
  };

  useEffect(
    () => {
      if (timeStarted) {
        const intTime =
          +timeMin + +timeSec > 0 &&
          window.setInterval(() => {
            const newDate = timer.time + 1000 + timeStarted - Date.now();
            setTimeSec(getSeconds(newDate));
            setTimeMin(getMinutes(newDate));
            if (newDate < 1000) {
              clearInterval(intTime);
              onTimerStop();
            }
          }, 1000);
        return () => {
          clearInterval(intTime);
        };
      }
    },
    [ timeStarted ],
  );

  useEffect(
    () => {
      setTimeSec(getSeconds(timer.time));
      setTimeMin(getMinutes(timer.time));
    },
    [ timer ],
  );

  return (
    <div className={classes.timerContainer}>
      <Box boxShadow={4} className={classes.timerBox}>
        <Typography align="center" className={classes.timerText}>
          {' '}
          {timeMin}{' '}
        </Typography>
        <Typography align="center" className={classes.timerColon}>
          {' '}
          :{' '}
        </Typography>
        <Typography align="center" className={classes.timerText}>
          {' '}
          {timeSec}{' '}
        </Typography>
      </Box>
    </div>
  );
};
