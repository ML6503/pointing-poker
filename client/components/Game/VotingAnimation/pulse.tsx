import React from "react";
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";


const Pulse = () => {
  const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    pulse: {

      backgroundColor:  theme.palette.primary.main,
      borderRadius: "50%",
      // margin: 10,
      height: 60,
      width: 60,
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 5)",
      transform: "scale(1)",
      animation: "$pulse 3s infinite",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    
    },
    votingContainer: {
      textAlign: "center",
      display: "flex",    
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    text: {     
        color: "#ffff",
        textShadow:"1px 1px 3px rgba(0, 0, 0, 0.5)"
      },

    "@keyframes pulse": {
      "0%": {
        transform: "scale(0.65)",
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.5)"
      },
      "70%": {
        transform: "scale(1)",
        boxShadow: "0 0 0 20px rgba(0, 0, 0, 0)"
      },
      "100%": {
        transform: "scale(0.65)",
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)"
      }
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.votingContainer}>
      <div className={classes.pulse}>
      <Typography variant='subtitle2' className={classes.text}>voting</Typography>
      </div>
    </div>
  );
};

export default Pulse;
