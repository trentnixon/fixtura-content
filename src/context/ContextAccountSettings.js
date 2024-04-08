"use client";
// AccountSettings.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { RenderCount, getRenders } from "@/api/renders";
import {
  FindAccountLabel,
  FindAccountLogo,
  FindAccountType,
  FindAccountWriteupID,
} from "@/utils/actions";
import { FixturaLoader } from "@/components/UI/Loader";

export const AccountSettings = createContext();

export const AccountSettingsProvider = ({ OBJ, children }) => {
  const [formattedSettings, setFormattedSettings] = useState();

  useEffect(() => {
    const fetchAsyncData = async () => {
      const Count = await RenderCount(OBJ.URLParams.render);

      // Continue fetching other async data and formatting the settings object

      const accountBasic = OBJ.accountBasic;
      const accountBasicAttributes = accountBasic.attributes;
      const subscriptionTier =
        accountBasicAttributes.subscription_tier.data.attributes;
      const SchedulerOBJ = accountBasicAttributes.scheduler.data;
      const trialInstanceOBJ =
        accountBasicAttributes.trial_instance.data.attributes;

      // Build the settings object with fetched and existing data
      const newFormattedSettings = {
        account: {
          accountId: accountBasic.id,
          account_type: FindAccountType(accountBasic),
          accountLabel: FindAccountLabel(accountBasic),
          accountLogo: FindAccountLogo(accountBasic),
          WriteupID: FindAccountWriteupID(accountBasic),
          isActive: accountBasicAttributes.isActive,
          name: accountBasicAttributes.FirstName,
          email: accountBasicAttributes.DeliveryAddress,
          sport: accountBasicAttributes.Sport.toLowerCase(),
          hasCompletedStartSequence:
            accountBasicAttributes.hasCompletedStartSequence,
          isRightsHolder: accountBasicAttributes.isRightsHolder,
          isPermissionGiven: accountBasicAttributes.isPermissionGiven,
          group_assets_by: accountBasicAttributes.group_assets_by,
        },
        subscription: {
          name: subscriptionTier.Name.trim(),
        },
        scheduler: {
          schedulerID: SchedulerOBJ.id,
        },
        theme: accountBasicAttributes.theme.data.attributes.Theme,
        trial_instance: {
          trialDaysRemaining: OBJ.trialDaysRemaining,
          isActive: trialInstanceOBJ.isActive,
          startDate: trialInstanceOBJ.startDate,
          endDate: trialInstanceOBJ.endDate,
        },
        stats: {
          Count,
        },
        URLParams: OBJ.URLParams,
      };

      // Update state with the new settings object
      setFormattedSettings(newFormattedSettings);
    };

    fetchAsyncData();
  }, [OBJ]);

  // Ensure the provider does not render its children until the asynchronous operation is complete
  if (!formattedSettings) {
    return <FixturaLoader />; // Or any other loading state representation
  }

  return (
    <AccountSettings.Provider value={formattedSettings}>
      {children}
    </AccountSettings.Provider>
  );
};

// Custom hook to use context
export const useAccountSettings = () => {
  const context = useContext(AccountSettings);
  if (context === undefined) {
    throw new Error(
      "useAccountSettings must be used within a AccountSettingsProvider"
    );
  }
  return context;
};
