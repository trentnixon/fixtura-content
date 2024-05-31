"use client";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";
export const dynamic = "force-dynamic";
export default async function DisplayWeekendResults() {
  console.log("Page.js - WeekendResults");
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "WeekendResults";
  useEffect(() => {
    setCompositionID(assetCompositionID);
  }, [assetCompositionID, setCompositionID]);
  if (!compositionID) return null;
  return <AssetLayout />;
} 