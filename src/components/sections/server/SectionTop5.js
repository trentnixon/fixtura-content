import { getWriteupsFieldsWithFilters } from "@/api/getWriteup";
import { getRenderFields } from "@/api/renders";
import { FixturaSection } from "@/components/containers/Section";

import { filterDownloads } from "@/utils/helpers";
//import { CreateVideoClient } from "@/components/Video/client/createVideo";
import { CreateStatisticsClient } from "@/components/Video/client/OLD_createStatistics";
import { getAccountFields } from "@/api/accounts";
import { isSponsorsActive } from "@/utils/actions";

const isMatchingAgeGroup = (obj, ageGroupKey) => {
  const ageGroup = obj.attributes.grouping_category;
  return ageGroup === ageGroupKey;
};

const mergeAndGroupAssets = (array1, array2, array3, ageGroupKey) => {
  //const mergedArray = [...array1, ...array2, ...array3];
  const mergedArray = [...array1, ...array2, ...array3].filter((obj) =>
    isMatchingAgeGroup(obj, ageGroupKey)
  );

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

export default async function SectionTop5(props) {
  const { params, Type, GroupBy, display } = props;

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

  const groupedAssets = mergeAndGroupAssets(
    filteredDownloadVideos,
    filteredDownloadImages,
    renderArticles,
    GroupBy
  );
  return (
    <>
      {Object.entries(groupedAssets).map(([assetName, assetTypes], index) => {
        if (!assetTypes?.VIDEO || assetTypes[display] === undefined)
          return false;
        return (
          <FixturaSection
            shade={0}
            Title={`${assetName}`}
            // you may need to adjust the following two properties according to your needs
            subTitle={
              assetTypes[display][0].attributes.asset.data.attributes.SubTitle
            }
            Blurb={
              assetTypes[display][0].attributes.asset.data.attributes.Blurb
            }
            Icon={assetTypes[display][0].attributes.asset.data.attributes.Icon}
            key={index}
          >
            <CreateStatisticsClient
              key={index}
              assetName={assetName}
              assetTypes={assetTypes}
              description={
                assetTypes[display][0].attributes.asset.data.attributes
                  .assetDescription
              }
              /*   hasSponsors={isSponsorsActive(accountBasic)}  */
              display={display}
              renderArticles={renderArticles}
            />
          </FixturaSection>
        );
      })}
    </>
  );
}
