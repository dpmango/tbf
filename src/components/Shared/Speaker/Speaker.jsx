import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';

import st from './Speaker.module.scss';

const Speaker = ({ className, avatar, name, surname, tags, id, selected, modifier, onSelect }) => {
  return (
    <div className={cns(st.speaker, modifier && st[`_${modifier}`], className)}>
      <div className={st.avatar}>
        <img src={avatar} alt={name} />
      </div>
      <div className={st.content}>
        <div className={st.name}>
          {name} {surname}
        </div>
        <div className={st.tags}>{tags}</div>
        {onSelect && (
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
        )}
      </div>
    </div>
  );
};

export default Speaker;
