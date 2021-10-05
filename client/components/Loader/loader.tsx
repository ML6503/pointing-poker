import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export const Loader = () => {

  return (
    <div>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      <CircularProgress color='secondary' size={120} thickness={2.5} />
      </Box>
    </div>
  );
}