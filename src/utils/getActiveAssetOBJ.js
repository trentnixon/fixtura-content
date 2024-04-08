import { AssetContext } from "@/context/ContextAssetSettings";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext } from "react";

export const getActiveAssetType = () => {
    const assetContext = useContext(AssetContext);
    const { compositionID } = useContext(FixturaSettings);
    if (!assetContext || !compositionID) {
        console.error("Asset context or compositionID is undefined", assetContext, compositionID);
        return null;
    }
    const activeAssetType = assetContext[compositionID];
    if (!activeAssetType) {
        console.error("compositionID not found in asset context", compositionID);
        return null;
    }
    console.log("useAssetContext ", activeAssetType);
    return activeAssetType;
}

