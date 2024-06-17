"use client";
import { SingleFixtureLayout } from "@/components/AssetLayout/SingleFixtureLayout";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";
export const dynamic = "force-dynamic";
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
 