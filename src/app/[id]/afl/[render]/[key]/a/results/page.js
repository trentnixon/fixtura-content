"use client";
import AssetLayout from "@/components/AssetLayout/AssetLayout";

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
