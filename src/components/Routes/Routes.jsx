import React, { useContext } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import history from '@config/history';
import { SessionStoreContext } from '@store';
import { Loader } from '@ui';
import Layout from '@c/Layout/';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Dashboard from './Dashboard';
import Video from './Video';
import Copymatic from './Copymatic';
import Script from './Script';
import Benefits from './Benefits';
import Credits from './Credits';
// import NoMatch from './NoMatch';

const Routes = observer(() => {
  const { sessionId } = useContext(SessionStoreContext);

  return (
    <Layout variant="main">
      <Switch>
        <ProtectedRoute exact path="/">
          <Dashboard />
        </ProtectedRoute>

        <ProtectedRoute exact path="/video/:id">
          <Video />
        </ProtectedRoute>

        <ProtectedRoute path="/copymatic">
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

        <Route path="/login">{sessionId ? <Redirect to="/" /> : <Login />}</Route>

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
