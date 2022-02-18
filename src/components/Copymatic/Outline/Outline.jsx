import cns from 'classnames';
import { api } from '../Ideas/Ideas';
import { observer } from 'mobx-react';
import st from './Outline.module.scss';
import React, { useContext, useState } from 'react';
import { SessionStoreContext } from '../../../store';
import { Button, Checkbox, Input, SvgIcon } from '@ui';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';

const maxLimit = 300;

const Outline = observer(({ className }) => {
  const sessionContext = useContext(SessionStoreContext);
  const [running, setRunning] = useState(false);

  const handleTitleChange = (value) => sessionContext.setTitle({ id: sessionContext.title.id, label: value });
  const handleIntroChange = (value) => sessionContext.setIntro({ id: sessionContext.intro.id, label: value });

  const generateOutlines = () => {
    if (Object.keys(sessionContext.title).length > 0 && !running) {
      setRunning(true);
      sessionContext.setOutline([]);
      sessionContext.setOutlines([]);

      api
        .post('/cm', { blog_title: sessionContext.title.label, model: 'blog-outline' })
        .then((response) => {
          if (response.data && response.data.ideas) {
            let outlines = [];
            for (let k in response.data.ideas) {
              const outline = response.data.ideas[k].split('<br>').map((v) => v.replace('\n', '').trim('-').trim());
              outlines.push({ id: k, label: outline });
            }
            sessionContext.setOutline([]);
            sessionContext.setOutlines(outlines);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setRunning(false));
    }
  };

  return (
    <section className={cns(st.container, className)}>
      <div className={st.grid}>
        <div className={st.col}>
          <div className={st.group}>
            <div className={sharedStyles.inputLabel}>
              <span>Title</span>
              <i data-tip="Title">
                <SvgIcon name="info" />
              </i>
              <span>*</span>
              <div className={sharedStyles.counter}>
                {sessionContext.title.label && sessionContext.title.label.length} / {maxLimit}
              </div>
            </div>

            <Input
              value={sessionContext.title.label}
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
                {sessionContext.intro.label && sessionContext.intro.label.length} / {maxLimit}
              </div>
            </div>

            <Input
              type="textarea"
              rows={8}
              value={sessionContext.intro.label}
              onChange={handleIntroChange}
              placeholder="Intro"
            />
          </div>

          <div className={st.cta}>
            <Button
              onClick={generateOutlines}
              disabled={Object.keys(sessionContext.title).length === 0}
              loading={running}
              type="submit"
              block>
              Generate outline
            </Button>
            <div className={sharedStyles.helper}>
              <i data-tip="Each generate costs a credit">
                <SvgIcon name="info" />
              </i>
              Each generate costs a credit
            </div>
          </div>
        </div>

        {/* col */}
        <div className={st.col}>
          <div className={sharedStyles.radioGroup}>
            {sessionContext.outlines &&
              sessionContext.outlines.map((r, idx) => (
                <Checkbox
                  type="radio"
                  key={r.id || idx}
                  isChecked={sessionContext.outline.id === r.id}
                  onChange={() => {
                    sessionContext.setOutline(r);
                  }}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: r.label
                        .map((v, k) => {
                          return k + 1 + '. ' + v;
                        })
                        .join('<br>'),
                    }}
                  />
                </Checkbox>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Outline;
