import React, { useCallback, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { AudioList, Button, Progress } from '@ui';
import { UiStoreContext } from '@store';
import { SharedSpeaker } from '@c/Shared';
import { ContinueModal } from '@c/Modal';

import st from './Convert.module.scss';
import { SessionStoreContext } from '../../../store';
import { mockAudioList } from './Content';
import { stopStream } from '../Voiceover/Voiceover';
import { api } from '../Ideas/Ideas';
import { useHistory } from 'react-router-dom';

let intervalId;

const Convert = observer(({ className }) => {
  const history = useHistory();

  const [running, setRunning] = useState(false);
  const [upload, setUpload] = useState(null);

  const uiContext = useContext(UiStoreContext);
  const sessionContext = useContext(SessionStoreContext);

  const openConfirmModal = useCallback(() => {
    uiContext.setModal('continue', {
      title: 'Are you sure you want to proceed?',
      description: 'This is your last chance to review and make any changes.',
      ctaText: 'Proceed with voiceover',
      icon: 'alert-circle',
      iconType: 'alert',
      action: 'upload',
    });
  }, []);

  const startProgress = useCallback(() => {
    intervalId = setInterval(() => {
      const speed = 100 / estimate / 10;

      setUpload((v) => (v || 0) + speed);
    }, 100);
  }, [upload]);

  useEffect(() => {
    if (upload > 100) {
      setUpload(100);
      clearInterval(intervalId);
    }
  }, [upload]);

  const speaker = sessionContext.speaker.name ? sessionContext.speaker.name : 'Tim Calkney HD';

  const handleModalCtaClick = useCallback(
    (action) => {
      if (action === 'upload') {
        uiContext.setModal('continue', {
          title: 'Audio file is currently rendering',
          description: 'Please wait while we process this request.',
          ctaText: 'Proceed with voiceover',
          icon: 'upload-cloud',
          iconType: 'default',
          action: 'complete',
        });

        setUpload(0);
        startProgress();

        if (!list.length > 0) {
          return;
        }

        if (!running) {
          setRunning(true);
          stopStream();

          api
            .post('/lovo/file', {
              title: sessionContext.title.label,
              speaker_id: speaker,
              text: list.map((v) => v.label),
            })
            .then((response) => {
              if (response.data) {
                console.log(response.data);
                // script is generated at this stage, redirect
                sessionContext.addScript(response.data);
                history.push('/script/' + response.data.ID);
              }
            })
            .catch((error) => console.log(error))
            .finally(() => {
              setUpload(100);
              setRunning(false);
            });
        }
      }
    },
    [uiContext.setModal, intervalId]
  );

  let list = mockAudioList;
  if (sessionContext.intro.label) {
    const text = sessionContext.intro.label + sessionContext.paragraphs.join(' ');
    const result = text.match(/[^.!?]+[.!?]+/g).map((v) => v.trim());

    if (result.length > 0) {
      list = result.map((x, idx) => {
        return { id: idx, label: x };
      });
    }
  }

  const estimate = Math.ceil(list.map((v) => v.label).join(' ').length / 500) * 4; // estimated request time in sec

  console.log(estimate);

  // console.log(
  //   list.map((v) => v.label.trim()),
  //   estimate,
  //   list.length > 0 && list.map((v) => v.label.trim()).join(' ').length
  // );

  return (
    <section className={cns(st.container, className)}>
      <div className={st.head}>
        <SharedSpeaker modifier="flat" speaker={sessionContext.speaker} />
      </div>

      <AudioList className={st.list} title="Cardiology - Heart Disease" list={list} />

      <div className={st.panel}>
        {/*<div className={st.panelActions}>
          <div className={st.panelAction} data-tip="report error">
            <SvgIcon name="alert-circle" />
          </div>
          <div className={st.panelAction} data-tip="timer">
            <SvgIcon name="clock" />
          </div>
          <div className={st.panelAction} data-tip="forawrd">
            <SvgIcon name="flash" />
          </div>
          <div className={st.panelAction} data-tip="delete">
            <SvgIcon name="delete" />
          </div>
        </div>*/}

        <div className={st.panelActions}>
          {/*<div className={st.panelAction} data-tip="music">
            <SvgIcon name="music" />
          </div>
          <div className={st.panelAction} data-tip="play">
            <SvgIcon name="play-circle" />
          </div>
          <div className={st.panelAction} data-tip="pause">
            <SvgIcon name="stop-circle" />
          </div>*/}
          <div className={st.panelAction}>
            <Button theme="danger" variant="small" onClick={openConfirmModal}>
              Convert
            </Button>
          </div>
        </div>
      </div>

      <ContinueModal cta={!running} onCtaClick={handleModalCtaClick}>
        {upload && <Progress className={st.progress} progress={upload} />}
      </ContinueModal>
    </section>
  );
});

export default Convert;
