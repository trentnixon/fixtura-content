
// Assuming these imports are correct and exist in your project
import { AssetContext } from "@/context/ContextAssetSettings";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext } from "react";

export const useActiveAssetType = () => {
  const assetContext = useContext(AssetContext);
  const { compositionID } = useContext(FixturaSettings);

  console.log("compositionID ", compositionID)
  console.log("assetContext ", assetContext)

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
