import {
  FixturaComponent,
  FixturaContainer,
} from "@/components/containers/containers";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenderFields } from "@/api/renders";
import { RequestTeamRosterForRender } from "@/components/AssetLayout/Image/createTeamRoster";
import { getAccount } from "@/api/accounts";
import { FindAccountType } from "@/utils/actions";
import { createDataSet } from "@/utils/CreateAssetDataForUI";
import { AssetLayoutImagesOnly } from "@/components/AssetLayout/AssetLayout";
import { createAssetDataFromFilters } from "@/utils/CreateAssetDataFromFilters";

export default async function Upage({ params }) {
  const { id, render, key } = params;

  const useCompositionID = "RosterPoster";
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
    AssetName: "Team Rosters",
    AssetType: "upcoming",
    Video_asset_Category: "Video options",
    Video_Asset_Name: "RosterPoster",
    Image_asset_Category: "Image options",
    Image_Asset_Name: "RosterPoster",
    Writeup: "RosterPoster",
    Category: decodeURIComponent(params.key),
  };
 
  const OBJ = {
    AssetMetaData: AssetMetaData,
    CompleteRender: renderData,
    createdAt: renderData.attributes.createdAt,
    accountBasic: account,
    AccountType: FindAccountType(account),
    params: params,
    Sport: account.attributes.Sport.toLowerCase(),
    ASSETDATA: ASSETDATA[0] || [],
    Sport: account.attributes?.Sport
      ? account.attributes?.Sport.toLowerCase()
      : "cricket",
  };

  console.log(OBJ.CompleteRender)
  return (
    <>
      <FixturaContainer>
        <PageTitleAndCreated OBJ={OBJ} />
      </FixturaContainer>

      {OBJ.CompleteRender.attributes.hasTeamRosters ? (
        <AssetLayoutImagesOnly OBJ={OBJ} />
      ) : (
        <FixturaComponent>
          {OBJ.AccountType === "Club" ? (
            <RequestTeamRosterForRender
              Render={OBJ.params.render}
              CompleteRender={OBJ.CompleteRender}
            />  
          ) : (
            false
          )}
        </FixturaComponent>
      )}
    </>
  );
}
