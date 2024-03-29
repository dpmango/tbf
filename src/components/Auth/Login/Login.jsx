import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import cns from 'classnames';
import { useToasts } from 'react-toast-notifications';

import { SessionStoreContext } from '@store';
import { Button, Input } from '@ui';
import styles from './Login.module.scss';
import { ReactComponent as Logo } from '@assets/logo.svg';

const formInitial = {
  email: '',
  password: '',
};

const Login = () => {
  const history = useHistory();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sessionContext = useContext(SessionStoreContext);

  // const passRef = useRef(null);

  const handleValidation = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Please enter your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter a valid email';
    } else if (!values.password) {
      errors.password = 'Please enter your password';
    } else if (values.password.length <= 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    return errors;
  };

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      if (loading) {
        return;
      }

      sessionContext.setSession({ sessionId: '123' });
      // .auth(passwordValue || '')
      // .then(() => {
      //   history.push('/');
      // })
      // .catch((_error) => {
      //   handleAuthRequestError(_error, setError);
      // });
    },
    [loading]
  );

  // useEffect(() => {
  //   // Focus input element
  //   passRef.current.focus();
  // }, []);

  return (
    <div className={styles.container}>
      <Formik initialValues={formInitial} validateOnChange={false} validate={handleValidation} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldError }) => (
          <Form className={styles.wrapper}>
            <div className={styles.head}>
              <Link to="/" className={styles.logo}>
                <Logo />
              </Link>

              <div className={cns('h2-title', styles.title)}>Log In</div>
              {/* <p className="p-regular">Start your 30-day free trial.</p> */}
            </div>

            <div className={styles.group}>
              <Field type="text" name="email">
                {({ field, form: { setFieldValue }, meta }) => (
                  <Input
                    label="Email*"
                    type="email"
                    placeholder="Enter your email"
                    value={field.value}
                    error={meta.touched && meta.error}
                    onChange={(v) => {
                      setFieldValue(field.name, v);
                      setFieldError(field.name);
                    }}
                  />
                )}
              </Field>
            </div>

            <div className={styles.group}>
              <Field type="text" name="password">
                {({ field, form: { setFieldValue }, meta }) => (
                  <Input
                    label="Password*"
                    type="password"
                    placeholder="Enter your password"
                    value={field.value}
                    error={meta.touched && meta.error}
                    onChange={(v) => {
                      setFieldValue(field.name, v);
                      setFieldError(field.name);
                    }}
                  />
                )}
              </Field>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <Button block className={cns(styles.btn, 'mt-1')} type="submit">
              Get Started
            </Button>

            <div className={styles.helper}>
              Do not have an account?&nbsp;
              <Link to="/signup">Signup</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default memo(Login);
