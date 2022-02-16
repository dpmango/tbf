import React, { useCallback, useMemo, useState, memo } from 'react';
import cns from 'classnames';
import { useDropzone } from 'react-dropzone';

import { SvgIcon, Progress } from '@ui';
import st from './Upload.module.scss';

const Upload = ({ className, placeholder, file, ...props }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={cns(st.input, className, 'upload')}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {!file ? (
          <div className={st.uploderPlaceholder}>
            <div className={st.uploaderPlaceholderIcon}>
              <SvgIcon name="upload-cloud" />
            </div>
            <div className={st.uploaderPlaceholderLabel}>
              <span>Click to upload</span> or drag and drop
            </div>
            <div className={st.uploaderPlaceholderDesc}>{placeholder}</div>
          </div>
        ) : (
          <div className={cns(st.uploderProcess, file.progress === 100 && st._compleate)}>
            <div className={st.uploaderProcessIcon}>
              <SvgIcon name={file.icon || 'upload-cloud'} />
            </div>
            <div className={st.uploaderProcessContent}>
              <div className={st.uploaderProcessTitle}>{file.title}</div>
              <div className={st.uploaderProcessDescription}>{file.meta}</div>
              <div className={st.uploaderProcessBar}>
                <Progress progress={file.progress} inline={true} />
              </div>
            </div>
            <div className={st.uploaderProcessRemove}>
              <SvgIcon name="delete" />
            </div>
            <div className={st.uploaderProcessDone}>
              <SvgIcon name="checkmark" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Upload);
