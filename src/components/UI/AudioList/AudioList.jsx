import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import cns from 'classnames';

import { Checkbox, SvgIcon } from '@ui';
import { useFirstRender } from '@hooks';

import ListItem from './ListItem';
import styles from './AudioList.module.scss';
import { SessionStoreContext } from '../../../store';

const AudioList = ({ children, className, title, list, syncComponentState, ...props }) => {
  const classComputed = cns(styles.container, className, 'audioList');
  const firstRender = useFirstRender();
  const sessionContext = useContext(SessionStoreContext);
  const [selectAll, setSelectAll] = useState(false); // toggle state
  const [selectedAudio, setSelectedAudio] = useState([]); // holds list of selected ID's

  // Single box select
  const handleBoxSelect = useCallback(
    (id) => {
      if (selectedAudio.includes(id)) {
        setSelectedAudio(selectedAudio.filter((x) => x !== id));
      } else {
        setSelectedAudio([...selectedAudio, id]);
      }
    },
    [selectedAudio]
  );

  // Toggle box select (effect)
  useEffect(() => {
    if (firstRender) return;
    const allIds = list && selectAll ? list.map((x) => x.id) : [];
    setSelectedAudio([...allIds]);
  }, [selectAll]);

  /*
    @prop syncComponentState
  */
  useEffect(() => {
    syncComponentState && syncComponentState({ selectAll, selectedAudio });
  }, [selectedAudio]);

  return (
    <div className={classComputed}>
      <div className={styles.head}>
        <div className={cns('h3-title', styles.headTitle)}>Cardiology - {sessionContext.title.label}</div>
        <div className={styles.headActions}>
          <Checkbox
            isChecked={selectAll && list.length === selectedAudio.length}
            onChange={() => setSelectAll(!selectAll)}>
            <span>Select All</span>
          </Checkbox>
          <div className={styles.headCounter}>{selectedAudio.length} / 300</div>
        </div>
      </div>

      <div className={styles.list}>
        {list &&
          list.map((x, idx) => (
            <ListItem
              key={x.id || idx}
              className={styles.listItem}
              selectedAudio={selectedAudio}
              onBoxSelect={handleBoxSelect}
              {...x}
            />
          ))}
      </div>
    </div>
  );
};

export default memo(AudioList);
