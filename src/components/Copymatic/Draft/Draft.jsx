import cns from 'classnames';
import { value } from 'lodash/seq';
import st from './Draft.module.scss';
import { api } from '../Ideas/Ideas';
import { observer } from 'mobx-react';
import { Button, Input, SvgIcon } from '@ui';
import { SessionStoreContext } from '../../../store';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';
import React, { useCallback, useContext, useState } from 'react';

const maxLimit = 300;

const Draft = observer(({ className }) => {
  const sessionContext = useContext(SessionStoreContext);
  const [running, setRunning] = useState(false);
  const [outlines, setOutlines] = useState([]);

  const handleTitleChange = (title) => {
    const t = sessionContext.title;
    t.label = title;
    sessionContext.setTitle(t);
  };

  const handleIntroChange = (intro) => sessionContext.setIntro(intro);

  const generateDraft = () => {
    if (Object.keys(sessionContext.title).length > 0 && !running) {
      setRunning(true);

      Promise.all(
        sessionContext.outline.label.map((v) => {
          return api.post('/cm', {
            blog_title: sessionContext.title.label,
            subheading: v,
            model: 'paragraph-writer',
          });
        })
      )
        .then((values) => {
          const p = [];
          values.map((v) => {
            p.push(v.data.ideas[1]);
          });
          sessionContext.setParagraphs(p);
        })
        .catch((error) => console.log(error))
        .finally(() => setRunning(false));
    }
  };

  const handleOutlineChange = useCallback(
    (value, id) => {
      setOutlines([...outlines.map((x) => (x.id === id ? { ...x, ...{ value: value } } : { ...x }))]);
    },
    [outlines]
  );

  const handleOutlineDelete = useCallback(
    (id) => {
      setOutlines([...outlines.filter((x) => x.id !== id)]);
    },
    [outlines]
  );

  const handleAddOutline = useCallback(() => {
    const nextId = outlines[outlines.length - 1].id + 1;

    setOutlines([...outlines, ...[{ id: nextId, label: `Section ${nextId}`, value: '' }]]);
  }, [outlines]);

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

          <div className={st.group}>
            <div className={sharedStyles.inputLabel}>
              <span>Article outline</span>
              <i data-tip="Article outline">
                <SvgIcon name="info" />
              </i>
              <span>*</span>
            </div>

            {sessionContext.outline.label &&
              sessionContext.outline.label.map((outline, idx) => (
                <div className={st.outline} key={outline.id || idx}>
                  <div className={st.outlineLabel}>Section {idx + 1}</div>
                  <div className={st.outlineInput}>
                    <Input
                      className={st.outlineInputWrapper}
                      type="textarea"
                      value={outline}
                      onChange={(v) => handleOutlineChange(v, outline.id)}
                      placeholder=""
                    />
                    <div className={st.outlineDelete} onClick={() => handleOutlineDelete(outline.id)}>
                      <SvgIcon name="delete" />
                    </div>
                  </div>
                </div>
              ))}

            <div className={st.addOutline} onClick={handleAddOutline}>
              <span>Add more</span>
              <SvgIcon name="plus-circle" />
            </div>
          </div>

          <div className={st.cta}>
            <Button
              onClick={generateDraft}
              disabled={Object.keys(sessionContext.title).length === 0}
              loading={running}
              type="submit"
              block>
              Generate draft
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
          <div className={st.preview}>
            <h3 className={cns('h3-title c-gray-900')}>{sessionContext.title.label}</h3>
            <p className={cns('p-intro', st.previewText)}>{sessionContext.intro.label}</p>
            {sessionContext.paragraphs &&
              sessionContext.paragraphs.map((x, idx) => (
                <div className={st.previewSection} key={idx}>
                  <h4 className={cns('h4-title c-gray-900')}>{sessionContext.outline.label[idx]}</h4>
                  <p className={cns('p-small', st.previewText)} dangerouslySetInnerHTML={{ __html: x }} />
                </div>
              ))}

            <div className={st.previewCta}>
              <Button theme="gray" outline iconLeft="eye">
                Preview article
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Draft;
