import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { Loader } from '@ui';
import { DashboardHead } from '@c/Dashboard';
import { ScriptSteps, ScriptVideo } from '@c/Scripts';

const BenefitsPage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>Your Script</title>
      </Helmet>

      <DashboardHead includeDescription={'Your current sales summary and activity.'} />
      <Loader pageBlocking={true} />
    </>
  );
});

export default BenefitsPage;
