import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '../../components/ProtectedRoute';

const UsersList = lazy(() => import('./List'));

const UsersIndex = ({ match }) => {
  return (
    <>
      <Switch>
        <ProtectedRoute exact path={[`${match.url}`, `${match.url}/list`]} component={UsersList} />
      </Switch>
    </>
  );
};

export default UsersIndex;
