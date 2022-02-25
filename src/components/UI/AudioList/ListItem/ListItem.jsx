import cns from 'classnames';
import { Checkbox, SvgIcon } from '@ui';
import styles from './ListItem.module.scss';
import { numberWithFraction } from '@helpers';
import { api } from '../../../Copymatic/Ideas/Ideas';
import { SessionStoreContext } from '../../../../store';
import { audioCtx, playStream, stopStream } from '../../../Copymatic/Voiceover/Voiceover';
import React, { memo, useContext, useState } from 'react';

const ListItem = ({ className, id, audio, label, selectedAudio, onBoxSelect }) => {
  const [progress, setProgress] = useState(0);
  const [playState, setPlayState] = useState(false);
  const [running, setRunning] = useState(false);
  const sessionContext = useContext(SessionStoreContext);

  const playLine = () => {
    if (playState) {
      stopStream();
      setPlayState(false);

      return;
    }

    const speaker = sessionContext.speaker.name ? sessionContext.speaker.name : 'Tim Calkney HD';

    if (!running) {
      setPlayState(true);
      setRunning(true);
      stopStream();

      api
        .post(
          '/lovo/conversion',
          {
            speaker_id: speaker,
            text: label,
          },
          {
            responseType: 'arraybuffer',
          }
        )
        .then((response) => {
          if (response.data) {
            audioCtx.decodeAudioData(response.data).then((buffer) => {
              playStream(buffer, () => {
                setPlayState(false);
              });

              setProgress(buffer.duration);
              //console.log(audioCtx.state, buffer.length, buffer.duration);
            });
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setRunning(false));
    }
  };

  return (
    <div className={cns(styles.box, className)}>
      <div className={styles.boxCheckbox}>
        <Checkbox isChecked={selectedAudio.includes(id)} onChange={() => onBoxSelect(id)} />
      </div>
      <div className={styles.boxActions}>
        <div className={styles.actionTimer}>
          <SvgIcon name="timer" />
          <span>{numberWithFraction(progress)}s</span>
        </div>

        <div className={styles.actionPlayer} />
        <div className={styles.actionFlash}>
          <SvgIcon name="flash" />
        </div>
        <div className={cns(styles.actionPlay, playState && styles._playing)} onClick={playLine}>
          <SvgIcon name="play-circle" />
          <SvgIcon name="stop-circle" />
        </div>
      </div>

      <div className={styles.boxLabel}>{label}</div>
    </div>
  );
};

export default memo(ListItem);
