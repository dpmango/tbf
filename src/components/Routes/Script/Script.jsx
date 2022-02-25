import React, { useContext, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { DashboardDocs, DashboardHead, DashboardTags } from '@c/Dashboard';
import { ScriptActions, ScriptSteps, ScriptVideo } from '@c/Scripts';

import { content } from './Content.js';
import { api } from '../../Copymatic/Ideas/Ideas';
import { useParams } from 'react-router-dom';

const ScriptPage = observer(() => {
  const [steps, setSteps] = useState(content.steps);
  const [video, setVideo] = useState({
    id: 1,
    poster: '/img/videoCover-2.jpg',
    source: '',
    caption: '',
    user: {
      id: 2,
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      title: 'Dr. James Moriarty',
      tags: 'MB, MRCP',
    },
  });

  let { id } = useParams();

  const showAnalytics = useMemo(() => {
    // Sign declaration complete
    return steps.find((x) => x.id === 2).status === 3;
  }, [steps]);

  useEffect(() => {
    api
      .get('/lovo/script/' + id)
      .then((response) => {
        if (response.data) {
          let v = { ...video };
          v.caption = response.data.Title;
          v.source = 'https://api2.buzz.fit/v1/lovo/file/' + response.data.File;
          setVideo(v);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Helmet>
        <title>Your script</title>
      </Helmet>

      <DashboardHead includeDescription={'Your current sales summary and activity'} />

      <ScriptSteps steps={steps} />
      <ScriptVideo video={video} />
      <ScriptActions />

      <DashboardTags tags={content.tags} />
      {/*{showAnalytics && <ScriptAnalytics />}*/}
      <DashboardDocs {...content.documents} />
    </>
  );
});

export default ScriptPage;
