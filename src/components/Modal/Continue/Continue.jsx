import React, { useContext, useState, useCallback, useMemo, Children } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useToasts } from 'react-toast-notifications';

import { Modal, SvgIcon, Button } from '@ui';
import { UiStoreContext } from '@store';
import styles from './Continue.module.scss';
import { useEffect } from 'react';

const Continue = observer(({ className, onCtaClick, children }) => {
  const { modalParams } = useContext(UiStoreContext);
  const uiContext = useContext(UiStoreContext);

  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (modalParams) {
      setModalData(modalParams);
    }
  }, [modalParams]);

  return (
    <Modal name="continue" variant="narrow" className={className}>
      {modalData && (
        <div className={styles.container}>
          <div className={cns(styles.icon, modalData.iconType && styles[modalData.iconType])}>
            <SvgIcon name={modalData.icon} key={modalData.icon} />
          </div>

          <div className={styles.content}>
            <div className={styles.title}>{modalData.title}</div>
            <div className={styles.description}>{modalData.description}</div>
            <div className={styles.body}>{children}</div>
            <div className={styles.cta}>
              <Button theme="gray" outline variant="small" onClick={() => uiContext.resetModal()}>
                Cancel
              </Button>
              <Button theme="primary" variant="small" onClick={() => onCtaClick(modalData.action)}>
                {modalData.ctaText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
});

export default Continue;
