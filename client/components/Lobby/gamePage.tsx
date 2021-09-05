import Link from 'next/link';
import { Button, Grid } from '@material-ui/core';

export const GamePage = () => {
  return (
    <div>
      <div>Game Page</div>
      <Link href="/">
        <Button color="primary" variant="contained">
          Exit
        </Button>
      </Link>
    </div>
  );
};
