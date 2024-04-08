"use client";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";

export default async function DisplayNetballWeekendResults() {
  console.log("Page.js - DisplayWeekendResults");
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "WeekendResultsNetball";
  useEffect(() => {
    setCompositionID(assetCompositionID);
  }, [assetCompositionID, setCompositionID]);
  if (!compositionID) return null;
  return <AssetLayout />;
}
