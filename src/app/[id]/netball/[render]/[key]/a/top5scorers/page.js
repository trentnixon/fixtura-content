"use client";

import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";

export default async function DisplayTop5NetballScorers({ params }) {
  console.log("Page.js - DisplayTop5NetballScorers");
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "Top5NetballScorers";
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
    title: `Top 5 Run Scorers | ${FindAccountLabel(accountBasic)} | ${
      accountBasic.attributes.Sport
    }`,
  };
};
