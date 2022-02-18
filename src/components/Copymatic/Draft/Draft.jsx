import cns from 'classnames';
import st from './Draft.module.scss';
import { api } from '../Ideas/Ideas';
import { observer } from 'mobx-react';
import { Button, Input, SvgIcon } from '@ui';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';
import { SessionStoreContext, UiStoreContext } from '../../../store';
import Modal from '../../UI/Modal';
import { Editable, Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';

const maxLimit = 300;

const Draft = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);
  const sessionContext = useContext(SessionStoreContext);
  const [running, setRunning] = useState(false);

  const handleTitleChange = (value) => sessionContext.setTitle({ id: sessionContext.title.id, label: value });
  const handleIntroChange = (value) => sessionContext.setIntro({ id: sessionContext.intro.id, label: value });

  const generateDraft = () => {
    if (sessionContext.title.label && sessionContext.outline.label && !running) {
      setRunning(true);

      Promise.all(
        sessionContext.outline.label
          .filter((v) => v !== '')
          .map((v) => {
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

  const handleOutlineChange = (value, id) => {
    const l = [...sessionContext.outline.label.map((v, i) => (i === id ? value : v))];
    sessionContext.setOutline({ id: sessionContext.outline.id, label: l });
  };

  const handleOutlineDelete = (id) => {
    const l = [...sessionContext.outline.label.filter((v, i) => i !== id)];
    const p = [...sessionContext.paragraphs.filter((v, i) => i !== id)];
    sessionContext.setOutline({ id: sessionContext.outline.id, label: l });
    sessionContext.setParagraphs(p);
  };

  const handleAddOutline = () => {
    const l = [...sessionContext.outline.label];
    l.push('');
    sessionContext.setOutline({ id: sessionContext.outline.id, label: l });
  };

  useEffect(() => {
    const c = [
      {
        type: 'h1',
        children: [{ text: sessionContext.title.label }],
      },
      {
        type: 'p',
        children: [{ text: sessionContext.intro.label }],
      },
    ];

    sessionContext.paragraphs &&
      sessionContext.outline.label &&
      sessionContext.paragraphs.map((x, idx) => {
        c.push({
          type: 'h2',
          children: [{ text: sessionContext.outline.label[idx] }],
        });
        c.push({
          type: 'p',
          children: [{ text: x }],
        });
      });
    setValue(c);
  }, [sessionContext.title.label, sessionContext.intro.label, sessionContext.outline.label, sessionContext.paragraphs]);

  const [value, setValue] = useState([]);

  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case 'h1':
        return <h1 {...attributes}>{children}</h1>;
      case 'h2':
        return <h2 {...attributes}>{children}</h2>;
      default:
        return <p {...attributes}>{children}</p>;
    }
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
                <div className={st.outline} key={idx}>
                  <div className={st.outlineLabel}>Section {idx + 1}</div>
                  <div className={st.outlineInput}>
                    <Input
                      className={st.outlineInputWrapper}
                      type="textarea"
                      value={outline}
                      onChange={(v) => handleOutlineChange(v, idx)}
                      placeholder=""
                    />
                    <div className={st.outlineDelete} onClick={() => handleOutlineDelete(idx)}>
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
              disabled={Object.keys(sessionContext.title).length === 0 || sessionContext.outline.label.length === 0}
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
              sessionContext.outline.label &&
              sessionContext.paragraphs.map(
                (x, idx) =>
                  sessionContext.outline.label[idx] && (
                    <div className={st.previewSection} key={idx}>
                      <h4 className={cns('h4-title c-gray-900')}>{sessionContext.outline.label[idx]}</h4>
                      <p className={cns('p-small', st.previewText)} dangerouslySetInnerHTML={{ __html: x }} />
                    </div>
                  )
              )}

            <div className={st.previewCta}>
              <Button
                theme="gray"
                outline
                iconLeft="eye"
                onClick={() => {
                  uiContext.setModal('previewDraft');
                }}>
                Preview article
              </Button>
            </div>
          </div>
        </div>

        <Modal name="previewDraft" variant="main" modifier="fullheight" className={st.previewWrapper}>
          <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
            <Editable renderElement={renderElement} placeholder="This is your draft" spellCheck autoFocus />
          </Slate>
        </Modal>
      </div>
    </section>
  );
});

export default Draft;
