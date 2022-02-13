import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './Actions.module.scss';

const Actions = ({ className, buttons }) => {
  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          {buttons &&
            buttons.map((button, idx) => (
              <Link to={button.to} key={idx}>
                <Button theme="primary" variant="big" iconLeft={button.iconLeft} iconRight={button.iconRight}>
                  <span>{button.text}</span>
                </Button>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

Actions.propTypes = {
  className: PropTypes.string,
  buttons: PropTypes.array,
};

export default Actions;
