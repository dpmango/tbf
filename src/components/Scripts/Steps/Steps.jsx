import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';

import st from './Steps.module.scss';

const STATUS_CLASS = {
  1: 'new',
  2: 'await',
  3: 'compleate',
};

const Steps = ({ className, steps, ...props }) => {
  return (
    <section className={cns(st.container, className)} {...props}>
      <div className="container">
        <div className={st.scroller}>
          {steps &&
            steps.map((g, idx) => {
              let statusClass = STATUS_CLASS[g.status];
              let btnProps = {
                theme: 'gray',
              };

              if (statusClass === 'compleate') {
                btnProps.theme = 'success';
                btnProps.iconLeft = 'check-circle';
              } else if (statusClass === 'await') {
                btnProps.theme = 'danger';
                btnProps.iconLeft = 'circle';
              } else if (statusClass === 'new') {
                btnProps.theme = 'gray';
              }

              return (
                <Button {...btnProps} variant="sm" className={st.label} key={g.id || idx}>
                  {g.label}
                </Button>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Steps;
