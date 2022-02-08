import React, { useCallback, useMemo, useState, memo } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';
import uniqueId from 'lodash/uniqueId';
import Slider from 'react-rangeslider';

import { SvgIcon } from '@ui';
import styles from './RangeSlider.module.scss';
import 'react-rangeslider/lib/index.css';

const Variants = {
  DEFAULT: 'default',
  SMALL: 'small',
};

const VariantClasses = {
  [Variants.DEFAULT]: null,
  [Variants.SMALL]: styles._small,
};

const RangeSlider = ({ className, label, variant, value, onChange, error, showError, ...props }) => {
  const id = useMemo(() => {
    return uniqueId();
  }, []);

  const onInputChange = useCallback(
    (value) => {
      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  const inputProps = {
    id,
    className: cns(styles.input_input, error && styles._withError),
    value,
    onChange: onInputChange,
    ...props,
  };

  return (
    <div style={props.style} className={cns(styles.input, variant && VariantClasses[variant], className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.input_wrapper}>
        <Slider {...inputProps} />

        {error && showError && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

RangeSlider.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number]),
  variant: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showError: PropTypes.bool,
  onChange: PropTypes.func,
  mask: PropTypes.string,
  style: PropTypes.object,
};

RangeSlider.defaultProps = {
  variant: Variants.DEFAULT,
  showError: true,
};

export default memo(RangeSlider);
