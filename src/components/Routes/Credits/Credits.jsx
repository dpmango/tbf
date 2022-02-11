import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { Loader } from '@ui';
import { DashboardHead } from '@c/Dashboard';

const BenefitsPage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>Your credits (3)</title>
      </Helmet>

      <DashboardHead />
      <Loader pageBlocking={true} />
    </>
  );
});

export default BenefitsPage;
