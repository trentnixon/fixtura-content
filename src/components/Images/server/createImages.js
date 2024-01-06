import { getRenderFields } from "@/api/renders";
import { CreateImagesClient } from "@/components/AssetLayout/Image/createImages";
import { filterDownloads } from "@/utils/helpers";

export async function CreateImages({ params, Category, Type }) {
  const renderData = await getRenderFields(params.render, [
    "downloads",
    "downloads.asset_type",
    "downloads.asset_category",
  ]); 

  // Usage:
  const filteredDownloads = filterDownloads(
    renderData.attributes.downloads.data,
    Category,
    Type
  );

  return <CreateImagesClient ITEMS={filteredDownloads} />;
}
