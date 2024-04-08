"use client";
import { SingleFixtureLayout } from "@/components/AssetLayout/SingleFixtureLayout";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext, useEffect } from "react";

export default async function DisplayAFLFixtures() {
  console.log("Page.js - DisplayAFLFixtures");
  const { setCompositionID, compositionID } = useContext(FixturaSettings);
  const assetCompositionID = "WeekendSingleGameResultAFL";
  useEffect(() => {
    setCompositionID(assetCompositionID);
  }, [assetCompositionID, setCompositionID]);
  if (!compositionID) return null;
  return <SingleFixtureLayout />;
}
