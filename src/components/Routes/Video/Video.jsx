import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { DashboardHead, DashboardVideo } from '@c/Dashboard';

const LoginPage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>The Better Foundation - How to get started</title>
      </Helmet>

      <DashboardHead includeDescription={true} />
      <DashboardVideo
        video={{
          poster: '/img/videoCover-1.jpg',
          source:
            'https://player.vimeo.com/progressive_redirect/playback/671168751/rendition/720p/720p.mp4?loc=external&signature=1733ac2e0cab67f9523a32454d0856af8a5002a3e7a2004394919d13287c0cea',
          caption: 'How to get started',
        }}
      />
    </>
  );
});

export default LoginPage;
