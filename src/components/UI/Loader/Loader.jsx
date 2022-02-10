import React, { memo, useState, useContext, useMemo, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';
import MoonLoader from 'react-spinners/MoonLoader';

import { SvgIcon } from '@ui';
import { AxiosInterceptors } from '@src/services';
import styles from './Loader.module.scss';

const LoaderContext = createContext();

const Loader = ({ className, inline, pageBlocking, ...props }) => {
  const [active, setActive] = useState(false);
  const { isLoading } = useContext(LoaderContext);

  useEffect(() => {
    const timer = setTimeout(() => setActive(isLoading), 300);

    return () => clearTimeout(timer);
  }, [isLoading, setActive]);

  return (
    <div
      className={cns(
        styles.loader,
        inline && styles._inline,
        pageBlocking && styles._pageblocking,
        active && styles._active,
        className
      )}>
      <div className={styles.loaderBox}>
        <MoonLoader color="#EB5509" loading={true} size={64} />
        <div className={styles.label}>Please wait a few moments...</div>
      </div>
    </div>
  );
};

const LoaderContextProvider = (props) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setLoading }}>
      <AxiosInterceptors>{props.children}</AxiosInterceptors>
    </LoaderContext.Provider>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};

LoaderContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export { Loader, LoaderContext, LoaderContextProvider };
