import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input, AudioList } from '@ui';
import { UiStoreContext } from '@store';
import { SharedSpeaker } from '@c/Shared';
import { ContinueModal } from '@c/Modal';

import st from './Convert.module.scss';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';
import { mockAudioList } from './Content';

const Convert = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);

  const openConfirmModal = useCallback(() => {
    uiContext.setModal('continue', {
      title: 'Are you sure you want to proceed?',
      description: 'This is your last chance to review and make any changes. ',
      ctaText: 'Proceed with Voiceover',
    });
  }, []);

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

      <ContinueModal />
    </section>
  );
});

export default Convert;
