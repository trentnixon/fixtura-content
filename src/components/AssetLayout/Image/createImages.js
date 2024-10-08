"use client";
// Improved version with added error handling and coding best practices
import { useState } from "react";
import { AssetImage } from "@/components/Images/Fixturaimages";
import { P } from "@/components/Type/Paragraph";
import { BUTTON_FUNC, BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { AssetHasError } from "@/components/errors/AssetHasError";
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
import { GetActiveAssetType } from "@/utils/getActiveAssetOBJ";
import { H } from "@/components/Type/Headers";

// Dev notes: Refactored to improve readability and error handling
// Future improvement: Consider abstracting modal logic into a reusable component

export const ImageGalleryForAssets = async () => {
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);
  const useAssetType = await GetActiveAssetType();
  const useImages = useAssetType.useAssetData.graphics;
  // Improved error checking and removed unnecessary console log
  if (useImages[0].hasError) {
    return <AssetHasError assetID={useImages?.[0]?.id} />;
  }
  if (useImages[0].hasBeenProcessed && !useImages[0].downloads) {
    return <RosterImagesFinishingUp assetID={useImages?.[0]?.id} />;
  }

  const handleBulkDownload = async () => {
    setIsBulkDownloading(true);
    try {
      await handleDownloadAllFromArray(useImages[0].downloads);
    } catch (error) {
      console.error("Error in bulk download:", error);
    } finally {
      setIsBulkDownloading(false);
    }
  };

  //console.log("useImages[0] ", useImages[0]);

  return (
    <>
      <FixturaGroup position="right" my={10}>
        <BUTTON_FUNC
          Label={
            isBulkDownloading
              ? "Downloading..."
              : `Download All (${useImages[0].downloads.length})`
          }
          onClick={handleBulkDownload}
          disabled={isBulkDownloading}
        />
      </FixturaGroup>
      <SimpleGrid
        spacing="xs"
        verticalSpacing="xs"
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
          { minWidth: 1200, cols: 4 }, // Adjusted for better layout
        ]}>
        {useImages[0].downloads.map((url, index) => (
          <SingleImageWithDownload key={index} URL={url} />
        ))}
      </SimpleGrid>
    </>
  );
};

export const SingleImageWithDownload = ({ URL }) => {
  const { url } = URL;
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const theme = useMantineTheme();

  const handleImageClick = () => {
    setSelectedImage(url); // Directly using URL since it's already a string
    setOpened(true);
  };

  return (
    <FixturaBox baseColor="gray" c={0} p={0}>
      <CTAGroup URL={url} Modal={handleImageClick} />
      <FixturaBox p="xs">
        <AssetImage URL={url} />
      </FixturaBox>

      <Modal
        transitionProps={{
          transition: "fade",
          duration: 300,
          timingFunction: "ease",
        }}
        overlayProps={{
          color: theme.colors.dark[9],
          opacity: 0.6,
          blur: 2,
        }}
        opened={opened}
        onClose={() => setOpened(false)}
        size="lg">
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
      await handleDownload(URL);
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <FixturaGroup position="right" my={5} py={5}>
      <BUTTON_ICON_FUNC
        size="md"
        label="View Image"
        onClick={Modal}
        Icon={<IconEye size="1.125rem" stroke={2} />}
      />
      <BUTTON_ICON_FUNC
        size="md"
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

const RosterImagesFinishingUp = () => {
  return (
    <>
      <FixturaGroup position="apart" my={10}>
        <H size="h5">Finishing Up</H>
        <BUTTON_FUNC
          Label="View Results"
          onClick={() => {
            // window/ component refresh
            window.location.reload();
          }}
        />
      </FixturaGroup>

      <P>
        This weeks Rosters are almost done, use the button to check the results
      </P>
    </>
  );
};

// LLM Notes: This file defines components for an image gallery within a web application,
// specifically for handling asset images. It includes features for bulk downloading images,
// viewing images in a modal, and error handling for asset errors. The components utilize React hooks,
// Mantine UI library for UI components, and custom components for styling and functionality.
// It's part of a larger project structure, located under the components directory for the image gallery feature.
