import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Input } from '@ui';

import styles from './InviteUser.module.scss';

const Invite = ({ className, name, surname, email, disabled, onAddUser, syncState }) => {
  const [inputName, setName] = useState(name || '');
  const [inputSurname, setSurname] = useState(surname || '');
  const [inputEmail, setEmail] = useState(email || '');

  useEffect(() => {
    syncState && syncState({ name, surname, email, disabled });
  }, [syncState, name, surname, email, disabled]);

  return (
    <div className={cns(styles.invite, className, 'invite')}>
      <Input label="First name" placeholder="First name" value={inputName} onChange={setName} disabled={disabled} />
      <Input label="Last name" placeholder="Last name" value={inputSurname} onChange={setSurname} disabled={disabled} />
      <Input
        label="Email"
        iconLeft="mail"
        iconRight="plus-circle"
        placeholder="Email"
        value={inputEmail}
        onChange={setEmail}
        disabled={disabled}
      />
      <Button theme="gray" iconLeft="plus-circle" onClick={onAddUser}>
        Add another
      </Button>
    </div>
  );
};

export default Invite;
