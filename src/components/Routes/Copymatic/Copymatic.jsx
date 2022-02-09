import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { DashboardHead } from '@c/Dashboard';
import { CopymaticSteps } from '@c/Copymatic';
import { UiStoreContext } from '@store';
import { content } from './Content';

const CopymaticPage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>TBF Copymatic</title>
      </Helmet>

      <DashboardHead hasBorder={false} />
      <CopymaticSteps steps={content.steps} />
    </>
  );
});

export default CopymaticPage;
