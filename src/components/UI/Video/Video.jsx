import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon } from '@ui';

import styles from './Video.module.scss';

const Video = ({ className, video, children, onProgress }) => {
  const [playState, setPlayState] = useState('pause');
  const [muteState, setMuteState] = useState('mute');
  const [progressPercent, setProgressPercent] = useState(0);

  const videoRef = useRef();
  const progressRef = useRef();

  const changeButtonState = (type) => {
    // Play/Pause button
    if (type == 'playpause') {
      if (videoRef.current.paused || videoRef.current.ended) {
        setPlayState('pause');
      } else {
        setPlayState('play');
      }
    }
    // Mute button
    else if (type == 'mute') {
      setMuteState(videoRef.current.muted ? 'unmute' : 'mute');
    }
  };

  const checkVolume = (dir) => {
    if (dir) {
      var currentVolume = Math.floor(videoRef.current.volume * 10) / 10;
      if (dir === '+') {
        if (currentVolume < 1) videoRef.current.volume += 0.1;
      } else if (dir === '-') {
        if (currentVolume > 0) videoRef.current.volume -= 0.1;
      }
      // If the volume has been turned off, also set it as muted
      // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
      if (currentVolume <= 0) videoRef.current.muted = true;
      else videoRef.current.muted = false;
    }
    changeButtonState('mute');
  };

  const handlePlayPauseClick = useCallback(
    (e) => {
      if (videoRef.current.paused || videoRef.current.ended) videoRef.current.play();
      else videoRef.current.pause();
    },
    [videoRef.current]
  );

  const handleMuteClick = useCallback(
    (e) => {
      videoRef.current.muted = !videoRef.current.muted;
      changeButtonState('mute');
    },
    [videoRef.current]
  );

  const handleProgressClick = (e) => {
    const progressPosLeft = progressRef.current.getBoundingClientRect().left;
    var pos = (e.pageX - progressPosLeft) / progressRef.current.offsetWidth;

    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const aspectRatio = useMemo(() => {
    let percent = 56.25;

    if (video.size) {
      const [width, height] = video.size.split('x');

      percent = Math.round((Number(height) / Number(width)) * 100, 100);
    }

    return `${percent}%`;
  }, [video.size]);

  useEffect(() => {
    if (!videoRef.current) return;

    const loadedMetaDataEvent = () => {
      progressRef.current.setAttribute('max', videoRef.current.duration);
    };

    const playPauseEvent = () => {
      changeButtonState('playpause');
    };

    const volumeChangeEvent = () => {
      checkVolume();
    };

    const timeUpdateEvent = () => {
      // For mobile browsers, ensure that the progress element's max attribute is set
      if (!progressRef.current.getAttribute('max')) progressRef.current.setAttribute('max', video.duration);
      progressRef.current.value = videoRef.current.currentTime;

      const percent = Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100);
      setProgressPercent(percent);
      onProgress && onProgress(percent);
    };

    // Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
    videoRef.current.addEventListener('loadedmetadata', loadedMetaDataEvent);

    // Add event listeners for video specific events
    videoRef.current.addEventListener('play', playPauseEvent);
    videoRef.current.addEventListener('pause', playPauseEvent);
    videoRef.current.addEventListener('volumechange', volumeChangeEvent);

    // As the video is playing, update the progress bar
    videoRef.current.addEventListener('timeupdate', timeUpdateEvent);

    return () => {
      try {
        videoRef.current.removeEventListener('loadedmetadata', loadedMetaDataEvent);
        videoRef.current.removeEventListener('play', playPauseEvent);
        videoRef.current.removeEventListener('pause', playPauseEvent);
        videoRef.current.removeEventListener('volumechange', volumeChangeEvent);
        videoRef.current.removeEventListener('timeupdate', timeUpdateEvent);
      } catch {}
    };
  }, [videoRef.current, progressRef.current]);

  return (
    <div className={cns(styles.video, playState && styles[playState], className)}>
      <div className={styles.videoBody} style={{ paddingBottom: aspectRatio }}>
        <video poster={video.poster} ref={videoRef}>
          <source src={video.source} />
        </video>
      </div>

      <div className={styles.videoControls}>
        <div className={styles.videoControlsWrapper}>
          <button
            className={styles.controlPlayPause}
            type="button"
            data-state={playState}
            onClick={handlePlayPauseClick}>
            <SvgIcon name="play" />
            <SvgIcon name="pause" />
          </button>
          <div className={styles.videoProgress}>
            <progress value="0" min="0" ref={progressRef} onClick={handleProgressClick}>
              <span style={{ width: `${progressPercent}%` }}></span>
            </progress>
          </div>
          <button className={styles.controlMute} type="button" data-state={muteState} onClick={handleMuteClick}>
            <SvgIcon name="mute" />
          </button>
        </div>
      </div>

      <div className={cns(styles.videoCaption, !children && styles._childfree)} onClick={handlePlayPauseClick}>
        {children}
      </div>
    </div>
  );
};

export default Video;
