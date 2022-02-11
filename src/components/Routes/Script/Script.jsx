import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { DashboardHead, DashboardTags, DashboardDocs } from '@c/Dashboard';
import { ScriptSteps, ScriptVideo, ScriptActions } from '@c/Scripts';

import { content } from './Content.js';

const ScriptPage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>Your Script</title>
      </Helmet>

      <DashboardHead includeDescription={'Your current sales summary and activity.'} />

      <ScriptSteps steps={content.steps} />
      <ScriptVideo video={{ ...content.video }} />
      <ScriptActions />

      <DashboardTags tags={content.tags} />
      <DashboardDocs {...content.documents} />
    </>
  );
});

export default ScriptPage;
