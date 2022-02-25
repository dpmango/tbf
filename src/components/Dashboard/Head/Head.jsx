import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { Button, Input } from '@ui';

import styles from './Head.module.scss';

const Head = ({ className, includeDescription, hasBorder }) => {
  const [search, setSearch] = useState('');
  return (
    <section className={cns(styles.container, hasBorder && styles._hasBorder, className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <div className={styles.title}>Welcome, James</div>
            {includeDescription && (
              <div className={styles.description}>
                <>{includeDescription || 'Lets get started '}</>
              </div>
            )}
          </div>
          <div className={styles.actions}>
            <div className={styles.button}>
              <Link to="/credits">
                <Button theme="gray" variant="small">
                  <span>Credits</span>
                  <mark>100</mark>
                </Button>
              </Link>
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

Head.propTypes = {
  className: PropTypes.string,
  includeDescription: PropTypes.any,
  hasBorder: PropTypes.bool,
};

Head.defaultProps = {
  hasBorder: true,
};

export default Head;
