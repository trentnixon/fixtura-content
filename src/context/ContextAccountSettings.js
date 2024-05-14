"use client";
// AccountSettings.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { RenderCount, getRenders } from "@/api/renders";
import {
  FindAccountLabel,
  FindAccountLogo,
  FindAccountType,
  FindAccountWriteupID,
  calculateRemainingDays,
} from "@/utils/actions";
import { FixturaLoader } from "@/components/UI/Loader";
import { getAccount } from "@/api/accounts";
import { useParams } from "next/navigation";

export const AccountSettings = createContext();

export const AccountSettingsProvider = ({ children }) => {
  const [formattedSettings, setFormattedSettings] = useState();
  const URLParams = useParams();

  useEffect(() => {
    const fetchAsyncData = async () => {
      try {
        const Count = await RenderCount(URLParams.render);
        const accountBasic = await getAccount(URLParams.id, [
          "account_type",
          "clubs",
          "associations",
          "sponsors",
          "subscription_tier",
        ]);
        if (!accountBasic) {
          throw new Error("accountBasic is null");
        }
        const accountBasicAttributes = accountBasic.attributes;
        console.log("accountBasicAttributes ", accountBasicAttributes)
        if (!accountBasicAttributes) {
          throw new Error("accountBasicAttributes is null");
        }
        const subscriptionTier =
          accountBasicAttributes.subscription_tier?.data?.attributes;
        if (!subscriptionTier) {
          throw new Error("subscriptionTier is null");
        }
        const SchedulerOBJ = accountBasicAttributes.scheduler?.data;
        if (!SchedulerOBJ) {
          throw new Error("SchedulerOBJ is null");
        }
        const trialInstanceOBJ =
          accountBasicAttributes.trial_instance?.data?.attributes;
        if (!trialInstanceOBJ) {
          throw new Error("trialInstanceOBJ is null");
        }

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
            sport: accountBasicAttributes.Sport?.toLowerCase() ?? "",
            hasCompletedStartSequence:
              accountBasicAttributes.hasCompletedStartSequence,
            isRightsHolder:
              accountBasicAttributes.isRightsHolder ?? false,
            isPermissionGiven:
              accountBasicAttributes.isPermissionGiven ?? false,
            group_assets_by:
              accountBasicAttributes.group_assets_by ?? "none",
          },
          subscription: {
            name: subscriptionTier.Name?.trim() ?? "",
          },
          scheduler: {
            schedulerID: SchedulerOBJ.id,
          },
          theme:
            accountBasicAttributes.theme?.data?.attributes?.Theme ?? "",
          trial_instance: {
            trialDaysRemaining: calculateRemainingDays(
              trialInstanceOBJ.endDate
            ),
            isActive: trialInstanceOBJ.isActive,
            startDate: trialInstanceOBJ.startDate,
            endDate: trialInstanceOBJ.endDate,
          },
          stats: {
            Count,
          },
          URLParams: URLParams,
        };

        // Update state with the new settings object
        console.log("newFormattedSettings", newFormattedSettings)
        setFormattedSettings(newFormattedSettings);
      } catch (error) {
        console.error(error);
      }
    };

    //console.log("fetchAsyncData checking?")
    //console.log(formattedSettings?.URLParams.key !== URLParams.key,formattedSettings?.URLParams.key,URLParams.key)
    if (!formattedSettings || formattedSettings?.URLParams.key !== URLParams.key) {
      console.log("running in here though?")
      fetchAsyncData();
    }
  }, [URLParams]);

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
