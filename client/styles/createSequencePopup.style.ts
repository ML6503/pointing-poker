import { makeStyles } from '@material-ui/core';

export const useStylesSequenceIssuePopup = makeStyles((theme) => ({
  inputNumWrapper: {
    padding: 5,
    margin: 0,

    [theme.breakpoints.down(700)]: {
      maxWidth: '50%',
      flexBasis: '20%',
      padding: 15,
    },
    [theme.breakpoints.down(550)]: {     
      padding: 5,
       
    },
  },
  sequenceWrapper: {  
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    [theme.breakpoints.down(550)]: {
      padding: 5,
    },  
  },
  inputNum: {
   padding: 5,
    width: 60, 
    textAlign: 'center',
    [theme.breakpoints.down(700)]: {     
      padding: 1,    
    }, 
  },
  container: {  
    margin: '0 auto',
    padding: '20px 0',
    [theme.breakpoints.down(700)]: {
      width: '520px',
    },
    [theme.breakpoints.down(550)]: {
      width: '420px',
    },
  },
  errorText: {
    textAlign:'center',
    fontSize: 15,
    [theme.breakpoints.down(550)]: {
      fontSize: 12,
    },
  },
}));
