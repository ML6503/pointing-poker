import { Grid, Typography } from '@material-ui/core';
import useStylesMemberList from '@styles/memberList.style';
import { UserCard } from 'Cards/userCard';
import { FC } from 'react';
import { roles } from 'utils/configs';
import { IUser } from 'utils/interfaces';

interface ObserverListProps {
  users: Array<IUser>;
}

export const ObserverList: FC<ObserverListProps> = ({ users }) => {
  const classes = useStylesMemberList();

  return (
    <div className={classes.container}>
      <Typography variant="h4" align="center" gutterBottom>
        Observers:
      </Typography>
      <Grid container spacing={2} className={classes.root}>
        {users &&
          users.map(
            (user) =>
              !user.dealer &&
              user.userRole === roles.observer && (
                <Grid item key={user.username}>
                  <UserCard user={user} observer={true} />
                </Grid>
              ),
          )}
      </Grid>
    </div>
  );
};
