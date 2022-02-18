import cns from 'classnames';
import st from './Intros.module.scss';
import { api } from '../Ideas/Ideas';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { SessionStoreContext } from '../../../store';
import { Button, Checkbox, Input, SvgIcon } from '@ui';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';

const maxLimit = 300;

const Intros = observer(({ className }) => {
  const sessionContext = useContext(SessionStoreContext);
  const [running, setRunning] = useState(false);

  const generateIntros = () => {
    if (Object.keys(sessionContext.title).length > 0 && !running) {
      setRunning(true);
      sessionContext.setIntro({});
      sessionContext.setIntros([]);

      api
        .post('/cm', { blog_title: sessionContext.title.label, model: 'blog-intros' })
        .then((response) => {
          if (response.data && response.data.ideas) {
            let intros = [];
            for (let k in response.data.ideas) {
              intros.push({ id: k, label: response.data.ideas[k] });
            }
            sessionContext.setIntros(intros);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setRunning(false));
    }
  };

  const handleTitleChange = (value) => sessionContext.setTitle({ id: sessionContext.title.id, label: value });

  return (
    <section className={cns(st.container, className)}>
      <div className={st.grid}>
        <div className={st.col}>
          <div className={sharedStyles.inputLabel}>
            <span>Title</span>
            <i data-tip="This is the title">
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

          <div className={st.cta}>
            <Button
              type="submit"
              disabled={Object.keys(sessionContext.title).length === 0}
              loading={running}
              block
              onClick={generateIntros}>
              Generate intros
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
            {sessionContext.intros &&
              sessionContext.intros.map((r, idx) => (
                <Checkbox
                  type="radio"
                  key={r.id || idx}
                  isChecked={sessionContext.intro.id === r.id}
                  onChange={() => sessionContext.setIntro(r)}>
                  {r.label}
                </Checkbox>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Intros;
