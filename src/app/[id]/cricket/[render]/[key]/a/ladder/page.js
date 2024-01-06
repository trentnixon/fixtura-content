import { FixturaContainer } from "@/components/containers/containers";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenderFields, getRenders } from "@/api/renders";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { createDataSet } from "@/utils/CreateAssetDataForUI";
import { getAccount, getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";

export default async function Upage({ params }) {
  console.log("Page.js - Upage");
  const account = await getAccount(params.id);
  const Render = await getRenders(params.render);
  const renderData = await getRenderFields(params.render, [
    "downloads",
    "downloads.asset_type",
    "downloads.asset",
    "downloads.asset_category",
    "game_results_in_renders",
    "gtp_3_reports",
    "gtp_3_reports.asset",
  ]);

  const AssetMetaData = {
    AssetName: "League Tables",
    AssetType: "statistics",
    Video_asset_Category: "Video options",
    Video_Asset_Name: "League Tables",
    Image_asset_Category: "Image options",
    Image_Asset_Name: "League Tables",
    Writeup: "League Tables",
    Category:decodeURIComponent(params.key),
  };

  const OBJ = {
    AssetMetaData: AssetMetaData,
    createdAt: Render.attributes.createdAt,
    decodeURIComponent: decodeURIComponent(params.key),
    ASSETDATA: createDataSet(renderData.attributes, AssetMetaData),
    Sport: account.attributes?.Sport
    ? account.attributes?.Sport.toLowerCase()
    : "cricket",
  };

  return (
    <>
      <FixturaContainer>
      <PageTitleAndCreated OBJ={OBJ} />
      </FixturaContainer>

      <AssetLayout OBJ={OBJ} />
    </>
  );
}

// UTILS FUNC
export const generateMetadata = async ({ params }) => {
  const accountBasic = await getAccountFields(params.id, [
    "account_type",
    "clubs",
    "associations",
  ]);
  return {
    title: `League Tables| ${FindAccountLabel(accountBasic)} | ${
      accountBasic.attributes.Sport
    }`,
  };
};
