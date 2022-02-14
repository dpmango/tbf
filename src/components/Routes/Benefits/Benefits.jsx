import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { DashboardHead } from '@c/Dashboard';
import { BenefitsGrid } from '@c/Benefits';
import { content } from './Content';

const BenefitsPage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>Your Benefits</title>
      </Helmet>

      <DashboardHead includeDescription="Benefits" />
      <BenefitsGrid list={content.grid} />
    </>
  );
});

export default BenefitsPage;
