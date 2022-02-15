import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cns from 'classnames';
import { useDropzone } from 'react-dropzone';

import { SvgIcon, Button, Select, Input } from '@ui';

import st from './Settings.module.scss';
import { STATUS_CODES } from 'http';

const Settings = ({ className, steps, ...props }) => {
  const [honor, setHonor] = useState({ value: 1, label: 'Dr.' });
  const [name, setName] = useState('James');
  const [surname, setSurname] = useState('Moriarty');
  const [email, setEmail] = useState('moriarty@untitledui.com');
  const [title, setTitle] = useState('MD, MRCP');
  const [altEmail, setAltEmail] = useState('');
  // eslint-disable-next-line quotes
  const [bio, setBio] = useState("I'm a Cardiologist based in Melbourne, Australia. I specialise in heart surgeries.");

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section className={cns(st.container, className)} {...props}>
      <div className="container">
        <div className={st.head}>
          <div className={st.headContent}>
            <div className="h4-title">Personal info</div>
            <p className={st.headDescription}>Update your photo and personal details here.</p>
          </div>
          <div className={st.headActions}>
            <Button outline variant="sm">
              Cancel
            </Button>
            <Button variant="sm">Save</Button>
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>Name</div>
          <div className={st.sectionContent}>
            <div className={st.contentRows}>
              <Select value={honor} onChange={(v) => setHonor(v)} />
              <Input value={name} onChange={(v) => setName(v)} />
              <Input value={surname} onChange={(v) => setSurname(v)} />
            </div>
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>Email address</div>
          <div className={st.sectionContent}>
            <Input iconLeft="mail" value={email} onChange={(v) => setEmail(v)} />
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>
            Your photo
            <p>This will be publicly displayed on your video and profile.</p>
            <div className={st.sectionTooltip} data-tip="Tooltip content">
              <SvgIcon name="alert-circle" />
            </div>
          </div>
          <div className={st.sectionContent}>
            <div className={st.photo}>
              <div className={st.photoCurrent}>
                <img src="/img/avatar.jpg" alt="your avatar" />
              </div>
              <div className={st.photoUploader}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className={st.uploderPlaceholder}>
                    <div className={st.uploaderPlaceholderIcon}>
                      <SvgIcon name="upload-cloud" />
                    </div>
                    <div className={st.uploaderPlaceholderLabel}>
                      <span>Click to upload</span> or drag and drop
                    </div>
                    <div className={st.uploaderPlaceholderDesc}>PNG or JPG (min. 1400x1400px)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>Title</div>
          <div className={st.sectionContent}>
            <Input value={title} onChange={(v) => setTitle(v)} />
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>NPI #</div>
          <div className={st.sectionContent}>
            <Button iconLeft="user-check" theme="gray">
              1346336807
            </Button>
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>Specialty</div>
          <div className={st.sectionContent}>
            <Button iconLeft="heart" theme="gray">
              Interventional Cardiology
            </Button>
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>
            Alternative contact email
            <p>Enter an alternative email if you’d like to be contacted via a different email.</p>
          </div>
          <div className={st.sectionContent}>
            <Input
              iconLeft="mail"
              placeholder="example@example.com"
              value={altEmail}
              onChange={(v) => setAltEmail(v)}
            />
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>
            Bio
            <p>Write a short introduction.</p>
          </div>
          <div className={st.sectionContent}>
            <Input type="textarea" rows={4} value={bio} onChange={(v) => setBio(v)} />
          </div>
        </div>

        {/* section  */}
        <div className={st.section}>
          <div className={st.sectionLabel}>
            Portfolio projects
            <p>Share a few snippets of your work.</p>
          </div>
          <div className={st.sectionContent}></div>
        </div>

        <div className={st.actions}>
          <Button outline variant="small">
            Cancel
          </Button>
          <Button variant="small">Save</Button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
