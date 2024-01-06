"use client";
import { AssetImage } from "@/components/Images/Fixturaimages";
import { P } from "@/components/Type/Paragraph";
import { BUTTON_FUNC, BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import {
  handleDownload,
  handleDownloadAll,
  handleDownloadAllFromArray,
} from "@/utils/helpers";
import { Image, Modal, SimpleGrid, useMantineTheme } from "@mantine/core";
import {
  IconDownload,
  IconEye,
  IconLoader,
  IconPhotoAi,
} from "@tabler/icons-react";
import { useState } from "react";

export const ImageGalleryForAssets = (props) => {
  const { OBJ } = props;
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);

  const handleBulkDownload = async () => {
    setIsBulkDownloading(true);
    try {
      await handleDownloadAllFromArray(OBJ.ASSETDATA.Image);
      // Handle successful bulk download
    } catch (error) {
      console.error("Error in bulk download:", error);
      // Handle error case
    } finally {
      setIsBulkDownloading(false);
    }
  };
  return (
    <>
      <FixturaPaper c={1} shadow={"none"} p={5} my={10}>
        <FixturaGroup position="right">
          <P fz="lg" c={"gray.7"} fw={900} ta={"right"} my={7}>
            Images
          </P>
          <IconPhotoAi />
        </FixturaGroup>
      </FixturaPaper>

      <SimpleGrid
        spacing="xs"
        verticalSpacing="xs"
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
          { minWidth: 1200, cols: 3 },
        ]}
      >
        {OBJ.ASSETDATA.Image.map((IMG, i) => (
          <SingleImageWithDownload key={i} URL={IMG} />
        ))}
      </SimpleGrid>
      <FixturaGroup position="right" my={10}>
        <BUTTON_FUNC
          Label={
            isBulkDownloading
              ? "Downloading..."
              : `Download All (${OBJ.ASSETDATA.Image.length})`
          }
          onClick={handleBulkDownload}
          disabled={isBulkDownloading}
        />
      </FixturaGroup>
    </>
  );
};

export const SingleImageWithDownload = ({ URL }) => {
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const theme = useMantineTheme();
  const handleImageClick = () => {
    setSelectedImage(URL);
    setOpened(true);
  };

  return (
    <FixturaBox baseColor="gray" c={0} p={0}>
      <FixturaBox p={"xs"}>
        <AssetImage URL={URL} />
      </FixturaBox>
      <CTAGroup URL={URL} Modal={handleImageClick} />
      <Modal
        transitionProps={{
          transition: "fade",
          duration: 300,
          timingFunction: "linear",
        }}
        overlayProps={{
          color: theme.colors.dark[9],
          opacity: 0.55,
          blur: 3,
        }}
        styles={{
          title: {
            color: theme.colors.gray[8],
          },
          header: {
            padding: "7px 10px",
            marginBottom: "0px",
            color: theme.colors.gray[8],
          },
          body: { backgroundColor: theme.colors.gray[1], padding: "0px" },
          content: { backgroundColor: theme.colors.gray[1], padding: "0px" },
        }}
        opened={opened}
        onClose={() => setOpened(false)}
        size="lg"
      >
        <Image src={selectedImage} alt="Selected" withPlaceholder />
      </Modal>
    </FixturaBox>
  );
};

const CTAGroup = ({ URL, Modal }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    try {
      await handleDownload(URL); // Your download logic here
      // Optional: Show a toast notification for successful download
    } catch (error) {
      console.error("Error downloading image:", error);
      // Optional: Show error feedback
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <FixturaGroup position={"right"} my={5} py={5}>
      <BUTTON_ICON_FUNC
        size={"md"}
        label="View Image"
        onClick={Modal}
        Icon={<IconEye size="1.125rem" stroke={2} />}
      />
      <BUTTON_ICON_FUNC
        size={"md"}
        label={isDownloading ? "Downloading..." : "Download Image"}
        onClick={handleDownloadClick}
        Icon={
          isDownloading ? (
            <IconLoader size="1.125rem" />
          ) : (
            <IconDownload size="1.125rem" stroke={2} />
          )
        }
        disabled={isDownloading}
      />
    </FixturaGroup>
  );
};
