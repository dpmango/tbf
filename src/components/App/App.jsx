import React, { useCallback, useContext } from 'react';
import ReactTooltip from 'react-tooltip';
import { observer } from 'mobx-react-lite';
import { ToastProvider } from 'react-toast-notifications';

import { SessionStoreContext } from '@store';
import { LOCAL_STORAGE_SESSION } from '@config/localStorage';
import { Loader, LoaderContextProvider, Toast } from '@ui';
import { useEventListener } from '@hooks';

import Routes from '@c/Routes';

const App = observer(() => {
  const sessionContext = useContext(SessionStoreContext);

  const persistTabsStore = useCallback((e) => {
    if (e.key === LOCAL_STORAGE_SESSION) {
      sessionContext.hydrateStore();
    }
  }, []);

  useEventListener('storage', persistTabsStore);

  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={10000} components={{ Toast: Toast }}>
      <LoaderContextProvider>
        <Routes />
        <Loader />
        <ReactTooltip html={true} effect="solid" backgroundColor="#3D3D46" textColor="#FFFFFF" />
      </LoaderContextProvider>
    </ToastProvider>
  );
});

export default App;
