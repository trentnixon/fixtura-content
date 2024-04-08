"use client";

import AssetLayout from "@/components/AssetLayout/AssetLayout";

import { getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";

export default async function DisplayAFlUpcomingFixtures() {
  console.log("Page.js - DisplayAFlUpcomingFixtures");
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "UpComingAFLFixtures";
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
    title: `Upcoming Fixtures | ${FindAccountLabel(accountBasic)} | ${
      accountBasic.attributes.Sport
    }`,
  };
};
