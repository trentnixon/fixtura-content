"use client";

import { AssetImage } from "@/components/Images/Fixturaimages";
import { BUTTON_FUNC, BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaSection } from "@/components/containers/Section";
import { FixturaBox } from "@/components/containers/boxes";
import { handleDownload, handleDownloadAll } from "@/utils/helpers";
import { SimpleGrid } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
export async function CreateImagesClient(props) {
  const { ITEMS, GroupBy, label } = props;

  // Filter ITEMS based on the GroupBy value
  const filteredItems = ITEMS.filter(
    (IMG) => IMG.attributes.grouping_category === GroupBy
  );

  return (
    <>
      <FixturaSection
        shade={0}
        Title={filteredItems[0]?.attributes.asset.data.attributes.Name}
        subTitle={filteredItems[0]?.attributes.asset.data.attributes.SubTitle}
        Blurb={filteredItems[0]?.attributes.asset.data.attributes.Blurb}
        Icon={"ICO_HEADER_CRICKET"}
      >
        <FixturaGroup position="right" my={10}>
          <BUTTON_FUNC
            Label={`Download All (${filteredItems.length})`}
            onClick={() => handleDownloadAll(filteredItems)}
          />
        </FixturaGroup>
        <SimpleGrid
          spacing="xs"
          verticalSpacing="xs"
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}
        >
          {filteredItems.map((IMG, i) => (
            <SingleImageWithDownload key={i} URL={IMG.attributes.URL} />
          ))}
        </SimpleGrid>
      </FixturaSection>
    </>
  );
}

export const SingleImageWithDownload = ({ URL }) => {
  return (
    <FixturaBox baseColor="gray" c={0} p={0}>
      <FixturaBox p={"xs"}>
        <AssetImage URL={URL} />
      </FixturaBox>
      <CTAGroup URL={URL} />
    </FixturaBox>
  );
};

const CTAGroup = ({ URL }) => {
  return (
    <FixturaGroup position={"right"} my={5} py={5}>
      <BUTTON_ICON_FUNC
        size={"md"}
        label="Download Image"
        onClick={() => {
          handleDownload(URL);
        }}
        Icon={<IconDownload size="1.125rem" stroke={2} />}
      />
    </FixturaGroup>
  );
};
