import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './Sharing.module.scss';

const Sharing = ({ className, buttons }) => {
  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={cns('h2-title', styles.title)}>
            Sharing is caring. <br />
            Lets heal the world together. <br />
            Earn a credit for every physician that signs up!
          </div>
        </div>
      </div>
    </section>
  );
};

Sharing.propTypes = {
  className: PropTypes.string,
};

export default Sharing;
