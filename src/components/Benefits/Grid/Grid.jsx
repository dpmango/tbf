import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './Grid.module.scss';

const Grid = ({ className, list }) => {
  const [opened, setOpened] = useState(false);

  const getExpanded = useMemo(() => {
    return list.find((x) => x.id === opened);
  }, [opened]);

  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.grid}>
          {list &&
            list.map((col, idx) => (
              <div
                className={cns(styles.col, opened === col.id && styles._active)}
                key={idx}
                onClick={() => setOpened(col.id)}>
                <div className={styles.colIcon}>
                  <SvgIcon name={col.icon} />
                </div>
                <div className={styles.colContent}>
                  <div className={styles.colTitle}>{col.label}</div>
                </div>
              </div>
            ))}
          {opened && (
            <div className={styles.expanded}>
              <div className={styles.colIcon}>
                <SvgIcon name={getExpanded.icon} key={getExpanded.icon} />
              </div>
              <div className={styles.colContent}>
                <div className={styles.colTitle}>{getExpanded.label}</div>
                <div className={styles.colDescription}>{getExpanded.content}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Grid;
