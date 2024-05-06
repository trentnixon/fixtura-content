"use client";
// hooks/useActiveAssetType.js
import { useContext } from "react";
import { AssetContext } from "@/context/ContextAssetSettings";
import { FixturaSettings } from "@/context/ContextFixturaSettings";

export const GetActiveAssetType = () => {
  const assetContext = useContext(AssetContext);
  const { compositionID } = useContext(FixturaSettings);

  if (!assetContext || !compositionID) {
    console.error(
      "Asset context or compositionID is undefined",
      assetContext,
      compositionID
    );
    return null;
  }

  const activeAssetType = assetContext[compositionID];
  if (!activeAssetType) {
    console.error("compositionID not found in asset context", compositionID);
    return null;
  }

  return activeAssetType;
};
