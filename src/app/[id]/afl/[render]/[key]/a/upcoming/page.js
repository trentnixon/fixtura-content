"use client";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
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
