import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, UiVideo } from '@ui';

import styles from './Videos.module.scss';

const Video = ({ className, videos }) => {
  const handleAddClick = useCallback(() => {}, []);

  const videosList = useMemo(() => {
    const videosLength = videos.length;
    const minVideos = 5;

    if (videosLength < minVideos) {
      return [...videos, ...[...Array(minVideos - videosLength).keys()].map(() => ({ skeleton: true }))];
    }

    return videos;
  }, [videos]);

  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.grid}>
          {videosList &&
            videosList.map((video, idx) => (
              <div className={styles.col} key={video.id || idx}>
                {!video.skeleton ? (
                  <UiVideo className={styles.video} video={video}>
                    <Link to={`/video/${video.id}`} className={styles.videoCaption}>
                      <SvgIcon name="play-button" />
                      <div className={styles.videoCaptionTitle}>{video.caption}</div>
                    </Link>
                  </UiVideo>
                ) : (
                  <div className={styles.skeleton}></div>
                )}
              </div>
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
