import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon, UiVideo } from '@ui';

import styles from './Video.module.scss';

const Video = ({ className, video }) => {
  // const [showMessage, setShowMessage] = useState(false);

  const handleProgress = useCallback((percent) => {
    // setShowMessage(percent > 98);
  }, []);

  const { user } = video;

  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <UiVideo className={styles.video} video={video} onProgress={handleProgress}>
            <div className={styles.videoCaption}>
              <div className={styles.user}>
                <div className={styles.userAvatar}>
                  <img src={user.avatar} />
                </div>
                <div className={styles.userContent}>
                  <div className={cns('h2-title', styles.userTitle)}>{user.title}</div>
                  <div className={styles.userTags}>{user.tags}</div>
                </div>
              </div>

              <div className={styles.videoCaption}>
                <div className={styles.videoCaptionTitle}>{video.caption}</div>
              </div>
            </div>
          </UiVideo>
        </div>
      </div>
    </section>
  );
};

export default Video;
