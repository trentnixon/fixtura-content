import { getWriteupsFieldsWithFilters } from "@/api/getWriteup";
import { getRenderFields } from "@/api/renders";
import { FixturaSection } from "@/components/containers/Section";
import { filterDownloads } from "@/utils/helpers";
import { CreateVideoClient } from "@/components/Video/client/createVideo";
export default async function SectionVideos({ params, Title, Type }) {
  //console.log(params);
  const Category = "Video options";
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

  const renderArticles = await getWriteupsFieldsWithFilters(
    ["game_meta_datum"],
    {
      $and: [
        {
          renders: {
            id: {
              $eq: params.render,
            },
          },
        },
        {
          asset: {
            $and: [
              {
                asset_type: {
                  Name: {
                    $eq: Type,
                  },
                },
              },
              {
                ArticleFormats: {
                  $eq: "ShortForm",
                },
              },
            ],
          },
        },
      ],
    }
  );

  return (
    <>
      {filteredDownloads.map((video, i) => {
        //console.log(video.attributes);
      
        return (
          <FixturaSection
            shade={i + 1}
            Title={`Videos : ${video.attributes?.asset?.data?.attributes?.Name}`}
            subTitle={video.attributes?.asset?.data?.attributes?.SubTitle}
            Icon={video.attributes?.asset?.data?.attributes?.Icon}
            key={i}
          >
            <CreateVideoClient
              Category="Video options"
              Type={Type}
              ITEM={video.attributes}
              renderArticles={renderArticles}
              description={
                video.attributes?.asset?.data?.attributes?.assetDescription
              }
            />
          </FixturaSection>
        );
      })}
    </>
  );
}
