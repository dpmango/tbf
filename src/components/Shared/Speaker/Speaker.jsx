import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';

import st from './Speaker.module.scss';

const Speaker = ({ className, avatar, name, tags, id, selected, onSelect }) => {
  return (
    <div className={cns(st.speaker, className)}>
      <div className={st.avatar}>
        <img src={avatar} alt={name} />
      </div>
      <div className={st.name}>{name}</div>
      <div className={st.tags}>{tags}</div>
      <div className={st.cta}>
        <Button theme="primary" variant="small" iconLeft="play-circle" block>
          <span>Listen to Voice</span>
        </Button>
        <Button
          theme="muted"
          className={cns(selected && st._selected)}
          onClick={() => onSelect(id)}
          variant="small"
          block
          iconRight={selected ? 'check-circle' : null}>
          {selected ? <span>Selected</span> : <span>Select voice</span>}
        </Button>
      </div>
    </div>
  );
};

export default Speaker;
