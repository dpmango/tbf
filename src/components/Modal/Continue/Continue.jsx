import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { Button, Modal, SvgIcon } from '@ui';
import { UiStoreContext } from '@store';
import styles from './Continue.module.scss';

const Continue = observer(({ className, onCtaClick, cta, children }) => {
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
            {cta && (
              <div className={styles.cta}>
                <Button theme="gray" outline variant="small" onClick={() => uiContext.resetModal()}>
                  Cancel
                </Button>
                <Button theme="primary" variant="small" onClick={() => onCtaClick(modalData.action)}>
                  {modalData.ctaText}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
});

export default Continue;
