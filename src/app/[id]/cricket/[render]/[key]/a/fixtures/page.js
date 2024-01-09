import { FixturaContainer } from "@/components/containers/containers";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenderFields, getRenders } from "@/api/renders";

//import { createDataSet } from "@/utils/CreateAssetDataForUI";
import { getAccount, getAccountFields } from "@/api/accounts";
import {
  FindAccountLabel,
  FindAccountType,
  FindAccountWriteupID,
} from "@/utils/actions";
import { AssetLayoutFixtures } from "@/components/AssetLayout/FixtureLayout";

/*
  NOTES:

  WE need to fiter down the data load on this component
  there are to many non essential items being piped down the channel here!

*/
export default async function Upage({ params }) {
  console.log("Page.js - Upage");
  const Render = await getRenders(params.render);
  const account = await getAccount(params.id);
  const renderData = await getRenderFields(params.render, [
    "downloads",
    "downloads.asset_type",
    "downloads.asset",
    "downloads.asset_category",
    "downloads.game_meta_data",
    "game_results_in_renders",
    "game_results_in_renders.game_meta_datum",
    "game_results_in_renders.game_meta_datum.grade",
    "game_results_in_renders.game_meta_datum.grade.competition",
    "game_results_in_renders.game_meta_datum.gtp_3_reports",
    "game_results_in_renders.game_meta_datum.gtp_3_reports.asset",
    "gtp_3_reports",
    "gtp_3_reports.asset",
  ]);
  console.log(account);

  /*  console.log("account ===", FindAccountWriteupID(account)) */
  const AssetMetaData = {
    AssetName: "Weekend Results",
    AssetType: "results",
    Video_asset_Category: "Video options",
    Video_Asset_Name: "Weekend Results",
    Image_asset_Category: "Image options",
    Image_Asset_Name: "Game Spotlight",
    Writeup: ["Weekend Results", "Stumps Review"],
    WriteupID: FindAccountWriteupID(account),
    Category: decodeURIComponent(params.key),
    AccountType: FindAccountType(account),
    group_assets_by: account.attributes.group_assets_by,
  };

  const OBJ = {
    AssetMetaData: AssetMetaData,
    createdAt: Render.attributes.createdAt,
    decodeURIComponent: decodeURIComponent(params.key),
    FixturesToDisplay: renderData.attributes.game_results_in_renders,
    downloads: renderData.attributes.downloads.data,
    Sport: account.attributes?.Sport
      ? account.attributes?.Sport.toLowerCase()
      : "cricket",
  };

  return (
    <>
      <FixturaContainer>
        <PageTitleAndCreated OBJ={OBJ} />
      </FixturaContainer>
      <AssetLayoutFixtures OBJ={OBJ} />
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
    title: `Matchday Fixtures | ${FindAccountLabel(accountBasic)} | ${
      accountBasic.attributes.Sport
    }`,
  };
};
