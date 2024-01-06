import { filterDownloads, filterWriteUps } from "@/utils/helpers";

export const createDataSet = (renderData, AssetMetaData) => {
  const filteredVideoDownloads = filterDownloads(
    renderData.downloads.data,
    AssetMetaData.Video_asset_Category,
    AssetMetaData.AssetType,
    AssetMetaData.Video_Asset_Name,
    AssetMetaData.Category
  );




  const filteredImageDownloads = filterDownloads(
    renderData.downloads.data,
    AssetMetaData.Image_asset_Category,
    AssetMetaData.AssetType,
    AssetMetaData.Image_Asset_Name,
    AssetMetaData.Category
  );

  const filteredWriteups = filterWriteUps(
    renderData.gtp_3_reports.data,
    AssetMetaData.Writeup,
    AssetMetaData.Category
  );

  const ImageURLS = filteredImageDownloads.map((item) => item.attributes.URL);

  return {
    Video: filteredVideoDownloads,
    Image: ImageURLS,
    Articles: filteredWriteups,
  };
};