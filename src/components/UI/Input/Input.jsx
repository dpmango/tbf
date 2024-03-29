import React, { useCallback, useMemo, useState, memo } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';
import uniqueId from 'lodash/uniqueId';
import InputMask from 'react-input-mask';
import TextareaAutosize from 'react-autosize-textarea';

import { SvgIcon } from '@ui';
import styles from './Input.module.scss';

const Variants = {
  DEFAULT: 'default',
  SMALL: 'small',
};

const VariantClasses = {
  [Variants.DEFAULT]: null,
  [Variants.SMALL]: styles._small,
};

const Input = ({
  className,
  label,
  inputRef,
  variant,
  modifier,
  allowClear,
  iconLeft,
  iconRight,
  value,
  onChange,
  mask,
  error,
  helper,
  showError,
  ...props
}) => {
  const id = useMemo(() => {
    return uniqueId();
  }, []);

  const onInputChange = useCallback(
    (e) => {
      if (onChange) {
        onChange(e.target.value, e);
      }
    },
    [onChange]
  );

  const onCLearInput = useCallback(() => {
    if (onChange) {
      onChange('');
    }
  }, [onChange]);

  const clearIcon = useMemo(() => {
    if (allowClear && value) {
      return (
        <button type="button" onClick={onCLearInput} className={styles.input_clear} title="Очистить">
          <SvgIcon name="close" />
        </button>
      );
    }

    return null;
  }, [value, allowClear]);

  const inputProps = {
    id,
    ref: inputRef,
    className: cns(styles.input_input, allowClear && styles._withClear, error && styles._withError),
    value,
    onChange: onInputChange,
    ...props,
  };

  return (
    <div
      style={props.style}
      className={cns(
        styles.input,
        variant && VariantClasses[variant],
        modifier && styles[`_${modifier}`],
        iconLeft && styles._iconedLeft,
        iconRight && styles._iconedRight,
        className
      )}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.input_wrapper}>
        {iconLeft && (
          <span className={styles.iconLeft}>
            <SvgIcon name={iconLeft} />
          </span>
        )}
        {iconLeft && (
          <span className={styles.iconRight}>
            <SvgIcon name={iconRight} />
          </span>
        )}
        {props.type === 'textarea' ? (
          <TextareaAutosize {...inputProps} />
        ) : mask ? (
          <InputMask
            mask={mask}
            // beforeMaskedValueChange={beforeMaskedValueChange}
            {...inputProps}
          />
        ) : (
          <input {...inputProps} />
        )}

        {clearIcon}

        {error && showError && <div className={styles.error}>{error}</div>}

        {helper && <div className={styles.helper}>{helper}</div>}
      </div>
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  allowClear: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modifier: PropTypes.string,
  variant: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showError: PropTypes.bool,
  onChange: PropTypes.func,
  mask: PropTypes.string,
  style: PropTypes.object,
};

Input.defaultProps = {
  variant: Variants.DEFAULT,
  showError: true,
};

export default memo(Input);
