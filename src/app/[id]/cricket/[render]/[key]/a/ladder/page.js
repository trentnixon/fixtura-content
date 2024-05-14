"use client";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";

export const dynamic = "force-dynamic";

export default async function DisplayCricketLadder() {
  console.log("Page.js - Ladder");
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "Ladder";
  useEffect(() => {
    setCompositionID(assetCompositionID);
  }, [assetCompositionID, setCompositionID]);
  if (!compositionID) return null;
  return <AssetLayout />;
}
   