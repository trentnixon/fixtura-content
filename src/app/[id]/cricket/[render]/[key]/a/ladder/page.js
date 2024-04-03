import { FixturaContainer } from "@/components/containers/containers";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenderFields, getRenders } from "@/api/renders";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { createDataSet } from "@/utils/CreateAssetDataForUI";
import { getAccount, getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";
import { createAssetDataFromFilters } from "@/utils/CreateAssetDataFromFilters";

export default async function displayLadder({ params }) {
  console.log("Page.js - displayLadder");
  const useCompositionID = "Ladder";
  const account = await getAccount(params.id);
  const Render = await getRenders(params.render);
  const renderData = await getRenderFields(params.render, [
    "downloads",
    "downloads.asset_category",
    "downloads.asset",
    "ai_articles",
    "ai_articles.asset",
    "ai_articles.asset_category",
  ]);

   // Use the new utility function to create asset data from the filters
   const ASSETDATA = createAssetDataFromFilters(
    renderData.attributes.downloads.data,
    renderData.attributes.ai_articles.data,
    useCompositionID,
    decodeURIComponent(params.key)
  );

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
    ASSETDATA: ASSETDATA[0],
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
