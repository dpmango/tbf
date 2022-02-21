import axios from 'axios';
import cns from 'classnames';
import st from './Voiceover.module.scss';
import { SharedSpeaker } from '@c/Shared';
import React, { useEffect, useState } from 'react';

const lovoApiUrl = 'https://api.lovo.ai/v1';
const lovoApiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmM3YzRjN2E2NWNkMDAxMmNiMDY2OCIsImlhdCI6MTY0NTQ0Mjc3NjE4M30.MEBEULtFggw4aIy_u2ND3iEAoXaIspYpj3mcu_GTUjY';

export const lovo = axios.create({
  responseType: 'arraybuffer',
  withCredentials: false,
  baseURL: lovoApiUrl,
  timeout: 3600 * 1000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', apiKey: lovoApiKey },
});

export let source;
export const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const playStream = (buffer) => {
  source = audioCtx.createBufferSource();
  source.connect(audioCtx.destination);

  source.buffer = buffer;
  source.loop = false;
  source.start();
};

export const stopStream = () => {
  try {
    source.stop();
  } catch (e) {
    console.log(e);
  }
};

const Voiceover = ({ className }) => {
  const [speakers, setSpeakers] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const handleSpeakerSelect = (id) => setSelectedSpeaker(id);

  useEffect(() => {
    lovo
      .get('/skins?is_premium=true', { responseType: 'json' })
      .then((response) => {
        if (response.data && response.data.success) {
          const speakers = [];

          response.data.data.map((x, idx) => {
            const tags = '#' + x.tags.map((v) => v.content).join(' #');

            speakers.push({
              id: idx,
              avatar: tags.toLowerCase().includes('female')
                ? 'https://randomuser.me/api/portraits/women/' + idx + '.jpg'
                : 'https://randomuser.me/api/portraits/men/' + idx + '.jpg',
              name: x.name,
              tags: tags,
            });
          });

          setSpeakers(speakers);
        }
      })
      .catch((error) => console.log(error));
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
