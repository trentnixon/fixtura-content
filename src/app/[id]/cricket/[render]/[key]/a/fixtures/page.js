"use client";
import { SingleFixtureLayout } from "@/components/AssetLayout/SingleFixtureLayout";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";

/*
  NOTES:
  WE need to filter down the data load on this component
  there are to many non essential items being piped down the channel here!
*/

export default async function DisplayWeekendSingleGameResult() {
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "WeekendSingleGameResult";
  useEffect(() => {
    setCompositionID(assetCompositionID);
  }, [assetCompositionID, setCompositionID]);
  if (!compositionID) return null;
  return <SingleFixtureLayout />;
}


/* import { FixturaContainer } from "@/components/containers/containers";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenderFields, getRenders } from "@/api/renders";
import { getdownloadFieldsWithFilters } from "@/api/downloads";
import { getAccount, getAccountFields } from "@/api/accounts";
import {
  FindAccountLabel,
  FindAccountType,
  FindAccountWriteupID,
} from "@/utils/actions";
import { SingleFixtureLayout } from "@/components/AssetLayout/SingleFixtureLayout";
import { createAssetDataFromFilters } from "@/utils/CreateAssetDataFromFilters";


export default async function DisplayWeekendSingleGameResult({ params }) {
  console.log("Page.js - DisplayWeekendSingleGameResult");
  const useCompositionID = "WeekendSingleGameResult";
  const Render = await getRenders(params.render);
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

  //console.log("ASSETDATA ", ASSETDATA)

  const OBJ = {
    AssetMetaData: AssetMetaData,
    createdAt: Render.attributes.createdAt,
    decodeURIComponent: decodeURIComponent(params.key),
    ASSETDATA: ASSETDATA[0]||[],
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
}; */