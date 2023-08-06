"use client";

import { AssetImage } from "@/components/Images/Fixturaimages";
import { BUTTON_FUNC, BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { handleDownload, handleDownloadAll } from "@/utils/helpers";
import { SimpleGrid } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
export async function CreateImagesClient(props) {
  const { ITEMS } = props;

  return (
    <>
      <FixturaGroup position="right" my={10}>
        <BUTTON_FUNC
          Label={`Download All (${ITEMS.length})`}
          onClick={() => handleDownloadAll(ITEMS)}
        />
      </FixturaGroup>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
          { minWidth: 1200, cols: 4 },
        ]}
      >
        {ITEMS.map((vid, i) => {
          return <SingleImageWithDownload key={i} URL={vid.attributes.URL} />;
        })}
      </SimpleGrid>
    </>
  );
}

export const SingleImageWithDownload = ({ URL }) => {
  return (
    <FixturaBox>
      <AssetImage URL={URL} />
      <CTAGroup URL={URL} />
    </FixturaBox>
  );
};

const CTAGroup = ({ URL }) => {
  return (
    <FixturaGroup position={"right"} my={5} py={5}>
      <BUTTON_ICON_FUNC
        label="Download Image"
        onClick={() => {
          handleDownload(URL);
        }}
        Icon={<IconDownload size="1.125rem" stroke={2} />}
      />
    </FixturaGroup>
  );
};
