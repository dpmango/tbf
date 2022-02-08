import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon, UiVideo, Input } from '@ui';

import styles from './HeadVideo.module.scss';

const HeadVideo = ({ className }) => {
  const [search, setSearch] = useState('');
  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <div className={styles.title}>Welcome, Olivia</div>
            <div className={styles.description}>Lets get started </div>
          </div>
          <div className={styles.action}>
            <div className={styles.search}>
              <Input
                iconLeft="search"
                value={search}
                placeholder="Search"
                allowClear={true}
                onChange={(v) => setSearch(v)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadVideo;
