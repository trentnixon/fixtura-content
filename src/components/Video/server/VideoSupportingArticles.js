import { getWriteupsFieldsWithFilters } from "@/api/getWriteup";
import { DisplaySupportingArticles } from "@/components/Video/client/DisplaySupportingArticles";

export default async function VideoSupportingArticles({ params, Type }) {

  const renderData = await getWriteupsFieldsWithFilters(["game_meta_datum"], {
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
  });

  return <DisplaySupportingArticles renderData={renderData} />
}
// 