import { getWriteupsFieldsWithFilters } from "@/api/getWriteup";
import { SupportingArticleClient } from "@/components/Articles/client/supportingArticles";

export async function SupportingArticleServer({ params, Type }) {
  // need a new API call with a filter claus as this will be getting to big
 
  const renderData = await getWriteupsFieldsWithFilters([], {
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
                $eq: "Twitter",
              },
            },
          ],
        },
      },
    ],
  });

  return <SupportingArticleClient ITEMS={renderData} />;
}
