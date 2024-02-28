import { FixturaContainer } from "@/components/containers/containers";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenders } from "@/api/renders";
import { getdownloadFieldsWithFilters } from "@/api/downloads";
import { getAccount, getAccountFields } from "@/api/accounts";
import {
  FindAccountLabel,
  FindAccountType,
  FindAccountWriteupID,
} from "@/utils/actions";
import { SingleFixtureLayout } from "@/components/AssetLayout/SingleFixtureLayout";

/*
  NOTES:

  WE need to filter down the data load on this component
  there are to many non essential items being piped down the channel here!

*/
export default async function DisplaySingleFixtures({ params }) {
  console.log("Page.js - DisplaySingleFixtures");
  const Render = await getRenders(params.render);
  const account = await getAccount(params.id);

  const renderData = await getdownloadFieldsWithFilters(
    [
      "asset",
      "grades",
      "asset_category",
      "asset_type",
      "game_meta_data",
      "game_meta_data.gtp_3_reports",
      "game_meta_data.gtp_3_reports.asset",
    ],
    {
      grouping_category: {
        $eq: decodeURIComponent(params.key),
      },
      render: {
        id: {
          $eq: params.render,
        },
      },
      asset: {
        CompositionID: {
          $eq: "WeekendSingleGameResult",
        },
      },
    }
  );

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
    FixturesToDisplay: sanitizeDownloadData(renderData),
    //downloads: renderData.attributes.downloads.data,
    Sport: account.attributes?.Sport
      ? account.attributes?.Sport.toLowerCase()
      : "cricket",
  };

  return (
    <>
      <FixturaContainer>
        <PageTitleAndCreated OBJ={OBJ} />
      </FixturaContainer>
      <SingleFixtureLayout OBJ={OBJ} />
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

// utils, to be moved

function sanitizeDownloadData(dataArray) {
  return dataArray.map((item) => {
    const { URL, createdAt, grouping_category } = item.attributes;
    const asset = item.attributes.asset.data
      ? {
          Name: item.attributes.asset.data.attributes.Name,
          CompositionID: item.attributes.asset.data.attributes.CompositionID,
          ContentType: item.attributes.asset.data.attributes.ContentType,
        }
      : {};

    const asset_category = item.attributes.asset_category.data
      ? {
          Name: item.attributes.asset_category.data.attributes.Name,
          Identifier: item.attributes.asset_category.data.attributes.Identifier,
        }
      : {};

    const asset_type = item.attributes.asset_type.data
      ? {
          Name: item.attributes.asset_type.data.attributes.Name,
        }
      : {};

    /*  const game_meta_data = item.attributes.game_meta_data.data.map((gmd) => ({
      id: gmd.id,
      gtp_3_reports: gmd.attributes.gtp_3_reports,
      // Assuming there's relevant info in the attributes you'd like to keep
      // Add those fields here similarly to above
    })); */
    // Filter gtp_3_reports based on CompositionID
    const game_meta_data = item.attributes.game_meta_data.data.map((gmd) => {
      const gtp_3_reports = gmd.attributes.gtp_3_reports.data
        .filter((report) => {
          // Safely check if asset exists and matches CompositionID criteria
          const asset = report.attributes.asset?.data;
          return (
            asset &&
            (asset.attributes.CompositionID === "Weekend Results" ||
              asset.attributes.CompositionID === "Stumps Review")
          );
        })
        .map((filteredReport) => ({
          id: filteredReport.id,
          Name: filteredReport.attributes.Name,
          CompositionID:
            filteredReport.attributes.asset?.data.attributes.CompositionID,
          EditorsArticle: filteredReport.attributes.EditorsArticle,
          createdAt: filteredReport.attributes.createdAt,
          // Include other fields as necessary
        }));

      return {
        id: gmd.id,
        round: gmd.attributes.round,
        ground: gmd.attributes.ground,
        teamHome: gmd.attributes.teamHome,
        Homescores: gmd.attributes.Homescores,
        HomeOvers: gmd.attributes.HomeOvers,

        Awayscores: gmd.attributes.Awayscores,
        AwayOvers: gmd.attributes.AwayOvers,
        teamAway: gmd.attributes.teamAway,

        ResultStatement: gmd.attributes.ground,
        gtp_3_reports,
      };
    });

    return {
      URL,
      createdAt,
      grouping_category,
      asset,
      asset_category,
      asset_type,
      game_meta_data,
    };
  });
}
