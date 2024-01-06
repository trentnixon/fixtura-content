"use client";
// APIS
import { DashBoardGalleryItems } from "@/components/PageOverview/client/CardLayout";
import { FixturaComponent } from "@/components/containers/containers";
import { SimpleGrid } from "@mantine/core";

export default async function NavigationOptionsForAccountType(props) {
  const { OBJ } = props;
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
        {Object.keys(OBJ.Count.assetGrouping).map((key, i) => (
          <DashBoardGalleryItems
            DATA={key}
            assetGrouping={OBJ.Count.assetGrouping}
            accountBasic={OBJ.accountBasic}
            Sport={OBJ.Sport}
            params={OBJ.params}
            key={i}
          />
        ))}
      </SimpleGrid>
    </FixturaComponent>
  );
}
