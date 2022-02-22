import cns from 'classnames';
import React, { useState } from 'react';
import st from './Voiceover.module.scss';
import { SharedSpeaker } from '@c/Shared';

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
  const speakers = [
    {
      id: 0,
      avatar: 'https://randomuser.me/api/portraits/women/0.jpg',
      name: 'Susan Cole',
      tags: '#Female #Young Adult #American #Engaging #Excited #Explainer #Ads',
    },
    {
      id: 1,
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      name: 'Rose Baker',
      tags: '#Female #Australian #Young Adult #Explainer #E-Learning #Ads',
    },
    {
      id: 2,
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      name: 'Austin Hopkins',
      tags: '#American #Male #Middle-Aged #Ad #Games #Low-Pitched #Powerful',
    },
    {
      id: 3,
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      name: 'Kenny Marlowe',
      tags: '#Australian #Male #Middle-Aged #Ad #E-Learning #Engaging #Excited',
    },
    {
      id: 4,
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      name: 'Fabineu Topshot',
      tags: '#Male #American #Cartoon #High-Pitched #Funny',
    },
    {
      id: 5,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      name: 'Tim Calkney HD',
      tags: '#American #Male #Middle-Aged #Ad #Cheerful #Powerful #Hard Sell',
    },
    {
      id: 6,
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      name: 'Richard Hall',
      tags: '#Male #American #Middle-Aged #Audiobooks #Low-Pitched',
    },
    {
      id: 7,
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      name: 'Sharon Huang HD',
      tags: '#Female #Young Adult #American #Distant #Gentle #Explainer #E-Learning #News',
    },
    {
      id: 8,
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      name: 'Natasha Williams',
      tags: '#American #Female #Middle-Aged #E-Learning #Narration #Classy #Informative #Tough Sell',
    },
    {
      id: 9,
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
      name: 'Shawn Prince',
      tags: '#Male #British #Audiobooks #Gentle #Senior',
    },
    {
      id: 10,
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      name: 'Shane Walter',
      tags: '#Male #Powerful #Trustworthy #Middle-Aged #Ad #E-Learning #British',
    },
    {
      id: 11,
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      name: 'Gary Inskeep',
      tags: '#Male #Game #Deep #Charismatic #American',
    },
    {
      id: 12,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      name: 'Suponji Bobu San',
      tags: '#Male #American #Cartoon #High-Pitched',
    },
    {
      id: 13,
      avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
      name: 'Kyle Snow',
      tags: '#Male #Young Adult #American #Ad #Explainer #E-Learning',
    },
    {
      id: 14,
      avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
      name: 'Jemima Taylor HD',
      tags: '#British #Female #Young Adult #Ad #E-Learning #Cheerful #Excited',
    },
    {
      id: 15,
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      name: 'Charlie Carter HD',
      tags: '#Male #American #Young Adult #E-Learning #Ads #Explainer',
    },
    {
      id: 16,
      avatar: 'https://randomuser.me/api/portraits/women/16.jpg',
      name: 'Victoria Douglas',
      tags: '#Female #American #Young Adult #Explainer #E-Learning #Audiobooks',
    },
    {
      id: 17,
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      name: 'Laura Agarwal',
      tags: '#Female #Young #Adult #American #Friendly #Gentle #Ad #Audiobook #Documentary',
    },
    {
      id: 18,
      avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
      name: 'Liz Olsen',
      tags: '#Female #Young Adult #American #Distant #Classy #Audiobook #Documentary #News',
    },
    {
      id: 19,
      avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
      name: 'Joey Holland HD',
      tags: '#American #Female #Child #Ad #Games #Cheerful #Excited',
    },
    {
      id: 20,
      avatar: 'https://randomuser.me/api/portraits/women/20.jpg',
      name: 'Sally Coleman HD',
      tags: '#American #Female #Young Adult #Ad #Cheerful #Engaging #Excited',
    },
    {
      id: 21,
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
      name: 'Kristen Hennington',
      tags: '#Australian #Female #Middle-Aged #E-Learning #Narration #Classy #Informative',
    },
    {
      id: 22,
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      name: 'Martha Sage',
      tags: '#American #Female #Middle-Aged #E-Learning #Gentle #Trustworthy #Warm',
    },
    {
      id: 23,
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      name: 'Toshio Mizuno',
      tags: '#American #Female #Child #Audiobooks #Games #Sad #Ominous',
    },
    {
      id: 24,
      avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
      name: 'Mickay Rat',
      tags: '#American #Male #Memes #Games #Excited #Funny',
    },
    {
      id: 25,
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
      name: 'Chad Taylor',
      tags: '#British #Male #Middle-Aged #Audiobooks #E-Learning #Low-Pitched #Powerful',
    },
    {
      id: 26,
      avatar: 'https://randomuser.me/api/portraits/men/26.jpg',
      name: 'Stuart Longstaff',
      tags: '#British #Male #Middle-Aged #Ad #News #Gentle #Trustworthy',
    },
    {
      id: 27,
      avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
      name: 'Cody Stewart',
      tags: '#American #Male #Middle-Aged #Ad #Audiobooks #Powerful #Warm',
    },
    {
      id: 28,
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      name: 'Caroline Hughes',
      tags: '#American #Female #Middle-Aged #Audiobooks #Documentary #Gentle #Haughty',
    },
    {
      id: 29,
      avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
      name: 'Nell Diallo',
      tags: '#South African #Male #Middle-Aged #Documentary #Narration #Hard Sell #Powerful',
    },
  ];

  return (
    <section className={cns(st.container, className)}>
      <div className={st.grid}>
        {speakers && speakers.map((speaker, idx) => <SharedSpeaker {...speaker} key={speaker.id || idx} />)}
      </div>
    </section>
  );
};

export default Voiceover;
