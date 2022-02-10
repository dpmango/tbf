import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon, UiVideo } from '@ui';

import styles from './Video.module.scss';

const Video = ({ className, video }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleProgress = useCallback((percent) => {
    setShowMessage(percent > 98);
  }, []);

  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <UiVideo className={styles.video} video={video} onProgress={handleProgress}>
            <div className={styles.videoCaption}>
              <SvgIcon name="play-button" />
              <div className={styles.videoCaptionTitle}>{video.caption}</div>
            </div>
          </UiVideo>

          <div className={cns(styles.message, showMessage && styles._active)}>
            <div className={styles.messageTitle}>Congratulations</div>
            <div className={styles.messageDescription}>You are now ready to write your first script</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
