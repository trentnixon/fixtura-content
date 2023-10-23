import { getWriteupsFromRender } from "@/api/getWriteup";
import { getRenderFields } from "@/api/renders";
import { FixturaSection } from "@/components/containers/Section";
import { filterDownloads } from "@/utils/helpers";
import { CreateVideoClient } from "@/components/Video/client/createVideo";
import { getAccount, getAccountFields } from "@/api/accounts";
import { FindAccountType, isSponsorsActive } from "@/utils/actions";
export default async function SectionVideos({
  params,
  Title,
  Type,
  Path,
  GroupBy,
}) {
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
    "subscription_tier",
  ]);

  const account = await getAccount(params.id);
  const AccountType = FindAccountType(account);
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
        if (video.attributes.grouping_category === GroupBy)
          return (
            <FixturaSection
              shade={0}
              Title={Title}
              subTitle={video.attributes?.asset?.data?.attributes?.SubTitle}
              Blurb={video.attributes?.asset?.data?.attributes?.Blurb}
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
                GroupBy={GroupBy}
                AccountType={AccountType}
              />
            </FixturaSection>
          );
      })}
    </>
  );
}
