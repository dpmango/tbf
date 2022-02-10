import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';
import { SharedSpeaker } from '@c/Shared';
import st from './Voiceover.module.scss';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';

const maxLimit = 300;

const Voiceover = ({ className }) => {
  const [speakers, setSpeakers] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const handleSpeakerSelect = useCallback((id) => {
    setSelectedSpeaker(id);
  }, []);

  useEffect(() => {
    setSpeakers([
      {
        id: 1,
        avatar: 'https://randomuser.me/api/portraits/women/64.jpg',
        name: 'Olivia',
        tags: '#Female #Middle-Aged #HIgh-Pitched #Calming',
      },
      {
        id: 2,
        avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
        name: 'James',
        tags: '#Male #Middle-Aged #Low-Pitched #Powerful',
      },
      {
        id: 3,
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        name: 'Lana',
        tags: '#Female #Middle-Aged #Medium-Pitched #Mild',
      },
      {
        id: 4,
        avatar: 'https://randomuser.me/api/portraits/women/61.jpg',
        name: 'Demi',
        tags: '#Female #Middle-Aged #Low-Pitched #Normal',
      },

      {
        id: 5,
        avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
        name: 'Candice',
        tags: '#Female #Middle-Aged #Low-Pitched #Mild',
      },
      {
        id: 6,
        avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
        name: 'Natalie',
        tags: '#Female #Middle-Aged #Low-Pitched #Calming',
      },
      {
        id: 7,
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        name: 'Peter',
        tags: '#Male #Middle-Aged #Low-Pitched #Normal',
      },
      {
        id: 8,
        avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
        name: 'Orlando',
        tags: '#Male #Middle-Aged #Low-Pitched #Normal',
      },
    ]);
  }, []);

  return (
    <section className={cns(st.container, className)}>
      <div className={st.grid}>
        {speakers &&
          speakers.map((speaker, idx) => (
            <SharedSpeaker
              {...speaker}
              selected={selectedSpeaker === speaker.id}
              onSelect={handleSpeakerSelect}
              key={speaker.id || idx}
            />
          ))}
      </div>
    </section>
  );
};

export default Voiceover;
