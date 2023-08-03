import { getRenderFields } from "@/api/renders";
import { CreateImagesClient } from "@/components/Images/client/createImages";
import { filterDownloads } from "@/utils/helpers";
//import { CreateImages } from "@/components/Images/server/createImages";
import { FixturaSection } from "@/components/containers/Section";
export default async function SectionImages({ params, Title, Type }) {
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

  //console.log(filteredDownloads[0]);
  if(filteredDownloads[0]?.attributes?.asset?.data?.attributes?.Name === undefined)
        return false;
  return (
    <FixturaSection
    shade={1}
      Title={`Images : ${filteredDownloads[0]?.attributes?.asset?.data?.attributes?.Name}`}
      subTitle={
        filteredDownloads[0]?.attributes?.asset?.data?.attributes?.SubTitle
      }
      Icon={filteredDownloads[0]?.attributes?.asset?.data?.attributes?.Icon}
    >
      <CreateImagesClient ITEMS={filteredDownloads} />
    </FixturaSection>
  );
}
