import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import cns from 'classnames';
import Clipboard from 'react-clipboard.js';

import { SvgIcon, Button, Input } from '@ui';

import styles from './Invites.module.scss';
import InviteUser from './InviteUser';

const defaultUser = { name: '', surname: '', email: '', disabled: false };

const Invite = ({ className, invites }) => {
  const [users, setUsers] = useState([...invites, ...[defaultUser]] || [...[defaultUser]]);

  const handleUserAdd = useCallback(() => setUsers([...users, ...[defaultUser]]), [users]);

  const onShare = useCallback(() => {}, []);

  return (
    <section className={cns(styles.container, className)}>
      <div className="container">
        <div className={styles.grid}>
          {users && users.map((u, idx) => <InviteUser {...u} key={idx} onAddUser={handleUserAdd} />)}
        </div>

        <div className={styles.cta}>
          <Clipboard data-clipboard-text="https://tbf.com?ref=123" onSuccess={onShare}>
            <Button iconLeft="share">Share</Button>
          </Clipboard>
        </div>
      </div>
    </section>
  );
};

export default Invite;
