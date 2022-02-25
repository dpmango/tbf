import axios from 'axios';
import cns from 'classnames';
import st from './Ideas.module.scss';
import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { SessionStoreContext } from '../../../store';
import { Button, Checkbox, Input, SvgIcon } from '@ui';
import sharedStyles from '@c/Copymatic/Copymatic.module.scss';

const API_BASE_URL = 'https://api2.buzz.fit/v1';
// const API_BASE_URL = 'http://api.buzz.d/v1';

export const api = axios.create({
  withCredentials: false,
  baseURL: API_BASE_URL,
  timeout: 120 * 1000, // 120s timeout
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

const Ideas = observer(({ className }) => {
  const sessionContext = useContext(SessionStoreContext);
  const [running, setRunning] = useState(false);
  const [topicSearch, setTopicSearch] = useState('');

  const reset = () => {
    // reset article title
    sessionContext.setTitles([]);
    sessionContext.setTitle({});

    // reset article intro
    sessionContext.setIntros([]);
    sessionContext.setIntro({});

    // reset outlines
    sessionContext.setOutline([]);
    sessionContext.setOutlines([]);

    // reset content
    sessionContext.setParagraphs([]);
  };

  const handleTopicSelect = (selected) => {
    sessionContext.setTopic(selected);
    sessionContext.setTopics([...sessionContext.topics.map((x) => ({ ...x, selected: x.id === selected.id }))]);
    reset();
  };

  const generateIdeas = () => {
    if (Object.keys(sessionContext.topic).length > 0 && !running) {
      setRunning(true);
      reset();

      api
        .post('/cm', { topic: sessionContext.topic.label, model: 'blog-titles' })
        .then((response) => {
          if (response.data && response.data.ideas) {
            let titles = [];
            for (let k in response.data.ideas) {
              titles.push({ id: k, label: response.data.ideas[k] });
            }
            reset();
            sessionContext.setTitles(titles);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setRunning(false));
    }
  };

  const handleAddTopic = (e) => {
    e.preventDefault();

    if (topicSearch && topicSearch.trim().length) {
      const topic = {
        id: sessionContext.topics[sessionContext.topics.length - 1].id + 1,
        label: topicSearch.trim(),
        selected: true,
      };
      sessionContext.setTopics([...sessionContext.topics, topic]);
      handleTopicSelect(topic);
      setTopicSearch('');
      sessionContext.setTitle({});
    }
  };

  return (
    <section className={cns(st.container, className)}>
      <div className={st.grid}>
        <div className={st.col}>
          <div className={st.topic}>
            <div className={sharedStyles.inputLabel}>
              <span>Topic</span>
              <i data-tip="Tooltip content">
                <SvgIcon name="info" />
              </i>
            </div>
            <div className={st.topicValue}>Your specialty is cardiology.</div>
          </div>

          <div className={st.topicCloud}>
            <p className={cns('p-lg', st.topicCloudInfo)}>
              Please type the topic you want to write about or select from our tags below.
            </p>
            <div className={st.topicCloudForm}>
              <form onSubmit={handleAddTopic}>
                <Input value={topicSearch} onChange={(v) => setTopicSearch(v)} placeholder="Type your own topic" />
                <Button variant="small" onClick={handleAddTopic}>
                  Add topic
                </Button>
              </form>
            </div>

            <ul className={st.topicCloudList}>
              {sessionContext.topics &&
                sessionContext.topics.map((x, idx) => (
                  <li
                    className={cns(x.selected && st._selected)}
                    onClick={() => handleTopicSelect(x)}
                    key={x.id || idx}>
                    {x.label}
                  </li>
                ))}
            </ul>
          </div>

          <div className={st.cta}>
            <Button
              disabled={Object.keys(sessionContext.topic).length === 0}
              loading={running}
              type="submit"
              block
              onClick={generateIdeas}>
              {running ? '' : 'Generate ideas'}
            </Button>
            <div className={sharedStyles.helper}>
              <i data-tip="Each generate costs a credit">
                <SvgIcon name="info" />
              </i>
              Each generate costs a credit
            </div>
          </div>
        </div>

        {/* col */}
        <div className={st.col}>
          <div className={cns(sharedStyles.radioGroup, st.radioGroup)}>
            {sessionContext.titles &&
              sessionContext.titles.map((r, idx) => (
                <Checkbox
                  type="radio"
                  key={r.id || idx}
                  isChecked={sessionContext.title.id === r.id}
                  onChange={() => {
                    sessionContext.setTitle(r);
                  }}>
                  {r.label}
                </Checkbox>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Ideas;
