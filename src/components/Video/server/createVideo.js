import { getWriteupsFieldsWithFilters } from "@/api/getWriteup";
import { getRenderFields } from "@/api/renders";
import { CreateVideoClient } from "@/components/Video/client/createVideo";
import { filterDownloads } from "@/utils/helpers";

export async function CreateVideo({ params, Category, Type }) {
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
    <CreateVideoClient
      ITEM={filteredDownloads}
      renderArticles={renderArticles}
      params={params}
      Type={Type}
    />
  );
}
