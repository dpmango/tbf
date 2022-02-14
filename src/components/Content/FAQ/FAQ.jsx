import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './FAQ.module.scss';

const FAQ = ({ className, title, list }) => {
  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={cns('h2-title', styles.title)}>FAQs</div>

          <div className={styles.list}>
            {list &&
              list.map((x, idx) => (
                <div className={styles.item} key={idx}>
                  <div className={styles.itemIcon}>
                    <SvgIcon name={x.icon} />
                  </div>
                  <div className={styles.itemContent}>
                    <div className={styles.itemTitle}>{x.label}</div>
                    <div className={styles.itemDescription}>{x.content}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

FAQ.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  list: PropTypes.array,
};

export default FAQ;
