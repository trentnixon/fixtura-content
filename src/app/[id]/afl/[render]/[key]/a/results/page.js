"use client";

import AssetLayout from "@/components/AssetLayout/AssetLayout";
//import { createDataSet } from "@/utils/CreateAssetDataForUI";
import { getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";
import { useContext, useEffect } from "react";
import { FixturaSettings } from "@/context/ContextFixturaSettings";

export default async function DisplayWeekendResults() {
  console.log("Page.js - DisplayWeekendResults");
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "WeekendResultsAFL";
  useEffect(() => {
    setCompositionID(assetCompositionID);
  }, [assetCompositionID, setCompositionID]);
  if (!compositionID) return null;
  return <AssetLayout />;
}

// UTILS FUNC
export const generateMetadata = async ({ params }) => {
  const accountBasic = await getAccountFields(params.id, [
    "account_type",
    "clubs",
    "associations",
  ]);
  return {
    title: `Weekend Results | ${FindAccountLabel(accountBasic)} | ${
      accountBasic.attributes.Sport
    }`,
  };
};
