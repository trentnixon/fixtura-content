import JSZip from "jszip";

export const handleDownload = async (imageUrl) => {
  //console.log(`Fetching ${imageUrl}`);
  const response = await fetch(imageUrl, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  //console.log("Response:", response);

  const blob = await response.blob();

  //console.log("Blob:", blob);

  const url = URL.createObjectURL(blob);

  //console.log("Blob URL:", url);

  // Create a new URL object and extract the filename
  const urlObject = new URL(imageUrl);
  const filename = urlObject.pathname.split("/").pop();

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleVideoDownload = async (videoUrl, Name, callback) => {
  let validName = "default";

  if (Name && typeof Name === "string") {
    validName = Name.replace(/\s+/g, "_") // replace spaces with _
      .replace(/[^\w\-]+/g, "") // remove non-word chars
      .replace(/\_\_+/g, "_"); // replace multiple underscores with a single one
  }

  const response = await fetch(videoUrl, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
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
  AssetCategory = "Video options",
  Type = "upcoming",
  ImageType = "",
  Selected_Category
) => {
  return OBJ.filter((asset) => {
    const assetCategoryName =
      asset.attributes.asset_category.data.attributes.Name;
    const assetTypeName = asset.attributes.asset_type.data.attributes.Name;
    const assetType = asset.attributes.asset.data.attributes.Name;
    const grouping_category = asset.attributes?.grouping_category;

    /* console.log("Selected_Category", Selected_Category);
    console.log("grouping_category", grouping_category); */

    return (
      assetCategoryName === AssetCategory &&
      assetTypeName === Type &&
      assetType === ImageType &&
      grouping_category === Selected_Category
    );
  });
};

export const filterWriteUps = (writeUps, name = "Name", Selected_Category) => {
  /*console.log("writeUps", writeUps.length) */
  return writeUps.filter((writeUp) => {
    const AssetName = writeUp.attributes.asset.data.attributes.Name;
    const grouping_category = writeUp.attributes?.grouping_category;

    /*console.log("AssetName", AssetName, name);
    console.log("grouping_category", grouping_category, Selected_Category); */

    return AssetName === name && grouping_category === Selected_Category;
  });
};

export const handleDownloadAll = async (items) => {
  const zip = new JSZip();

  // Download all images and add them to the zip file
  const downloads = items.map(async (item, i) => {
    const response = await fetch(item.attributes.URL, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    const blob = await response.blob();

    // Get the filename from the URL
    const urlObject = new URL(item.attributes.URL);
    const filename = urlObject.pathname.split("/").pop();

    zip.file(filename, blob);
  });

  await Promise.all(downloads);

  // Extract common part of filename for the zip filename
  const firstUrlObject = new URL(items[0].attributes.URL);
  const firstFilename = firstUrlObject.pathname.split("/").pop();
  const zipFilename = firstFilename.split("_").slice(0, -1).join("_") + ".zip";

  // Generate the zip file and create a download link
  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = zipFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleDownloadAllFromArray = async (items) => {
  const zip = new JSZip();

  // Download all images and add them to the zip file
  const downloads = items.map(async (item, i) => {
    console.log("itemitemitem", item)
    const response = await fetch(item.url, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    const blob = await response.blob();

    // Get the filename from the URL
    const urlObject = new URL(item.url);
    const filename = urlObject.pathname.split("/").pop();

    zip.file(filename, blob);
  });

  await Promise.all(downloads);

  // Extract common part of filename for the zip filename
  const firstUrlObject = new URL(items[0].url);
  const firstFilename = firstUrlObject.pathname.split("/").pop();
  const zipFilename = firstFilename.split("_").slice(0, -1).join("_") + ".zip";

  // Generate the zip file and create a download link
  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = zipFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
