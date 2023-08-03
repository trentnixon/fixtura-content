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

export const handleVideoDownload = async (videoUrl, Name, callback) => {
  let validName = "default";

  if (Name && typeof Name === "string") {
    validName = Name.replace(/\s+/g, '_') // replace spaces with _
                  .replace(/[^\w\-]+/g, '') // remove non-word chars
                  .replace(/\_\_+/g, '_');  // replace multiple underscores with a single one
  }

  const response = await fetch(videoUrl);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${validName}.mp4`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Delay the execution of callback
  setTimeout(callback, 5000);
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
