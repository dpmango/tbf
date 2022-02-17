import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import cns from 'classnames';

import { Button, SvgIcon } from '@ui';
import {
  CopymaticConvert,
  CopymaticDraft,
  CopymaticIdeas,
  CopymaticIntros,
  CopymaticOutline,
  CopymaticVoiceover,
} from '@c/Copymatic';

import st from './Steps.module.scss';

const baseRoute = '/create/';

const Steps = ({ className, steps }) => {
  let history = useHistory();
  const location = useLocation();

  const getLocationId = useMemo(() => {
    const loc = location.pathname.split('/');
    const tStep = steps.find((x) => x.slug === loc[loc.length - 1]);

    return tStep ? tStep.id : 1;
  }, [location, steps]);

  const [step, activateStep] = useState(getLocationId);

  const handleStepClick = useCallback(
    (id) => {
      if (id <= 6 && id > 0) {
        activateStep(id);
      }
    },
    [activateStep]
  );

  useEffect(() => {
    const tSlug = steps.find((x) => x.id === step).slug;

    history.push(`${baseRoute}${tSlug}`);
  }, [step]);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.stepsScroller}>
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

        <div className={st.stepContent}>
          <Switch>
            <Route path={`${baseRoute}ideas`}>
              <CopymaticIdeas />
            </Route>
            <Route path={`${baseRoute}intros`}>
              <CopymaticIntros />
            </Route>
            <Route path={`${baseRoute}outline`}>
              <CopymaticOutline />
            </Route>
            <Route path={`${baseRoute}draft`}>
              <CopymaticDraft />
            </Route>
            <Route path={`${baseRoute}voiceover`}>
              <CopymaticVoiceover />
            </Route>
            <Route path={`${baseRoute}convert`}>
              <CopymaticConvert />
            </Route>
          </Switch>
        </div>

        <div className={st.nav}>
          {step > 1 && (
            <Button
              theme="gray"
              iconLeft="arrow-left"
              variant="small"
              outline
              onClick={() => handleStepClick(step - 1)}>
              Previous
            </Button>
          )}
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
