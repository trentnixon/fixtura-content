// hooks/useProvideAssets.js
import { getRenderFields } from "@/api/renders";
import { createAssetDataFromFilters } from "@/utils/CreateAssetDataFromFilters";
import { FindAccountType, FindAccountWriteupID } from "@/utils/actions";

// Assuming imports are done as shown in your snippet

export const createAssetOBJ = async (params, account, assetMetaConfig) => {
  const results = {};
  try {
    for (const [compositionID, config] of Object.entries(assetMetaConfig)) {
      const renderData = await getRender(params.render);
      const assetData = createAssetData(
        compositionID,
        renderData,
        params.key
      );

      const assetMetaData = formatAssetMetaData(config, params.key, account);
      const OBJ = {
        AssetMetaData: assetMetaData,
        decodeURIComponent: decodeURIComponent(params.key),
        useAssetData: assetData[0] || [],
        sport: account.attributes.Sport.toLowerCase(),
      };

      results[compositionID] = OBJ;
    }
  } catch (error) {
    console.error("Failed to fetch asset data:", error);
    return { data: null };
  }
  return { data: results };
};


// HELPERS
// Get Render Data
const getRender = async (render) => {
  return (await getRenderFields(render, [
    "downloads",
    "downloads.asset_category",
    "downloads.asset",
    "ai_articles",
    "ai_articles.asset",
    "ai_articles.asset_category",
  ])).attributes;
};

// Create Asset Data Based on CompositionID and Render Data
const createAssetData = (compositionID, useRender, key) => {
  return createAssetDataFromFilters(
    useRender.downloads.data,
    useRender.ai_articles.data,
    compositionID,
    decodeURIComponent(key)
  );
};

// Format Asset Meta Data with Account Information
const formatAssetMetaData = (config, key, account) => {
  return {
    AssetName: config.AssetName || "Default Asset Name",
    AssetType: config.AssetType || "Default Asset Type",
    Video_asset_Category: config.Video_asset_Category || "Default Video Category",
    Video_Asset_Name: config.Video_Asset_Name || "Default Video Name",
    Image_asset_Category: config.Image_asset_Category || "Default Image Category",
    Image_Asset_Name: config.Image_Asset_Name || "Default Image Name",
    Writeup: config.Writeup || ["Default Writeup"],
    WriteupID: FindAccountWriteupID(account),
    Category: decodeURIComponent(key),
    AccountType: FindAccountType(account),
    group_assets_by: account.attributes.group_assets_by,
  };
};

