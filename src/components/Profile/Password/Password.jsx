import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Button, Select, Input } from '@ui';

import st from './Password.module.scss';

const Settings = ({ className, steps, ...props }) => {
  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <section className={cns(st.container, className)} {...props}>
      <div className="container">
        <div className={st.head}>
          <div className={st.headContent}>
            <div className="h4-title">Password</div>
            <p className={st.headDescription}>Please enter your current password to change your password.</p>
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>Current password</div>
          <div className={st.sectionContent}>
            <Input type="password" placeholder="••••••••" value={curPassword} onChange={(v) => setCurPassword(v)} />
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>New password</div>
          <div className={st.sectionContent}>
            <Input
              type="password"
              placeholder="••••••••"
              helper="Your new password must be more than 8 characters."
              value={newPassword}
              onChange={(v) => setNewPassword(v)}
            />
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>Confirm new password</div>
          <div className={st.sectionContent}>
            <Input
              type="password"
              placeholder="••••••••"
              value={repeatPassword}
              onChange={(v) => setRepeatPassword(v)}
            />
          </div>
        </div>

        <div className={st.actions}>
          <Button outline variant="small">
            Cancel
          </Button>
          <Button variant="small">Update Password</Button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
