import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './Documentation.module.scss';
import ICON_PDF from './assets/pdf.svg';

const ICONS = {
  pdf: ICON_PDF,
};

const getFileExtension = (fileStr) => {
  const strs = fileStr.split('.');
  const lastExt = strs[strs.length - 1];

  return lastExt.toLowerCase();
};

const Documentation = ({ className, title, list, hasBorder }) => {
  return (
    <section className={cns(styles.container, hasBorder && styles._hasBorder, className)}>
      <div className="container">
        <div className={cns('h3-title', styles.title)}>{title}</div>
        <div className={styles.grid}>
          {list &&
            list.map((doc, idx) => (
              <div className={styles.file} key={doc.id || idx}>
                <i className={styles.fileIcon}>
                  <img src={ICONS[getFileExtension(doc.file)]} />
                </i>
                <span className={styles.fileLabel}>{doc.label}</span>
                <span className={styles.fileCta}>
                  <Button outline variant="small">
                    Download
                  </Button>
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

Documentation.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  list: PropTypes.array,
  hasBorder: PropTypes.bool,
};

Documentation.defaultProps = {
  hasBorder: true,
  list: [],
};

export default Documentation;
