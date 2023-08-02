"use client";
import JSZip from "jszip";
import { AssetImage } from "@/components/Images/Fixturaimages";
import { BUTTON_FUNC, BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { handleDownload } from "@/utils/helpers";
import { SimpleGrid } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
export async function CreateImagesClient(props) {
  const { ITEMS } = props;
 
  const handleDownloadAll = async () => {
    const zip = new JSZip();

    // Download all images and add them to the zip file
    const downloads = ITEMS.map(async (item, i) => {
      const response = await fetch(item.attributes.URL);
      const blob = await response.blob();

      zip.file(`image${i}.jpg`, blob);
    });

    await Promise.all(downloads);

    // Generate the zip file and create a download link
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "images.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <FixturaGroup position="right" my={10}>
        <BUTTON_FUNC
          Label={`Download All (${ITEMS.length})`}
          onClick={handleDownloadAll}
        />
      </FixturaGroup>
      <SimpleGrid breakpoints={[
        { minWidth: 'sm', cols: 2 },
        { minWidth: 'md', cols: 3 },
        { minWidth: 1200, cols: 4 },
      ]}> 
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
        onClick={() => {
          handleDownload(URL);
        }}
        Icon={<IconDownload size="1.125rem" stroke={2} />}
      />
    </FixturaGroup>
  );
};
