import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';

import { UiStoreContext } from '@store';
import { ProfileSettings, ProfileHead, ProfilePassword } from '@c/Profile';

const baseRoute = '/profile';

const ProfilePage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>Your profile</title>
      </Helmet>

      <ProfileHead />

      <Switch>
        <Route path={`${baseRoute}/settings`}>
          <ProfileSettings />
        </Route>

        <Route path={`${baseRoute}/password`}>
          <ProfilePassword />
        </Route>

        <Route exact path={baseRoute}>
          <Redirect to={`${baseRoute}/settings`} />
        </Route>
      </Switch>
    </>
  );
});

export default ProfilePage;
