import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon, UiVideo } from '@ui';

import styles from './Videos.module.scss';

const Video = ({ className, videos }) => {
  const handleAddClick = useCallback(() => {}, []);

  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.grid}>
          {videos &&
            videos.map((video, idx) => (
              <UiVideo className={styles.video} video={video} key={video.id || idx}>
                <div className={styles.videoCaption}>
                  <SvgIcon name="play-button" />
                  <div className={styles.videoCaptionTitle}>{video.caption}</div>
                </div>
              </UiVideo>
            ))}

          <div className={styles.add} onClick={handleAddClick}>
            <div className={styles.addContent}>
              <div className={styles.addIcon}>
                <SvgIcon name="plus-circle" />
              </div>
              <div className={styles.addTitle}>Start your first script</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
