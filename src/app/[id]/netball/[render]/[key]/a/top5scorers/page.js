"use client";

import AssetLayout from "@/components/AssetLayout/AssetLayout";
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