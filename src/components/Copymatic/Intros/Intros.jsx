import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';

import st from './Intros.module.scss';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';

const maxLimit = 300;

const Intros = ({ className }) => {
  const [title, setTitle] = useState('');
  const [radioGroup, setRadioGroup] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);

  const handleTitleChange = useCallback(
    (v) => {
      if (title.length <= maxLimit) {
        setTitle(v);
      }
    },
    [title, setTitle]
  );

  useEffect(() => {
    setRadioGroup([
      {
        id: 1,
        label:
          // eslint-disable-next-line prettier/prettier
          'When you’re looking for a cardiologist, how do you know if they’re right for you? There are tons of different options out there, so it can be hard to find the right one. But that doesn’t mean that they don\'t exist. In this guide, we’ll talk about what you should look for in a cardiologist and how to choose the best one for your needs. Read on to learn more about finding a cardiologist and what makes them such an important part of healthcare.',
      },
      {
        id: 2,
        label:
          'There are many doctors and specialists for your heart and cardiovascular needs out there, but few as important as a cardiologist. A cardiologist is a doctor who specializes in diagnosing and treating heart-related problems. They can diagnose and treat the following: irregular heartbeats, high blood pressure, chest pain, stroke or heart attack symptoms, congestive heart failure, congenital heart disease, and other types of cardiac arrhythmia. If you need to find a cardiologist near you for any of these conditions or anything else related to cardiac care, this guide will help you find the right one.',
      },
      {
        id: 3,
        label:
          'Finding a cardiologist is not as simple as it sounds. With so many choices and variables, it can be difficult to know where to look. The good news is that we’ve got your back! We’ve compiled a list of tips and tricks on how to find the best cardiologist for you. This blog will cover: - What to look for in a cardiologist - How to find their contact information - How to establish rapport with them.',
      },
      {
        id: 4,
        label:
          'Heart disease is the leading cause of death in the United States, accounting for one-third of all deaths. It is imperative to understand your individual risk factors and get screened by a physician if you are over 40 years old. Finding the right cardiologist can be difficult. These are some things you should look for when searching for a cardiologist near you.',
      },
      {
        id: 5,
        label:
          // eslint-disable-next-line quotes
          "Cardiovascular disease is the leading cause of death in the world. Yet, many still don’t know that they or a loved one might need a cardiologist. That’s why you should read this article and find out more information on how to find a cardiologist. There are many factors that can lead to cardiovascular disease such as high blood pressure and diabetes. If you have these conditions, it’s important for you to seek medical help right away, because they are both chronic diseases that require ongoing treatment. This is also important if you’ve experienced any symptoms of heart disease. If you experience chest pain or discomfort, shortness of breath, trouble breathing, or lightheadedness, these are all signs of heart disease! Don’t wait until it's too late - make an appointment with your cardiologist today.",
      },
      {
        id: 6,
        label:
          // eslint-disable-next-line quotes
          "When you’re looking for a cardiologist, how do you know if they’re right for you? There are tons of different options out there, so it can be hard to find the right one. But that doesn’t mean that they don't exist. In this guide, we’ll talk about what you should look for in a cardiologist and how to choose the best one for your needs. Read on to learn more about finding a cardiologist and what makes them such an important part of healthcare.",
      },
    ]);
  }, []);

  return (
    <section className={cns(st.container, className)}>
      <div className={st.grid}>
        <div className={st.col}>
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

          <div className={st.cta}>
            <Button type="submit" block>
              Generate Intros
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
                  {r.label}
                </Checkbox>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intros;
