// hooks/useProvideAssets.js
import { useState } from "react";
import { getRenderFields } from "@/api/renders";
import { createAssetDataFromFilters } from "@/utils/CreateAssetDataFromFilters";

export const useProvideAssets = () => {
  const [assetData, setAssetData] = useState({
    isLoading: false,
    error: null,
    data: null,
  });

  // Function to call to initiate data fetch
  const fetchData = async (params, assetMetaConfig) => {
    setAssetData({ ...assetData, isLoading: true });
    const AccountDetails = assetMetaConfig.AccountContext;

    try {
      const renderData = await getRenderFields(params.render, [
        "downloads",
        "downloads.asset_category",
        "downloads.asset",
        "ai_articles",
        "ai_articles.asset",
        "ai_articles.asset_category",
      ]);

      const ASSETDATA = createAssetDataFromFilters(
        renderData.attributes.downloads.data,
        renderData.attributes.ai_articles.data,
        assetMetaConfig.compositionID,
        decodeURIComponent(params.key)
      );

      const AssetMetaData = {
        AssetName: assetMetaConfig.AssetName || "Default Asset Name",
        AssetType: assetMetaConfig.AssetType || "Default Asset Type",
        Video_asset_Category:
          assetMetaConfig.Video_asset_Category || "Default Video Category",
        Video_Asset_Name:
          assetMetaConfig.Video_Asset_Name || "Default Video Name",
        Image_asset_Category:
          assetMetaConfig.Image_asset_Category || "Default Image Category",
        Image_Asset_Name:
          assetMetaConfig.Image_Asset_Name || "Default Image Name",

        Writeup: assetMetaConfig.Writeup || ["Default Writeup"],
        WriteupID: AccountDetails.account.WriteupID,
        Category: decodeURIComponent(params.key),
        AccountType: AccountDetails.account.account_type,
        group_assets_by: AccountDetails.account.group_assets_by,
      };

      const OBJ = {
        AssetMetaData: AssetMetaData,
        decodeURIComponent: decodeURIComponent(params.key),
        ASSETDATA: ASSETDATA[0] || [],
        sport: AccountDetails.account.sport,
      };

      setAssetData({ isLoading: false, error: null, data: OBJ });
    } catch (error) {
      console.error("Failed to fetch asset data:", error);
      setAssetData({ isLoading: false, error, data: null });
    }
  };

  return { assetData, fetchData };
};
