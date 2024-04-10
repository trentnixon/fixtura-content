"use client"
// APIS
import { DashBoardGalleryItems } from "@/components/PageOverview/client/CardLayout";
import { FixturaComponent } from "@/components/containers/containers";
import { AccountSettings } from "@/context/ContextAccountSettings";
import { SimpleGrid } from "@mantine/core";
import { useContext } from "react";


export default function NavigationOptionsForAccountType() {
  const AccountContext = useContext(AccountSettings);
  const {stats}=AccountContext
  //console.log("AccountContext ", AccountContext)
  return (
    <FixturaComponent>
      <SimpleGrid
        spacing="xs"
        verticalSpacing="xs"
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
          { minWidth: 1200, cols: 3 },
        ]}
      >
        {Object.keys(stats.Count.assetGrouping).map((key, i) => (
          <DashBoardGalleryItems DATA={key} key={i} />
        ))}
      </SimpleGrid>
    </FixturaComponent>
  );
}
