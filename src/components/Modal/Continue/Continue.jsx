import React, { useContext, useState, useCallback, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useToasts } from 'react-toast-notifications';

import { Modal, SvgIcon, Button } from '@ui';
import { UiStoreContext } from '@store';
import styles from './Continue.module.scss';
import { useEffect } from 'react';

const formInitial = {
  name: '',
  surname: '',
  email: '',
};

const Continue = observer(({ className }) => {
  const { modalParams } = useContext(UiStoreContext);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (modalParams) {
      setModalData(modalParams);
    }
  }, [modalParams]);

  return (
    <Modal name="continue" variant="narrow" className={className}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <SvgIcon name="alert-circle" />
        </div>
        {modalData && (
          <div className={styles.content}>
            <div className={styles.title}>{modalData.title}</div>
            <div className={styles.description}>{modalData.description}</div>
            <div className={styles.cta}>
              <Button theme="gray" outline variant="small">
                Cancel
              </Button>
              <Button theme="primary" variant="small">
                {modalData.ctaText}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
});

export default Continue;
