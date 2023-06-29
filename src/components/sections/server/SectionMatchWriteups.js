import { getWriteupsFieldsWithFilters } from "@/api/getWriteup";
import { FixturaSection } from "@/components/containers/Section";
import SectionMatchWriteupsClient from "@/components/sections/client/SectionMatchWriteups";
export default async function SectionMatchWriteups({ params, Type }) {
  const renderData = await getWriteupsFieldsWithFilters(
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
            ],
          },
        },
      ],
    } 
  );

  console.log("renderData[0]");
  console.log(renderData[0]?.attributes.asset);
  return (
    <FixturaSection
      shade={0}
      Title={`Articles : ${renderData[0]?.attributes.asset?.data?.attributes?.Name}`}
      subTitle={renderData[0]?.attributes.asset?.data?.attributes?.SubTitle}
      Icon={renderData[0]?.attributes.asset?.data?.attributes?.Icon}
    >
      <SectionMatchWriteupsClient renderData={renderData} />
    </FixturaSection>
  );
}
