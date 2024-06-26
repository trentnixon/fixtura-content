"use client";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";

export default async function Upage() {
  console.log("Page.js - DisplayNetBallUpcomingFixtures");
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "UpComingNetBallFixtures";
  useEffect(() => {
    setCompositionID(assetCompositionID);
  }, [assetCompositionID, setCompositionID]);
  if (!compositionID) return null;
  return <AssetLayout />;
}
 