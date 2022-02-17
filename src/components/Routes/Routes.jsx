import React, { useContext, useMemo } from 'react';
import { Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import history from '@config/history';
import { SessionStoreContext } from '@store';
import { Loader } from '@ui';
import Layout from '@c/Layout/';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Video from './Video';
import Copymatic from './Copymatic';
import Script from './Script';
import Benefits from './Benefits';
import Credits from './Credits';
import Article from './Article';
import Profile from './Profile';
// import NoMatch from './NoMatch';

const Routes = observer(() => {
  const { sessionId } = useContext(SessionStoreContext);
  const location = useLocation();

  const layoutVariant = useMemo(() => {
    if (['/login', '/signup', '/recover'].includes(location.pathname)) {
      return 'auth';
    }

    return 'main';
  }, [location]);

  return (
    <Layout variant={layoutVariant}>
      <Switch>
        <ProtectedRoute exact path="/">
          <Dashboard />
        </ProtectedRoute>

        <ProtectedRoute exact path="/video/:id">
          <Video />
        </ProtectedRoute>

        <ProtectedRoute path="/create">
          <Copymatic />
        </ProtectedRoute>

        <ProtectedRoute path="/script/:id">
          <Script />
        </ProtectedRoute>

        <ProtectedRoute path="/benefits">
          <Benefits />
        </ProtectedRoute>

        <ProtectedRoute path="/credits">
          <Credits />
        </ProtectedRoute>

        <ProtectedRoute path="/article/:id">
          <Article />
        </ProtectedRoute>

        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>

        <Route path="/login">{sessionId ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/signup">{sessionId ? <Redirect to="/" /> : <Signup />}</Route>

        <Route>
          <Loader pageBlocking={true} />
        </Route>
      </Switch>
    </Layout>
  );
});

const CustomRouter = () => (
  <Router history={history}>
    <Routes />
  </Router>
);

export default CustomRouter;
