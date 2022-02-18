import { makeAutoObservable, runInAction } from 'mobx';

import { LOCAL_STORAGE_SESSION } from '@config/localStorage';
import service from './api-service';

export default class SessionStore {
  sessionId = null;
  sessionNumber = null;
  // CM step 1
  topics = [
    { id: 1, label: 'Heart Rhythm and Arrhythmias' },
    { id: 2, label: 'HIV and Heart Disease' },
    { id: 3, label: 'Hypertension' },
    { id: 4, label: 'Imaging' },
    { id: 5, label: 'Interventional Cardiology' },
    { id: 6, label: 'Heart Failure' },
    { id: 7, label: 'Electrocardiogram' },
    { id: 8, label: 'Aortic disease' },
    { id: 9, label: 'Preventive Cardiology' },
  ];
  topic = {};

  titles = [];
  title = {};

  intros = [];
  intro = {};

  outlines = [];
  outline = [];

  paragraphs = [];

  constructor() {
    makeAutoObservable(this);

    this.init();
  }

  // inner actions
  setSession(newSession) {
    const { sessionId, sessionNumber } = newSession;

    runInAction(() => {
      this.sessionId = sessionId;
      this.sessionNumber = sessionNumber;

      localStorage.setItem(LOCAL_STORAGE_SESSION, JSON.stringify(newSession));
    });
  }

  setTopic(data) {
    runInAction(() => (this.topic = data));
  }

  setTopics(data) {
    runInAction(() => (this.topics = data));
  }

  setTitle(data) {
    runInAction(() => (this.title = data));
  }

  setTitles(data) {
    runInAction(() => (this.titles = data));
  }

  setIntro(data) {
    runInAction(() => (this.intro = data));
  }

  setIntros(data) {
    runInAction(() => (this.intros = data));
  }

  setOutline(data) {
    runInAction(() => (this.outline = data));
  }

  setOutlines(data) {
    runInAction(() => (this.outlines = data));
  }

  setParagraphs(data) {
    runInAction(() => (this.paragraphs = data));
  }

  // api actions
  /**
   @action init
   @description
   сперва пытаемся получить сессию из localStorage либо создаем новую
   делаем запрос на alive сессии
   при ошибках пересоздаем сессию
   **/
  async init() {
    // migration
    let useMigration = false;
    let sessionId = null;
    let sessionNumber = null;

    const versionsList = ['session_0.0.1'];
    versionsList.reverse().every((key) => {
      const lsSession = localStorage.getItem(key);
      if (lsSession) {
        const lsSessionObj = JSON.parse(lsSession);

        sessionId = lsSessionObj.sessionId;
        sessionNumber = lsSessionObj.sessionNumber;

        useMigration = true;

        return false;
      }

      return true;
    });

    // уже запомнили в переменную, очищаем старые версии
    versionsList.forEach((key) => {
      localStorage.removeItem(key);
    });

    if (localStorage.getItem(LOCAL_STORAGE_SESSION) || useMigration) {
      if (localStorage.getItem(LOCAL_STORAGE_SESSION)) {
        // даже если используются миграция, в приоритете данные из актуальной версии LS
        const lsSession = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSION));

        sessionId = lsSession.sessionId;
        sessionNumber = lsSession.sessionNumber;
      }

      runInAction(() => {
        this.sessionId = sessionId;
        this.sessionNumber = sessionNumber;
      });

      let newSessionOnErr = true;
      try {
        await this.aliveSession({ sessionId });
      } catch (err) {
        if (newSessionOnErr && err.response && [400, 404].includes(err.response.status)) {
          await this.createSession();
        }
      }
    } else {
      await this.createSession();
    }
  }

  async createSession() {
    // localStorage.removeItem(LOCAL_STORAGE_SESSION);
    const [err, data] = await service.create();

    if (err) throw err;

    const { sessionId, sessionNumber } = data;

    this.setSession({ sessionId, sessionNumber });

    return data;
  }

  async aliveSession(req) {
    const [err, result] = await service.alive(req);

    if (err) throw err;

    return result;
  }

  // multitab ls feature
  hydrateStore() {
    const lsSession = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSION));

    const { sessionId, sessionNumber } = lsSession;

    runInAction(() => {
      this.sessionId = sessionId;
      this.sessionNumber = sessionNumber;
    });

    localStorage.setItem(LOCAL_STORAGE_SESSION, localStorage.getItem(LOCAL_STORAGE_SESSION));
  }
}
