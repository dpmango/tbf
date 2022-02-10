import React, { memo, useState, useCallback, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon, Checkbox } from '@ui';
import { numberWithFraction } from '@helpers';
import styles from './ListItem.module.scss';

const ListItem = ({ className, id, audio, label, selectedAudio, onBoxSelect }) => {
  const [progress, setProgress] = useState(0);
  const [playState, setPlayState] = useState(false);

  const audioRef = useRef(null);

  const togglePlayState = useCallback(() => {
    if (!audioRef.current) return;

    if (playState) {
      audioRef.current.pause();
      setPlayState(false);
    } else {
      audioRef.current.play();
      setPlayState(true);
    }
  }, [playState, audioRef.current]);

  useLayoutEffect(() => {
    if (!audioRef.current) return;

    const progressEvent = (audioProcessingEvent) => {
      setProgress(Math.round(audioRef.current.currentTime));
    };

    const loadedMetaDataEvent = () => {
      setProgress(Math.round(audioRef.current.duration));
    };

    audioRef.current.addEventListener('loadedmetadata', loadedMetaDataEvent);
    audioRef.current.addEventListener('timeupdate', progressEvent);

    return () => {
      try {
        audioRef.current.removeEventListener('loadedmetadata', loadedMetaDataEvent);
        audioRef.current.removeEventListener('timeupdate', progressEvent);
      } catch (e) {
        console.warn('could not removeEventListener on timeupdate');
      }
    };
  }, [audioRef.current]);

  return (
    <div className={cns(styles.box, className)}>
      <div className={styles.boxCheckbox}>
        <Checkbox isChecked={selectedAudio.includes(id)} onChange={() => onBoxSelect(id)}></Checkbox>
      </div>
      <div className={styles.boxActions}>
        <div className={styles.actionTimer}>
          <SvgIcon name="timer" />
          <span>{numberWithFraction(progress)}s</span>
        </div>

        <div className={styles.actionPlayer}>{audio && <audio ref={audioRef} src={audio} autoPlay={false} />}</div>
        <div className={styles.actionFlash}>
          <SvgIcon name="flash" />
        </div>
        <div className={cns(styles.actionPlay, playState && styles._playing)} onClick={togglePlayState}>
          <SvgIcon name="play-circle" />
          <SvgIcon name="stop-circle" />
        </div>
      </div>

      <div className={styles.boxLabel}>{label}</div>
    </div>
  );
};

export default memo(ListItem);
