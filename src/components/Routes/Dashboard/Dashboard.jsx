import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { DashboardHeadVideos, DashboardVideos } from '@c/Dashboard';

import { content } from './Content.js';

const DashboardPage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>TBF</title>
      </Helmet>

      <DashboardHeadVideos />
      <DashboardVideos {...content.video} />
    </>
  );
});

export default DashboardPage;