import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox } from '@ui';
import { UiStoreContext } from '@store';

import st from './Progress.module.scss';

const Progress = ({ className, progress, inline }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <div className={cns(st.progress, inline && st._inline, className)}>
      <div className={st.progressBar}>
        <span className={st.progressValue} style={{ width: `${progress}%` }} />
      </div>
      <div className={st.progressLabel}>
        {progress}% {!inline && 'Uploaded'}
      </div>
    </div>
  );
};

export default Progress;
