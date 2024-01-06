import { FixturaContainer } from "@/components/containers/containers";
import { H, PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenderFields, getRenders } from "@/api/renders";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { createDataSet } from "@/utils/CreateAssetDataForUI";
import { getAccount, getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";

export default async function Upage({ params }) {
  console.log("Page.js - Upage");
  const Render = await getRenders(params.render);
  const account = await getAccount(params.id);
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
    AssetName: "Weekend Results",
    AssetType: "results",
    Video_asset_Category: "Video options",
    Video_Asset_Name: "Weekend Results",
    Image_asset_Category: "Image options",
    Image_Asset_Name: "Grouped Results",
    Writeup: "Results Wrapup",
    Category: decodeURIComponent(params.key),
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
    title: `Weekend Results | ${FindAccountLabel(accountBasic)} | ${
      accountBasic.attributes.Sport
    }`,
  };
};
