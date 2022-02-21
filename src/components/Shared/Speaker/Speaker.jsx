import cns from 'classnames';
import { Button } from '@ui';
import st from './Speaker.module.scss';
import React, { useContext, useState } from 'react';
import { SessionStoreContext } from '../../../store';
import { audioCtx, lovo, playStream, stopStream } from '../../Copymatic/Voiceover/Voiceover';

const Speaker = ({ className, avatar, name, surname, tags, id, selected, modifier, onSelect, onListen }) => {
  const sessionContext = useContext(SessionStoreContext);
  const [running, setRunning] = useState(false);

  const listenToVoice = () => {
    if (!running) {
      setRunning(true);
      stopStream();

      lovo
        .post('/conversion', {
          text: sessionContext.title.label || 'If you are looking for the perfect voice, then I am your best option!',
          speaker_id: name,
          speed: 1,
          pause: 0,
          encoding: 'mp3',
        })
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
        {onSelect && (
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
              className={cns(selected && st._selected)}
              onClick={() => onSelect(id)}
              variant="small"
              block
              iconRight={selected ? 'check-circle' : null}>
              {selected ? <span>Selected</span> : <span>Select voice</span>}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Speaker;
