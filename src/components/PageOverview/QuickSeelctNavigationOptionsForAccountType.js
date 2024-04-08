"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { RenderCount } from "@/api/renders";
import { FixturaContainer } from "@/components/containers/containers";
import { Select } from "@mantine/core";
import { AccountSettings } from "@/context/ContextAccountSettings";
export function QuickSelectNavigationOptionsForAccountType() {
  const AccountContext = useContext(AccountSettings);
  const params = useParams();
  const router = useRouter();

  const { account } = AccountContext;
  const [renders, setRenders] = useState(null);

  useEffect(() => {
    if (params.render && params.id) {
      async function fetchData() {
        const renderData = await RenderCount(params.render);
        setRenders(renderData);
      }
      fetchData();
    }
  }, [params.render, params.id]);

  const handleSelectionChange = (key) => {
    const { id, render } = params;
    const encodedKey = encodeURIComponent(key);
    const path = `/${id}/${account.sport}/${render}/${encodedKey}/a/results`;
    router.push(path);
  };

  if (!params.render || !params.id || !renders) {
    return null;
  }

  const maxLength = Math.max(
    ...Object.keys(renders.assetGrouping).map((key) => key.length)
  );
  const dynamicWidth = Math.min(maxLength * 2 * 10, 400); // Assuming average character width of 10px, max at 600px

  if (!AccountContext) return;
  return (
    <>
      <FixturaContainer mx={10}>
        <Select
          radius="md"
          placeholder="Jump To:"
          onChange={handleSelectionChange}
          data={Object.keys(renders.assetGrouping).map((key) => ({
            value: key,
            label: `${key}`,
          }))}
          styles={{ wrapper: { width: dynamicWidth } }}
        />
      </FixturaContainer>
    </>
  );
}
