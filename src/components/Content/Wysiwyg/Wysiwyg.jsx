import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './Wysiwyg.module.scss';

const Wysiwyg = ({ className, content, includeCta }) => {
  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.wysiwyg} dangerouslySetInnerHTML={{ __html: content }}></div>

          {includeCta && (
            <div className={styles.cta}>
              <Button theme="primary">
                <span>Learn More</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Wysiwyg.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  includeCta: PropTypes.bool,
};

export default Wysiwyg;
