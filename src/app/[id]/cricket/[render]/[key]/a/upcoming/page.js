"use client";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";

export const dynamic = "force-dynamic";

export default async function DispayCricketUpcomingPage() {
  console.log("Page.js - UpComingFixtures");
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "UpComingFixtures";
  useEffect(() => {
    setCompositionID(assetCompositionID);
  }, [assetCompositionID, setCompositionID]);
  if (!compositionID) return null;
  return <AssetLayout />; 
}
