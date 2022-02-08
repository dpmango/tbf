import React, { useContext, useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';
import throttle from 'lodash/throttle';

import { SvgIcon, Button } from '@ui';
import { useOnClickOutside, useEventListener, useWindowSize } from '@hooks';
import { UiStoreContext } from '@store';

import styles from './Sidebar.module.scss';
import { ReactComponent as Logo } from '@assets/logo.svg';

const Sidebar = observer(({ className }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { width } = useWindowSize();

  const sidebarRef = useRef(null);

  const uiContext = useContext(UiStoreContext);

  // useOnClickOutside(
  //   sidebarRef,
  //   useCallback(
  //     (e) => {
  //       setMenuOpened(false);
  //     },
  //     [setMenuOpened]
  //   )
  // );

  return (
    <>
      <aside className={cns(styles.sidebar, styles.opened, className)} ref={sidebarRef}>
        <div className={styles.wrapper}>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>

          <ul className={styles.menu}>
            <li>
              <Link to="/">
                <SvgIcon name="home" />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <SvgIcon name="coin-stack" />
                <span>
                  Credits <i>3</i>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <SvgIcon name="users" />
                <span>Partner</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <SvgIcon name="benefits" />
                <span>Benefits</span>
              </Link>
            </li>
          </ul>

          <ul className={cns(styles.menu, styles._bottom)}>
            <li>
              <Link to="/">
                <SvgIcon name="life-buoy" />
                <span>Support</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <SvgIcon name="settings" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>

          <div className={styles.profile}>
            <div className={styles.profileAvatar}>
              <img src="/img/avatar.jpg" alt="your avatar" />
            </div>
            <div className={styles.profileContent}>
              <div className={styles.profileName}>Dr James Moriarty</div>
              <div className={styles.profileEmail}>moriarty@untitledui.com</div>
              <div className={styles.profileLogout}>
                <SvgIcon name="logout" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
});

export default Sidebar;
