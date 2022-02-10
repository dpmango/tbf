import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input, AudioList } from '@ui';

import st from './Convert.module.scss';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';
import { mockAudioList } from './Content';

const Convert = ({ className }) => {
  return (
    <section className={cns(st.container, className)}>
      <AudioList title="Cardiology - Heart Disease" list={mockAudioList} />
    </section>
  );
};

export default Convert;
