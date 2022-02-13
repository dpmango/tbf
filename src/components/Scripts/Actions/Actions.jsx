import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';

import st from './Actions.module.scss';

const Actions = ({ className, steps, ...props }) => {
  return (
    <section className={cns(st.container, className)} {...props}>
      <div className="container">
        <div className={st.grid}>
          <Button outline>Get your script sponsored</Button>
          <Link to="/article/1">
            <Button outline>Do you want to play this in your office?</Button>
          </Link>
          <Button>This will expire in 13:23:59</Button>
        </div>
      </div>
    </section>
  );
};

export default Actions;
