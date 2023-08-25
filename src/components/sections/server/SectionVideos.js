import {
  getWriteupsFieldsWithFilters,
  getWriteupsFromRender,
} from "@/api/getWriteup";
import { getRenderFields } from "@/api/renders";
import { FixturaSection } from "@/components/containers/Section";
import { filterDownloads } from "@/utils/helpers";
import { CreateVideoClient } from "@/components/Video/client/createVideo";
import { getAccountFields } from "@/api/accounts";
import { isSponsorsActive } from "@/utils/actions";
export default async function SectionVideos({ params, Title, Type, Path }) {
  //console.log(params);
  const Category = "Video options";
  const renderData = await getRenderFields(params.render, [
    "downloads",
    "downloads.asset_type",
    "downloads.asset",
    "downloads.asset_category", 
  ]);
 
  const accountBasic = await getAccountFields(params.id, [
    "sponsors",
    "subscription_tier"
  ]); 
  // Usage:
  const filteredDownloads = filterDownloads(
    renderData.attributes.downloads.data,
    Category,
    Type
  );

  //params.render
  const RenderWriteups = await getWriteupsFromRender(params.render, Path, Type);
 
  return (
    <>
      {filteredDownloads.map((video, i) => {
        return (
          <FixturaSection
            shade={1}
            Title={`Videos`}
            subTitle={video.attributes?.asset?.data?.attributes?.SubTitle}
            Icon={video.attributes?.asset?.data?.attributes?.Icon}
            key={i}
          > 
            <CreateVideoClient
              Category="Video options"
              Type={Type}
              ITEM={video.attributes}
              renderArticles={RenderWriteups.filteredData}
              description={video.attributes?.asset?.data?.attributes?.Blurb}
              subTitle={video.attributes?.asset?.data?.attributes?.SubTitle}
              hasSponsors={isSponsorsActive(accountBasic)}
            />
          </FixturaSection>
        );
      })}
    </>
  );
}