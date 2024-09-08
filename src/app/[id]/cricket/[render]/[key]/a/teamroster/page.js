"use client";

import { getRenders } from "@/api/renders";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { RequestTeamRosterForRender } from "@/components/AssetLayout/Image/createTeamRoster";
import { useAccountSettings } from "@/context/ContextAccountSettings";

import { useActiveAssetType } from "@/Hooks/useActiveAssetType";
import { useContext, useEffect } from "react";
export const dynamic = "force-dynamic";
export default async function DisplayRosterPoster() {
  console.log("Page.js - DisplayRosterPoster");
  const assetCompositionID = "RosterPoster";

  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const activeAssetType = useActiveAssetType();
  const AccountSettings = useAccountSettings();

/*   console.log("AccountSettings ", AccountSettings);
  console.log("DisplayRosterPoster activeAssetType ", activeAssetType);
  console.log("graphics ", activeAssetType?.useAssetData?.graphics); */
  const CompleteRender = await getRenders(AccountSettings.URLParams.render);
  setCompositionID(assetCompositionID);

  console.log("CompleteRender ", CompleteRender);
  if (!compositionID) return null;
  return (
    <>
      {activeAssetType.AssetMetaData.AccountType === "Club" ? (
        <RequestTeamRosterForRender
          Render={AccountSettings.URLParams.render}
          CompleteRender={CompleteRender}
        />
      ) : (
        false
      )}
    </>
  );
}
