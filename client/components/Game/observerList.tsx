import { Typography } from '@material-ui/core';
import useStylesScoreList from '@styles/scoreList.style';
import { FC } from 'react';
import { roles } from 'utils/configs';
import { IUser } from 'utils/interfaces';
import { UserGameCard } from './userGameCard';

interface ObserverListProps {
  users: Array<IUser>;
}

export const ObserverList: FC<ObserverListProps> = ({ users }) => {
  const classes = useStylesScoreList();
  return (
    <div className={classes.container}>
      <Typography variant="h6" align="center" gutterBottom>
          Observers:
        </Typography>
      {users &&
        users.map(
          (user) =>
            user.userRole === roles.observer && (
              <UserGameCard observer={true} user={user} key={user.id} />
            ),
        )}
    </div>
  );
};
