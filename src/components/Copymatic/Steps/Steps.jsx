import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import st from './Steps.module.scss';
import { CopymaticTopic } from '@c/Copymatic';

const Steps = ({ className, steps }) => {
  const [step, activateStep] = useState(1);

  const handleAddClick = useCallback(() => {}, []);

  const handleStepClick = useCallback(
    (id) => {
      if (id < 6 && id > 0) {
        activateStep(id);
      }
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
        <div className={st.stepContent}>{step === 1 && <CopymaticTopic />}</div>

        <div className={st.nav}>
          <Button theme="gray" iconLeft="arrow-left" variant="small" outline onClick={() => handleStepClick(step - 1)}>
            Prev
          </Button>
          <Button
            theme="gray"
            iconRight="arrow-right"
            variant="small"
            outline
            onClick={() => handleStepClick(step + 1)}>
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Steps;
