import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';

import st from './Draft.module.scss';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';

const maxLimit = 300;

const Draft = ({ className }) => {
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [preview, setPreview] = useState([]);
  const [outlines, setOutlines] = useState([]);

  const handleTitleChange = useCallback(
    (v) => {
      if (title.length <= maxLimit) {
        setTitle(v);
      }
    },
    [title]
  );

  const handleIntroChange = useCallback(
    (v) => {
      if (intro.length <= maxLimit) {
        setIntro(v);
      }
    },
    [intro]
  );

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

  useEffect(() => {
    setPreview([
      {
        title: 'What to look for in a cardiologist?',
        intro:
          'Finding a cardiologist is not as simple as it sounds. With so many choices and variables, it can be difficult to know where to look. The good news is that we’ve got your back! We’ve compiled a list of tips and tricks on how to find the best cardiologist for you. This blog will cover: - What to look for in a cardiologist - How to find their contact information - How to establish rapport with them.',
      },
      {
        title: 'How to find the right doctor?',
        intro:
          'Finding a cardiologist is not as simple as it sounds. With so many choices and variables, it can be difficult to know where to look. The good news is that we’ve got your back! We’ve compiled a list of tips and tricks on how to find the best cardiologist for you. This blog will cover: - What to look for in a cardiologist - How to find their contact information - How to establish rapport with them.',
      },
      {
        title: 'What are other people saying about the cardiologist?',
        intro:
          'Finding a cardiologist is not as simple as it sounds. With so many choices and variables, it can be difficult to know where to look. The good news is that we’ve got your back! We’ve compiled a list of tips and tricks on how to find the best cardiologist for you. This blog will cover: - What to look for in a cardiologist - How to find their contact information - How to establish rapport with them.',
      },
      {
        title: 'Conclusion.',
        intro: `Finding a cardiologist is not as simple as it sounds. With so many choices and variables, it can be difficult to know where to look. The good news is that we’ve got your back! We’ve compiled a list of tips and tricks on how to find the best cardiologist for you. This blog will cover: - What to look for in a cardiologist - How to find their contact information - How to establish rapport with them.<br/><br/>
        Finding a cardiologist is not as simple as it sounds. With so many`,
      },
    ]);

    setOutlines([
      {
        id: 1,
        label: 'Section 1',
        value: 'How to find the right doctor?',
      },
      {
        id: 2,
        label: 'Section 2',
        value: 'How to find the right doctor?',
      },
      {
        id: 3,
        label: 'Section 3',
        value: 'What are other people saying about the cardiologist?',
      },
      {
        id: 4,
        label: 'Section 4',
        value: 'Conclusion.',
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
                {title.length} / {maxLimit}
              </div>
            </div>

            <Input
              value={title}
              onChange={handleTitleChange}
              placeholder="How to Find a Cardiologist - An Expert Guide."
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

            <Input type="textarea" rows={8} value={intro} onChange={handleIntroChange} placeholder="Intro ..." />
          </div>

          <div className={st.group}>
            <div className={sharedStyles.inputLabel}>
              <span>Article Outline</span>
              <i data-tip="tooltip content">
                <SvgIcon name="info" />
              </i>
              <span>*</span>
            </div>

            {outlines &&
              outlines.map((outline, idx) => (
                <div className={st.outline} key={outline.id || idx}>
                  <div className={st.outlineLabel}>{outline.label}</div>
                  <div className={st.outlineInput}>
                    <Input
                      type="textarea"
                      value={outline.value}
                      onChange={(v) => handleOutlineChange(v, outline.id)}
                      placeholder=""
                    />
                  </div>
                  <div className={st.outlineDelete} onClick={() => handleOutlineDelete(outline.id)}>
                    <SvgIcon name="delete" />
                  </div>
                </div>
              ))}

            <div className={st.addOutline} onClick={handleAddOutline}>
              <span>Add more</span>
              <SvgIcon name="plus-circle" />
            </div>
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
          <div className={st.preview}>
            {preview &&
              preview.map((x, idx) => (
                <div className={st.previewSection} key={x.id || idx}>
                  <h4 className={cns('h4-title c-gray-900')}>{x.title}</h4>
                  <p className={cns('p-small', st.previewText)} dangerouslySetInnerHTML={{ __html: x.intro }} />
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
};

export default Draft;
