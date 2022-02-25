import React, { useCallback } from 'react';
import cns from 'classnames';

import styles from './Video.module.scss';
import { observer } from 'mobx-react';
import AudioPoster from '../../UI/AudioPoster/Video';

const Video = observer(({ className, video }) => {
  const { user } = video;

  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <AudioPoster className={styles.video} video={video}>
            <div className={styles.videoCaption}>
              <div className={styles.user}>
                <div className={styles.userAvatar}>
                  <img src={user.avatar} alt="" />
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
          </AudioPoster>
        </div>
      </div>
    </section>
  );
});
export default Video;
