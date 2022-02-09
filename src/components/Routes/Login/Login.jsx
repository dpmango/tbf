import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { AuthLogin } from '@c/Auth';

const LoginPage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>TBF Login</title>
      </Helmet>

      <AuthLogin />
    </>
  );
});

export default LoginPage;
