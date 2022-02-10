import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';

import st from './Voiceover.module.scss';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';

const maxLimit = 300;

const Voiceover = ({ className }) => {
  return (
    <section className={cns(st.container, className)}>
      <div className={st.grid}></div>
    </section>
  );
};

export default Voiceover;
