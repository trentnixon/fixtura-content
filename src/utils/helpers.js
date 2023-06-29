export const handleDownload = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "fixturaImage.jpg"; // or any name you want
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleVideoDownload = async (videoUrl) => {
  const response = await fetch(videoUrl);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "fixturaVideoDownload.mp4"; // or any name you want
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export const filterDownloads = (
  OBJ,
  Category = "Video options",
  Type = "upcoming"
) => {
  return OBJ.filter((asset) => {
    const assetCategoryName =
      asset.attributes.asset_category.data.attributes.Name;
    const assetTypeName = asset.attributes.asset_type.data.attributes.Name;

    return assetCategoryName === Category && assetTypeName === Type;
  });
};
