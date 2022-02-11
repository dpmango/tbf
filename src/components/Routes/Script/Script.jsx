import React, { useContext, useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { DashboardHead, DashboardTags, DashboardDocs } from '@c/Dashboard';
import { ScriptSteps, ScriptVideo, ScriptActions, ScriptAnalytics } from '@c/Scripts';

import { content } from './Content.js';

const ScriptPage = observer(() => {
  const [steps, setSteps] = useState(content.steps);

  const uiContext = useContext(UiStoreContext);

  const showAnalytics = useMemo(() => {
    // Sign declaration compleate
    return steps.find((x) => x.id === 2).status === 3;
  }, [steps]);

  return (
    <>
      <Helmet>
        <title>Your Script</title>
      </Helmet>

      <DashboardHead includeDescription={'Your current sales summary and activity.'} />

      <ScriptSteps steps={steps} onStepClick={(v) => setSteps(v)} />
      <ScriptVideo video={{ ...content.video }} />
      <ScriptActions />

      <DashboardTags tags={content.tags} />
      {showAnalytics && <ScriptAnalytics />}
      <DashboardDocs {...content.documents} />
    </>
  );
});

export default ScriptPage;
