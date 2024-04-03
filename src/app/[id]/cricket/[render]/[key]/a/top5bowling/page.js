import { FixturaContainer } from "@/components/containers/containers";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenderFields } from "@/api/renders";
import AssetLayout from "@/components/AssetLayout/AssetLayout";
import { getAccount, getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";
import { createAssetDataFromFilters } from "@/utils/CreateAssetDataFromFilters";

export default async function displayTop5BowlingList({ params }) {
  
  const useCompositionID = "Top5BowlingList";
  console.log("Page.js - displayTop5BowlingList");
  const account = await getAccount(params.id);
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
    AssetName: "Top 5 Bowlers",
    AssetType: "statistics",
    Video_asset_Category: "Video options",
    Video_Asset_Name: "Top 5 Bowlers",
    Image_asset_Category: "Image options",
    Image_Asset_Name: "Top 5 Bowlers",
    Writeup: "Top 5 Bowlers",
    Category:  decodeURIComponent(params.key),
  };

  const OBJ = {
    AssetMetaData: AssetMetaData,
    createdAt: renderData.attributes.createdAt,
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
    title: `Top 5 Bowlers | ${FindAccountLabel(accountBasic)} | ${
      accountBasic.attributes.Sport
    }`,
  };
};
