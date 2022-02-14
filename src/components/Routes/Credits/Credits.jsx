import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { UiStoreContext } from '@store';
import { DashboardHead } from '@c/Dashboard';
import { BannerSharing, BannerPurchase } from '@c/Banner';
import { CreditsInvite } from '@c/Credits';
import { content } from './Content';

const BenefitsPage = observer(() => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <Helmet>
        <title>Your credits (3)</title>
      </Helmet>

      <DashboardHead includeDescription="Earn or Purchase Credits " />
      <BannerSharing />
      <CreditsInvite invites={content.invites} />
      <BannerPurchase className="mt-4" />
    </>
  );
});

export default BenefitsPage;
