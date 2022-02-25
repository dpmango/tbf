import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { DashboardHead, DashboardDocs } from '@c/Dashboard';
import { ContentWysiwyg, ContentActions } from '@c/Content';
import { content } from './Content.js';

const ArticlePage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>Article Page</title>
      </Helmet>

      <DashboardHead includeDescription="Your current sales summary and activity" />
      <ContentWysiwyg {...content.page} />
      <ContentActions {...content.actions} />
      <DashboardDocs {...content.documents} />
    </>
  );
});

export default ArticlePage;
