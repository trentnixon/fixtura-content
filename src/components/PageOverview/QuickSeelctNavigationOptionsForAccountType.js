"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { RenderCount } from "@/api/renders";
import { FixturaContainer } from "@/components/containers/containers";
import { FindAccountType } from "@/utils/actions";
import { Select } from "@mantine/core";

export function QuickSelectNavigationOptionsForAccountType(props) {
  const { accountBasic } = props;
  const params = useParams();
  const router = useRouter();

  const [renders, setRenders] = useState(null);

  useEffect(() => {
    // Check if params.render and params.id are present before fetching data
    if (params.render && params.id) {
      async function fetchData() {
        const renderData = await RenderCount(params.render);
        setRenders(renderData);
      }

      fetchData();
    }
  }, [params.render, params.id]); // Depend on both params.render and params.id

  const handleSelectionChange = (key) => {
    const { id, render } = params;
    // URL encoding the key to handle special characters
    const encodedKey = encodeURIComponent(key);
    const path = `/${id}/${render}/${encodedKey}`;
    router.push(path); // navigating to the new page
  };

  // Render null if params.render or params.id are not present, or if renders is not yet loaded
  if (!params.render || !params.id || !renders) {
    return null; // or return a loading indicator or other fallback UI
  }

  return (
    <>
      <FixturaContainer mx={10}>
        <Select
          placeholder="Jump To:"
          onChange={handleSelectionChange}
          data={Object.keys(renders.assetGrouping).map((key) => ({
            value: key,
            label: `${key}`,
          }))}
        />
      </FixturaContainer>
    </>
  );
}
