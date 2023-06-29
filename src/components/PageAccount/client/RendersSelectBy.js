"use client";
import { Select } from "@mantine/core";
export const RendersSelectBy = ({ sortType, setSortType }) => {
  return (
    <Select
      label=""
      placeholder="Order By"
      value={sortType}
      onChange={setSortType}
      data={[
        { value: "asc", label: "Date (oldest to newest)" },
        { value: "desc", label: "Date (newest to oldest)" },
      ]}
    />
  );
};
