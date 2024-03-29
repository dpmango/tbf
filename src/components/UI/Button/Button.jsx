import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Spinner } from '@ui';
import styles from './Button.module.scss';

const Themes = {
  PRIMARY: 'primary',
  ACCENT: 'accent',
  BLACK: 'black',
  GRAY: 'gray',
  MUTED: 'muted',
  DANGER: 'danger',
  SUCCESS: 'success',
};

const Variants = {
  DEFAULT: 'default',
  SMALL: 'small',
  SM: 'sm',
  BIG: 'big',
};

const ThemeClasses = {
  [Themes.PRIMARY]: styles._primary,
  [Themes.ACCENT]: styles._accent,
  [Themes.BLACK]: styles._black,
  [Themes.GRAY]: styles._gray,
  [Themes.MUTED]: styles._muted,
  [Themes.DANGER]: styles._danger,
  [Themes.SUCCESS]: styles._success,
};

const VariantClasses = {
  [Variants.DEFAULT]: null,
  [Variants.SMALL]: styles._small,
  [Variants.SM]: styles._sm,
  [Variants.BIG]: styles._big,
};

const Button = ({
  children,
  className,
  theme,
  variant,
  type,
  outline,
  block,
  loading,
  iconLeft,
  iconRight,
  ...props
}) => {
  const classStyle = cns(
    styles.btn,
    theme && ThemeClasses[theme],
    variant && VariantClasses[variant],
    outline && styles._outline,
    block && styles._block,
    (iconLeft || iconRight) && styles._iconed,
    loading && styles._loading,
    iconLeft && styles._iconLeft,
    iconRight && styles._iconRight,
    className,
    'btn'
  );

  if (type === 'link') {
    return (
      <Link className={classStyle} {...props}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={classStyle} type={type || 'button'} {...props}>
        {iconLeft && <SvgIcon name={iconLeft} key={`${iconLeft}`} />}

        {children}

        {loading && <Spinner theme="button" color="#FFF" />}

        {iconRight && <SvgIcon name={iconRight} key={`${iconRight}`} />}
      </button>
    );
  }
};

Button.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  outline: PropTypes.bool,
  block: PropTypes.bool,
  loading: PropTypes.bool,
  iconRight: PropTypes.string,
  iconLeft: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Button.defaultProps = {
  theme: Themes.PRIMARY,
  variant: Variants.DEFAULT,
};

export default memo(Button);
