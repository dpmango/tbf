import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';

import st from './Ideas.module.scss';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';

const Ideas = ({ className, steps }) => {
  const [topic, setTopic] = useState('');
  const [topicSearch, setTopicSearch] = useState('');
  const [topicCloud, setTopicCloud] = useState([]);
  const [radioGroup, setRadioGroup] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);

  const handleTopicSelect = useCallback(
    (id) => {
      setTopicCloud([...topicCloud.map((x) => ({ ...x, selected: x.id === id }))]);
    },
    [topicCloud]
  );

  const handleAddTopic = useCallback(() => {
    if (topicSearch && topicSearch.trim().length) {
      setTopicCloud([...topicCloud, { id: topicCloud[topicCloud.length - 1].id + 1, label: topicSearch.trim() }]);
      setTopicSearch('');
    }
  }, [topicSearch, topicCloud]);

  useEffect(() => {
    setTopic('Your speciality is cardiology');
    setTopicCloud([
      { id: 1, label: 'Heart Rhythm and Arrhythmias' },
      { id: 2, label: 'HIV and Heart Disease' },
      { id: 3, label: 'Hypertension' },
      { id: 4, label: 'Imaging' },
      { id: 5, label: 'Interventional Cardiology', selected: true },
      { id: 6, label: 'Myocardial Biology/Heart Failure' },
      { id: 7, label: 'Myocarditis' },
      { id: 8, label: 'Aortic disease' },
      { id: 9, label: 'Preventive Cardiology' },
    ]);
    setRadioGroup([
      { id: 1, label: 'How to Find a Cardiologist - An Expert Guide.' },
      { id: 2, label: 'The Best Cardiology Jobs in the Medical Science Field.' },
      { id: 3, label: 'How to Tell Whether You Are Suffering from a Heart Problem.' },
      { id: 4, label: 'How to Become a Cardiologist: A Guide for Medical Science Students.' },
      { id: 5, label: 'The Best Cardiology Jobs in the Medical Science Field.' },
      { id: 6, label: 'The Best Cardiology Jobs in the Medical Science Field.' },
      { id: 7, label: 'How to Tell Whether You Are Suffering from a Heart Problem.' },
      { id: 8, label: 'How to Become a Cardiologist: A Guide for Medical Science Students.' },
      { id: 9, label: 'How to Tell Whether You Are Suffering from a Heart Problem.' },
    ]);
  }, []);

  return (
    <section className={cns(st.container, className)}>
      <div className={st.grid}>
        <div className={st.col}>
          <div className={st.topic}>
            <div className={sharedStyles.inputLabel}>
              <span>Topic</span>
              <i data-tip="tooltip content">
                <SvgIcon name="info" />
              </i>

              <span>*</span>
            </div>
            <div className={st.topicValue}>{topic}</div>
          </div>

          <div className={st.topicCloud}>
            <p className={cns('p-lg', st.topicCloudInfo)}>
              Please type the topic you want to write about or select from our tags below.
            </p>
            <div className={st.topicCloudForm}>
              <Input value={topicSearch} onChange={(v) => setTopicSearch(v)} placeholder="Type your own topic..." />
              <Button variant="small" onClick={handleAddTopic}>
                Add Topic
              </Button>
            </div>

            <ul className={st.topicCloudList}>
              {topicCloud &&
                topicCloud.map((x, idx) => (
                  <li
                    className={cns(x.selected && st._selected)}
                    onClick={() => handleTopicSelect(x.id)}
                    key={x.id || idx}>
                    {x.label}
                  </li>
                ))}
            </ul>
          </div>

          <div className={st.cta}>
            <Button type="submit" block>
              Generate Ideas
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
          <div className={cns(sharedStyles.radioGroup, st.radioGroup)}>
            {radioGroup &&
              radioGroup.map((r, idx) => (
                <Checkbox
                  type="radio"
                  key={r.id || idx}
                  isChecked={selectedRadio === r.id}
                  onChange={() => setSelectedRadio(r.id)}>
                  {r.label}
                </Checkbox>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ideas;
