import { Grid, Typography } from '@material-ui/core';
import useStylesMemberList from '@styles/memberList.style';
import { UserCard } from 'components/Cards/userCard';
import { FC, useEffect, useState } from 'react';
import { roles } from 'utils/configs';
import { IUser } from 'utils/interfaces';

export interface ObserverListProps {
  users: Array<IUser>;
  onKickUser: (user: IUser) => void;
}

export const ObserverList: FC<ObserverListProps> = ({ users, onKickUser }) => {
  const [isObserver, setIsObserver] = useState(false);
  const classes = useStylesMemberList();

  useEffect(
    () => {
      setIsObserver(
        users
          .filter((user) => !user.dealer)
          .some((user) => user.userRole === roles.observer),
      );
    },
    [users],
  );
  return (
    <div className={classes.container}>
      {isObserver ? (
        <Typography variant='h5' gutterBottom className={classes.title}>
          Observers:
        </Typography>
      ) : null}
      <Grid container spacing={2} className={classes.root}>
        {isObserver ? (
          users.map(
            (user) =>
              !user.dealer &&
              user.userRole === roles.observer && (
                <Grid item key={user.username}>
                  <UserCard
                    user={user}
                    observer={true}
                    onKickUser={onKickUser}
                  />
                </Grid>
              ),
          )
        ) : null}
      </Grid>
    </div>
  );
};
