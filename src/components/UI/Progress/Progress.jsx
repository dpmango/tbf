import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox } from '@ui';
import { UiStoreContext } from '@store';

import st from './Progress.module.scss';

const Progress = ({ className, progress }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <div className={cns(st.progress, className)}>
      <div className={st.progressBar}>
        <span className={st.progressValue} style={{ width: `${progress}%` }} />
      </div>
      <div className={st.progressLabel}>{progress}% Uploaded</div>
    </div>
  );
};

export default Progress;
