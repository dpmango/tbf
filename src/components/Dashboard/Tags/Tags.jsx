import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './Tags.module.scss';

const Tags = ({ className, tags, hasBorder }) => {
  return (
    <section className={cns(styles.container, hasBorder && styles._hasBorder, className)}>
      <div className="container">
        <div className={cns('h3-title', styles.title)}>Tags</div>
        <ul className={styles.list}>
          {tags &&
            tags.map((tag, idx) => (
              <li key={tag.id || idx}>
                <span className={styles.badge}>{tag.label}</span>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

Tags.propTypes = {
  className: PropTypes.string,
  tags: PropTypes.array,
  hasBorder: PropTypes.bool,
};

Tags.defaultProps = {
  hasBorder: true,
};

export default Tags;
