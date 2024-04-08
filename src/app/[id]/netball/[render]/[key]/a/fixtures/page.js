"use client";
import { getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";
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
  const assetCompositionID = "WeekendSingleGameResultNetball";
  useEffect(() => {
    setCompositionID(assetCompositionID);
  }, [assetCompositionID, setCompositionID]);
  if (!compositionID) return null;
  return <SingleFixtureLayout />;
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
