import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './Head.module.scss';

const HeadVideos = ({ className, includeDescription, hasBorder }) => {
  const [search, setSearch] = useState('');
  return (
    <section className={cns(styles.container, hasBorder && styles._hasBorder, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <div className={styles.title}>Welcome, Olivia</div>
            {includeDescription && <div className={styles.description}>Lets get started </div>}
          </div>
          <div className={styles.actions}>
            <div className={styles.button}>
              <Button theme="gray" variant="small">
                <span>Credits</span>
                <mark>3</mark>
              </Button>
            </div>
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

HeadVideos.propTypes = {
  className: PropTypes.string,
  includeDescription: PropTypes.bool,
  hasBorder: PropTypes.bool,
};

HeadVideos.defaultProps = {
  hasBorder: true,
};

export default HeadVideos;
