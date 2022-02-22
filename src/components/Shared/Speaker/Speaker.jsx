import cns from 'classnames';
import { Button } from '@ui';
import { observer } from 'mobx-react';
import st from './Speaker.module.scss';
import { api } from '../../Copymatic/Ideas/Ideas';
import React, { useContext, useState } from 'react';
import { SessionStoreContext } from '../../../store';
import { audioCtx, playStream, stopStream } from '../../Copymatic/Voiceover/Voiceover';

const Speaker = observer(({ className, avatar, name, surname, tags, id, modifier }) => {
  const [running, setRunning] = useState(false);
  const sessionContext = useContext(SessionStoreContext);

  const listenToVoice = () => {
    if (!running) {
      setRunning(true);
      stopStream();

      api
        .post(
          '/lovo/conversion',
          {
            speaker_id: name,
            text: 'If you are looking for the perfect voice, then I am your best option!',
          },
          {
            responseType: 'arraybuffer',
          }
        )
        .then((response) => {
          if (response.data) {
            audioCtx.decodeAudioData(response.data).then((buffer) => playStream(buffer));
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setRunning(false));
    }
  };

  return (
    <div className={cns(st.speaker, modifier && st[`_${modifier}`], className)}>
      <div className={st.avatar}>
        <img src={avatar} alt={name} />
      </div>
      <div className={st.content}>
        <div className={st.name}>
          {name} {surname}
        </div>
        <div className={st.tags}>{tags}</div>
        <div className={st.cta}>
          <Button
            loading={running}
            onClick={() => listenToVoice(id)}
            theme="primary"
            variant="small"
            iconLeft="play-circle"
            block>
            <span>Listen to Voice</span>
          </Button>
          <Button
            theme="muted"
            className={cns('', sessionContext.speaker === name && st._selected)}
            onClick={() => sessionContext.setSpeaker(name)}
            variant="small"
            block
            iconRight={sessionContext.speaker === name ? 'check-circle' : null}>
            {sessionContext.speaker === name ? <span>Selected</span> : <span>Select voice</span>}
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Speaker;
