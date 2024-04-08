"use client";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";

export default async function DisplayAFLLadder() {
  console.log("Page.js - DisplayAFLLadder");
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "AFLLadder";
  useEffect(() => {
    setCompositionID(assetCompositionID);
  }, [assetCompositionID, setCompositionID]);
  if (!compositionID) return null;
  return <AssetLayout />;
}