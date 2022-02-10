import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { SvgIcon, Checkbox } from '@ui';
import { useFirstRender } from '@hooks';

import ListItem from './ListItem';
import styles from './AudioList.module.scss';

const AudioList = ({ children, className, title, list, syncComponentState, ...props }) => {
  const classComputed = cns(styles.container, className, 'audioList');
  const firstRender = useFirstRender();

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
        <SvgIcon name="plus-circle" />
        <div className={cns('h3-title', styles.headTitle)}>{title}</div>
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
              className={styles.listItem}
              key={x.id || idx}
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
