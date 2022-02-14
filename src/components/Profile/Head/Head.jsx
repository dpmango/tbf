import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';

import st from './Head.module.scss';

const Head = ({ className, steps, ...props }) => {
  return (
    <section className={cns(st.container, className)} {...props}>
      <div className="container">
        <div className={st.wrapper}>
          <div className={st.title}>Settings</div>

          <ul className={st.nav}>
            <li>
              <NavLink to="/profile/settings">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/profile/password">Password</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Head;
