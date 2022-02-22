import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
import { SessionStoreContext } from '../../../store';
import { observer } from 'mobx-react';

const baseRoute = '/create/';

const Steps = observer(({ className, steps }) => {
  let history = useHistory();
  const location = useLocation();
  const sessionContext = useContext(SessionStoreContext);

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

  // https://www.slatejs.org/examples/richtext
  let next = true;
  if (step === 1) {
    next = sessionContext.title.label && sessionContext.title.label.length > 0;
  }

  if (step === 2) {
    next = sessionContext.intro.label && sessionContext.intro.label.length > 0;
  }

  if (step === 3) {
    next = sessionContext.outline.label && sessionContext.outline.label.length > 0;
  }

  if (step === 4) {
    next = sessionContext.paragraphs && sessionContext.paragraphs.length > 0;
  }

  if (step === 5) {
    next = sessionContext.speaker !== '';
  }

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.stepsScroller}>
          <ul className={st.stepsList}>
            {steps &&
              steps.map((x, idx) => (
                <li
                  key={x.id || idx}
                  className={cns(st.step, step === (x.id || idx) && st._active, step > (x.id || idx) && st._done)}
                  //onClick={() => handleStepClick(x.id)}
                >
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
          <Button
            className={step === 1 && st.hidden}
            theme="gray"
            iconLeft="arrow-left"
            variant="small"
            outline
            onClick={() => handleStepClick(step - 1)}>
            Previous
          </Button>
          <Button
            className={(step === 6 || !next) && st.hidden}
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
});

export default Steps;
