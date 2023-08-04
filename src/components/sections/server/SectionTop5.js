import { getWriteupsFieldsWithFilters } from "@/api/getWriteup";
import { getRenderFields } from "@/api/renders";
import { FixturaSection } from "@/components/containers/Section";

import { filterDownloads } from "@/utils/helpers";
import { CreateVideoClient } from "@/components/Video/client/createVideo";
import { CreateStatisticsClient } from "@/components/Video/client/createStatistics";

const mergeAndGroupAssets = (array1, array2, array3) => {
  const mergedArray = [...array1, ...array2, ...array3];

  const groupedAssets = mergedArray.reduce((acc, obj) => {
    const assetName = obj.attributes.asset.data.attributes.Name;
    const mediaType = obj.attributes.asset_category
      ? obj.attributes.asset_category.data.attributes.Identifier
      : "article";

    if (!acc[assetName]) {
      acc[assetName] = {};
    }

    if (!acc[assetName][mediaType]) {
      acc[assetName][mediaType] = [];
    }

    acc[assetName][mediaType].push(obj);

    return acc;
  }, {});

  return groupedAssets;
};

export default async function SectionTop5({ params, Type }) {

  const Category = "Video options";
  const renderData = await getRenderFields(params.render, [
    "downloads",
    "downloads.asset_type",
    "downloads.asset",
    "downloads.asset_category",
  ]);

  // Usage:

  const filteredDownloadVideos = filterDownloads(
    renderData.attributes.downloads.data,
    Category,
    Type
  );

  const filteredDownloadImages = filterDownloads(
    renderData.attributes.downloads.data,
    "Image options",
    Type
  );

  const renderArticles = await getWriteupsFieldsWithFilters(
    ["game_meta_datum", "asset"],
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
                  $eq: "Listicle",
                },
              },
            ],
          },
        },
      ],
    }
  );

  //console.log(renderArticles)

  const groupedAssets = mergeAndGroupAssets(
    filteredDownloadVideos,
    filteredDownloadImages,
    renderArticles
  );
  //console.log(groupedAssets);
  return (
    <>
      {Object.entries(groupedAssets).map(([assetName, assetTypes], index) => {
        //console.log(assetName, assetTypes);
        return (
          <FixturaSection
            shade={index}
            Title={`${assetName}`}
            // you may need to adjust the following two properties according to your needs
            subTitle={
              assetTypes.VIDEO
                ? assetTypes.VIDEO[0].attributes.asset.data.attributes.SubTitle
                : assetTypes.VIDEO[0].attributes.asset.data.attributes.SubTitle
            }
            Icon={
              assetTypes.VIDEO
                ? assetTypes.VIDEO[0].attributes.asset.data.attributes.Icon
                : assetTypes.VIDEO[0].attributes.asset.data.attributes.Icon
            }
            key={index}
          >
            <CreateStatisticsClient 
              key={index}
              assetName={assetName}
              assetTypes={assetTypes}
            
              description={
                assetTypes.VIDEO[0].attributes.asset.data.attributes
                  .assetDescription
              }
            />
          </FixturaSection>
        );
      })}
    </>
  );
}