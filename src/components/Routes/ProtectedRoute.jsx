import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { SessionStoreContext } from '@store/SessionStore';

const ProtectedRoute = observer(({ children, ...rest }) => {
  const { sessionId } = useContext(SessionStoreContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        sessionId ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
});

export default ProtectedRoute;
