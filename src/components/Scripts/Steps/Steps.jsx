import React, { useCallback } from 'react';
import cns from 'classnames';

import { Button } from '@ui';

import st from './Steps.module.scss';

const STATUS_CLASS = {
  1: 'new',
  2: 'await',
  3: 'complete',
};

const Steps = ({ className, steps, onStepClick, ...props }) => {
  const handleStepClick = useCallback(
    ({ id, status }) => {
      // active next next step (2 -> 3 status)
      if (status === 2) {
        const stepsUpdater = [...steps.map((x) => (x.id === id ? { ...x, status: 3 } : { ...x }))];

        onStepClick && onStepClick(stepsUpdater);
      }
    },
    [steps]
  );

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
                <Button
                  {...btnProps}
                  variant="sm"
                  className={st.label}
                  key={g.id || idx}
                  onClick={() => handleStepClick(g)}>
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
