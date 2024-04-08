import { getAccount } from "@/api/accounts";
import { createAssetOBJ } from "@/utils/AssetOBJSetup";
import { AssetProvider } from "@/context/ContextAssetSettings";
import { PageTitleAndCreated } from "@/components/Type/Headers";
export default async function RootLayout({ children, params }) {
  console.log("params ", params);
  const account = await getAccount(params.id);
  // Construct your dynamic config here based on props or state
  const assetMetaConfig = {
    WeekendSingleGameResultAFL: {
      AssetName: "Weekend Results",
      AssetType: "results",
      Video_asset_Category: "Video options",
      Video_Asset_Name: "Weekend Results",
      Image_asset_Category: "Image options",
      Image_Asset_Name: "Game Spotlight",
      Writeup: ["Weekend Results"],
      compositionID: "WeekendSingleGameResultAFL",
    },
    AFLLadder: {
      AssetName: "League Tables",
      AssetType: "statistics",
      Video_asset_Category: "Video options",
      Video_Asset_Name: "League Tables",
      Image_asset_Category: "Image options",
      Image_Asset_Name: "League Tables",
      Writeup: "League Tables",
      compositionID: "AFLLadder",
    },
    WeekendResultsAFL: {
      AssetName: "Weekend Results",
      AssetType: "results",
      Video_asset_Category: "Video options",
      Video_Asset_Name: "Weekend Results",
      Image_asset_Category: "Image options",
      Image_Asset_Name: "Weekend Results",
      Writeup: "Results Wrapup",
    },
    RosterPoster: {
      AssetName: "Team Rosters",
      AssetType: "upcoming",
      Video_asset_Category: "Video options",
      Video_Asset_Name: "RosterPoster",
      Image_asset_Category: "Image options",
      Image_Asset_Name: "RosterPoster",
      Writeup: "RosterPoster",
    },
    Top5AFLScorers: {
      AssetName: "Top 5 Scorers",
      AssetType: "statistics",
      Video_asset_Category: "Video options",
      Video_Asset_Name: "Top 5 Scorers",
      Image_asset_Category: "Image options",
      Image_Asset_Name: "Top 5 Scorers",
      Writeup: "Top 5 Scorers",
      Category: decodeURIComponent(params.key),
    },
    UpComingAFLFixtures: {
      AssetName: "Upcoming Fixtures",
      AssetType: "upcoming",
      Video_asset_Category: "Video options",
      Video_Asset_Name: "Up Coming Fixtures",
      Image_asset_Category: "Image options",
      Image_Asset_Name: "Upcoming Fixtures",
      Writeup: "Upcoming Preview",
      Category: decodeURIComponent(params.key),
    },
  };

  const assetData = await createAssetOBJ(params, account, assetMetaConfig);

  if (assetData.data == null) return null;
  return (
    <AssetProvider value={assetData.data}>
      <PageTitleAndCreated />
      {children}
    </AssetProvider>
  );
}
