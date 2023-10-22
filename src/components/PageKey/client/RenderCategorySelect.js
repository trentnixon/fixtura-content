"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Select } from "@mantine/core";
import { QuickSelectNavigationOptionsForAccountType } from "@/components/PageOverview/QuickSeelctNavigationOptionsForAccountType";

export function NavigationSelect(props) {
  const {accountBasic} = props
  const router = useRouter();
  const params = useParams();

  const handleSelectionChange = (value) => {
    const { id, render, key } = params;
    const newPath = `/${id}/${render}/${key}/${value}`; // Construct the new path based on the URL parameters and the selected option
    router.push(newPath); // Navigate to the new path
  };

  const options = [
    { value: "r", label: "Results" },
    { value: "u", label: "Upcoming" },
  ];

  return (
    <>
      <QuickSelectNavigationOptionsForAccountType
        params={params}
        accountBasic={accountBasic}
      />
      {/* <Select
        label="Change Asset Type"
        placeholder="Pick a Type"
        data={options}
        onChange={handleSelectionChange}
      /> */}
    </>
  );
}

// Usage:
// Include <NavigationSelect /> in your page component where you want the navigation select to appear.
