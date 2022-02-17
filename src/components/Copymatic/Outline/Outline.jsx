import React, { useCallback, useContext, useEffect, useState } from 'react';
import cns from 'classnames';

import { Button, Checkbox, Input, SvgIcon } from '@ui';

import st from './Outline.module.scss';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';
import { SessionStoreContext } from '../../../store';
import { observer } from 'mobx-react';

const maxLimit = 300;

const Outline = observer(({ className }) => {
  const [intro, setIntro] = useState('');
  const [radioGroup, setRadioGroup] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const sessionContext = useContext(SessionStoreContext);

  const handleTitleChange = (title) => sessionContext.setTitle(title);

  const handleIntroChange = useCallback(
    (v) => {
      if (intro.length <= maxLimit) {
        setIntro(v);
      }
    },
    [intro, setIntro]
  );

  useEffect(() => {
    setRadioGroup([
      {
        id: 1,
        label: `Section 1: What’s the Difference Between a Cardiologist and Heart Doctor?<br/><br/>
          Section 2: Find the Right Doctor for You<br/><br/>
          Section 3: Check Out the Doctor's Education and Training<br/><br/>
          Section 4: Look for Doctors With High Success Rates<br/><br/>
          Section 5: Read Reviews From Other Patients<br/><br/>
          Section 6: Conclusion.`,
      },
      {
        id: 2,
        label: `Section 1: Defining what a cardiologist is<br/><br/>
        Section 2: What to look for when searching for a cardiologist<br/><br/>
        Section 3: How to find reviews of the cardiologist<br/><br/>
        Section 4: Conclusion.`,
      },
      {
        id: 3,
        label: `Section 1: What to Look for in a Doctor<br/><br/>
        Section 2: Finding the Right Doctor<br/><br/>
        Section 3: Making an Appointment with a Cardiologist<br/><br/>
        Section 4: Should I Hire a Personal Assistant?<br/><br/>
        Section 5: Conclusion.`,
      },
      {
        id: 4,
        label: `Section 1: What to look for in a cardiologist?<br/><br/>
        Section 2: How to find the right doctor?<br/><br/>
        Section 3: What are other people saying about the cardiologist?<br/><br/>
        Section 4: Conclusion.`,
      },
      {
        id: 5,
        label: `Section 1: What is a cardiologist?<br/><br/>
        Section 2: How to find a cardiologist.<br/><br/>
        Section 3: Expert tips for finding the best doctor.<br/><br/>
        Section 4: Conclusion.`,
      },
    ]);
  }, []);

  return (
    <section className={cns(st.container, className)}>
      <div className={st.grid}>
        <div className={st.col}>
          <div className={st.group}>
            <div className={sharedStyles.inputLabel}>
              <span>Title</span>
              <i data-tip="tooltip content">
                <SvgIcon name="info" />
              </i>

              <span>*</span>

              <div className={sharedStyles.counter}>
                {sessionContext.title.length} / {maxLimit}
              </div>
            </div>

            <Input
              value={sessionContext.title}
              onChange={handleTitleChange}
              placeholder="How to Find a Cardiologist - An Expert Guide"
            />
          </div>

          <div className={st.group}>
            <div className={sharedStyles.inputLabel}>
              <span>Intro</span>
              <i data-tip="tooltip content">
                <SvgIcon name="info" />
              </i>
              <span>*</span>
              <div className={sharedStyles.counter}>
                {intro.length} / {maxLimit}
              </div>
            </div>

            <Input type="textarea" rows={8} value={intro} onChange={handleIntroChange} placeholder="Intro" />
          </div>

          <div className={st.cta}>
            <Button type="submit" block>
              Generate Outline
            </Button>
            <div className={sharedStyles.helper}>
              <i data-tip="One idea is 10c cents">
                <SvgIcon name="info" />
              </i>
              Each Generate costs a credit
            </div>
          </div>
        </div>

        {/* col */}
        <div className={st.col}>
          <div className={sharedStyles.radioGroup}>
            {radioGroup &&
              radioGroup.map((r, idx) => (
                <Checkbox
                  type="radio"
                  key={r.id || idx}
                  isChecked={selectedRadio === r.id}
                  onChange={() => setSelectedRadio(r.id)}>
                  <span dangerouslySetInnerHTML={{ __html: r.label }} />
                </Checkbox>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Outline;
