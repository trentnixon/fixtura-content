import { getWriteupsFieldsWithFilters, getWriteupsFromRender } from "@/api/getWriteup";
import { getRenderFields } from "@/api/renders";
import { FixturaSection } from "@/components/containers/Section";
import { filterDownloads } from "@/utils/helpers";
import { CreateVideoClient } from "@/components/Video/client/createVideo";
export default async function SectionVideos({ params, Title, Type,Path }) {
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
 
  //params.render
  const RenderWriteups = await getWriteupsFromRender(params.render, Path, Type)
  
  return (
    <>
      {filteredDownloads.map((video, i) => { 
    
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
              renderArticles={RenderWriteups.filteredData}
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



//console.log(RenderWriteups.filteredData)
  
/*   const filteredData = RenderWriteups.filteredData.filter(item => {
    return item.game_meta_datum.gtp_3_reports.some(report => report.asset.ArticleFormats === "ShortForm");
  });
  console.log(filteredData)
   */
  /* const renderArticles = await getWriteupsFieldsWithFilters(  
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

  console.log(renderArticles) */