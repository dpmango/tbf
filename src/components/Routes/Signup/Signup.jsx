import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { AuthSignup } from '@c/Auth';

const SignupPage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>TBF Signup</title>
      </Helmet>

      <AuthSignup />
    </>
  );
});

export default SignupPage;
