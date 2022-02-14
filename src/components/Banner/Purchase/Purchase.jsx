import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './Purchase.module.scss';

const Purchase = ({ className, buttons }) => {
  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={cns('h2-title', styles.title)}>
            If you don’t want to share, you can always purchase credits.
          </div>
          <div className={styles.cta}>
            <Button>Purchase</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

Purchase.propTypes = {
  className: PropTypes.string,
};

export default Purchase;
