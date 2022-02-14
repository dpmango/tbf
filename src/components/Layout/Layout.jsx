import React from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import Sidebar from '@c/Layout/Sidebar';

import styles from './Layout.module.scss';

const Variants = {
  MAIN: 'main',
  AUTH: 'auth',
};

const VariantClasses = {
  [Variants.MAIN]: '',
  [Variants.AUTH]: styles._auth,
};

const Layout = ({ variant, children }) => {
  return (
    <div className={cns(styles.layout, variant && VariantClasses[variant])}>
      {variant === Variants.MAIN && <Sidebar />}

      <main className={styles.main}>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Layout.defaultProps = {
  variant: Variants.MAIN,
};

export default Layout;
