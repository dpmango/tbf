import React, { useRef, useEffect, useState, useContext, useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import cns from 'classnames';

import { SessionStoreContext } from '@store';
import { Button, Input } from '@ui';

import { handleAuthRequestError } from './utils/requestHandlers';
import styles from './Login.module.scss';

const Login = () => {
  const history = useHistory();

  const [error, setError] = useState(null);
  const [passwordValue, setPassword] = useState('');

  const sessionContext = useContext(SessionStoreContext);

  const passRef = useRef(null);

  const handlePasswordChange = useCallback(
    (val) => {
      setPassword(val);
    },
    [setPassword]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      sessionContext.setSession({ sessionId: '123' });
      // .auth(passwordValue || '')
      // .then(() => {
      //   history.push('/');
      // })
      // .catch((_error) => {
      //   handleAuthRequestError(_error, setError);
      // });
    },
    [passwordValue]
  );

  useEffect(() => {
    // Focus input element
    passRef.current.focus();
  }, []);

  return (
    <div className="auth mt-2 mb-2">
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <div className={styles.title}>Авторизация</div>

        <Input
          label="Пароль"
          placeholder="Пароль"
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          inputRef={passRef}
        />

        {error && <div className={styles.error}>{error}</div>}

        <Button block className={cns(styles.btn, 'mt-2')} type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
};

export default memo(Login);
