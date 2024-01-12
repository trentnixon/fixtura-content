import {
  FixturaComponent,
  FixturaContainer,
} from "@/components/containers/containers";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenderFields, getRenders } from "@/api/renders";
import { RequestTeamRosterForRender } from "@/components/AssetLayout/Image/createTeamRoster";
import { getAccount } from "@/api/accounts";
import { FindAccountType } from "@/utils/actions";
import { createDataSet } from "@/utils/CreateAssetDataForUI";
import { AssetLayoutImagesOnly } from "@/components/AssetLayout/AssetLayout";

export default async function Upage({ params }) {
  const { id, render, key } = params;
  const account = await getAccount(id);
  const Render = await getRenders(params.render);
  const renderData = await getRenderFields(render, [
    "downloads",
    "downloads.asset_type",
    "downloads.asset",
    "downloads.asset_category",
    "game_results_in_renders",
    "gtp_3_reports",
    "gtp_3_reports.asset",
  ]);

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
    CompleteRender: Render,
    createdAt: Render.attributes.createdAt,
    accountBasic: account,
    AccountType: FindAccountType(account),
    params: params,
    Sport: account.attributes.Sport.toLowerCase(),
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
