import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import st from './Steps.module.scss';

const Steps = ({ className, steps }) => {
  const [step, activateStep] = useState(1);

  const handleAddClick = useCallback(() => {}, []);

  const handleStepClick = useCallback(
    (id) => {
      activateStep(id);
    },
    [activateStep]
  );

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <ul className={st.stepsList}>
          {steps &&
            steps.map((x, idx) => (
              <li
                key={x.id || idx}
                className={cns(st.step, step === (x.id || idx) && st._active)}
                onClick={() => handleStepClick(x.id)}>
                <span className={st.steplabel}>Step {x.id}</span>
                <div className={st.stepBox}>
                  <SvgIcon name="checkmark" />
                </div>
                <div className={st.stepDescr}>{x.label}</div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Steps;
