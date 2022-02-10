import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { DashboardHead } from '@c/Dashboard';
import { ScriptSteps, ScriptVideo } from '@c/Scripts';

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

      {/* <DashboardTags /> */}
      {/* <DashboardDocument {...content.documents} /> */}
    </>
  );
});

export default ScriptPage;
