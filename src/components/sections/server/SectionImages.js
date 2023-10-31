import { getRenderFields } from "@/api/renders";
import { CreateImagesClient } from "@/components/Images/client/createImages";
import { filterDownloads } from "@/utils/helpers";

function groupByAssetName(downloads) {
  return downloads.reduce((acc, item) => {
    const assetName = item.attributes.asset.data.attributes.Name;
    if (!acc[assetName]) {
      acc[assetName] = [];
    }
    acc[assetName].push(item);
    return acc;
  }, {});
}

export default async function SectionImages({ params, Title, Type, GroupBy }) {
  //console.log("IMAGE GroupBy", GroupBy)
  const Category = "Image options";
  const renderData = await getRenderFields(params.render, [
    "downloads",
    "downloads.asset_type",
    "downloads.asset",
    "downloads.asset_category",
  ]);

  // Usage:
  const filteredDownloads = filterDownloads(
    renderData.attributes.downloads.data,
    Category,
    Type
  );

  const groupedDownloads = groupByAssetName(filteredDownloads);

  if (Object.keys(groupedDownloads).length === 0) {
    return false;
  }

  if (
    filteredDownloads[0]?.attributes?.asset?.data?.attributes?.Name ===
    undefined
  )
    return false;
  return (
    <>
      {Object.entries(groupedDownloads).map(([label, items]) => (
        <CreateImagesClient
          key={label}
          ITEMS={items}
          label={label}
          GroupBy={GroupBy}
        />
      ))}
    </>
  );
} 
