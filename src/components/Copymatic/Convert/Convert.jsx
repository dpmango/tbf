import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, AudioList, Progress } from '@ui';
import { UiStoreContext } from '@store';
import { SharedSpeaker } from '@c/Shared';
import { ContinueModal } from '@c/Modal';

import st from './Convert.module.scss';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';
import { mockAudioList } from './Content';

let intervalId;

const Convert = observer(({ className }) => {
  const [upload, setUpload] = useState(null);

  const uiContext = useContext(UiStoreContext);

  const openConfirmModal = useCallback(() => {
    uiContext.setModal('continue', {
      title: 'Are you sure you want to proceed?',
      description: 'This is your last chance to review and make any changes. ',
      ctaText: 'Proceed with Voiceover',
      icon: 'alert-circle',
      iconType: 'alert',
      action: 'upload',
    });
  }, []);

  const startFakeUpload = useCallback(() => {
    intervalId = setInterval(() => {
      const speed = upload < 75 ? 2 : 1;

      setUpload((v) => {
        return Math.floor((v || 0) + speed || 0);
      });
    }, 80);
  }, [upload]);

  useEffect(() => {
    if (upload > 100) {
      setUpload(100);
      clearInterval(intervalId);
    }
  }, [upload]);

  const handleModalCtaClick = useCallback(
    (action) => {
      if (action === 'upload') {
        uiContext.setModal('continue', {
          title: 'Audio File is currently rendering',
          description: 'Please wait while we process this request.',
          ctaText: 'Proceed with Voiceover',
          icon: 'upload-cloud',
          iconType: 'default',
          action: 'compleate',
        });
        setUpload(0);
        startFakeUpload();
      } else if (action === 'compleate') {
        uiContext.resetModal();
        setUpload(null);
        clearInterval(intervalId);
      } else {
      }
    },
    [uiContext.setModal, intervalId]
  );

  return (
    <section className={cns(st.container, className)}>
      <div className={st.head}>
        <SharedSpeaker
          modifier="flat"
          id={1}
          avatar={'https://randomuser.me/api/portraits/men/1.jpg'}
          name="Orlando"
          surname="Moriarty"
          tags="#Male #Middle-Aged #Low-Pitched #Powerful"
        />
      </div>

      <AudioList className={st.list} title="Cardiology - Heart Disease" list={mockAudioList} />

      <div className={st.panel}>
        <div className={st.panelActions}>
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
        </div>

        <div className={st.panelActions}>
          <div className={st.panelAction} data-tip="music">
            <SvgIcon name="music" />
          </div>
          <div className={st.panelAction} data-tip="play">
            <SvgIcon name="play-circle" />
          </div>
          <div className={st.panelAction} data-tip="pause">
            <SvgIcon name="stop-circle" />
          </div>
          <div className={st.panelAction}>
            <Button theme="white" variant="small" onClick={openConfirmModal}>
              Convert
            </Button>
          </div>
        </div>
      </div>

      <ContinueModal onCtaClick={handleModalCtaClick}>
        {upload && <Progress className={st.progress} progress={upload} />}
      </ContinueModal>
    </section>
  );
});

export default Convert;
