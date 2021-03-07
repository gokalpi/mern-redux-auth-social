import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Spinner from './components/Spinner/Spinner';

const Admin = lazy(() => import('./pages/Admin'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UsersIndex = lazy(() => import('./pages/users'));

const App = () => {
  return (
    <>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/login" component={Login} />
            <Route exact path="/notfound" component={NotFound} />
            <ProtectedRoute path="/admin" component={Admin} />
            <Route path="/users" component={UsersIndex} />
            <Route exact path="/" component={Home} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </>
  );
};

export default App;
