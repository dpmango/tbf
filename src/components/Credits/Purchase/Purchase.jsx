import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './Purchase.module.scss';

const Purchase = ({ className }) => {
  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.head}>
          <div className="h2-title">1 credit = 1 script</div>
          <p className="p-lg">Credits are used to write scripts! Check out the benefits</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.colTitle}>
              1 Credit
              <br />
              Write 1 Script
            </div>

            <div className={styles.colCta}>
              <Button>Buy for $100</Button>
            </div>
          </div>

          <div className={styles.col}>
            <div className={cns(styles.colBadge, styles._brown)}>Save 5%</div>
            <div className={styles.colTitle}>
              2 Credit
              <br />
              Write 2 Scripts
            </div>

            <div className={styles.colCta}>
              <Button>Buy for $100</Button>
            </div>
          </div>

          <div className={styles.col}>
            <div className={cns(styles.colBadge, styles._yellow)}>Save 10%</div>
            <div className={styles.colTitle}>
              1 Credit
              <br />
              Write 1 Script
            </div>

            <div className={styles.colCta}>
              <Button>Buy for $475</Button>
            </div>
          </div>

          <div className={styles.col}>
            <div className={cns(styles.colBadge, styles._red)}>Save 15%</div>
            <div className={styles.colTitle}>
              10 Credit
              <br />
              Write 10 Scripts
            </div>

            <div className={styles.colCta}>
              <Button>Buy for $950</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Purchase;
