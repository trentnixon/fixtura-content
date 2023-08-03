"use client";
import { useEffect, useState } from "react";
import { handleVideoDownload } from "@/utils/helpers";
import { H } from "@/components/Type/Headers";
import { BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { FixturaBtnGroup, FixturaGroup } from "@/components/containers/Group";
import { IconDownload } from "@tabler/icons-react";
import { Box, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const HTML5VideoPlayer = ({ url, Name }) => {
  const [visible, { toggle }] = useDisclosure(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const handleClick = () => {
    toggle(true); // Display loading overlay
    setHasBeenClicked(true); // Set button as clicked
    handleVideoDownload(url, Name, DownloadComplete); // Hide loading overlay after download starts
  };

  const DownloadComplete = () => {
    console.log("DownloadComplete");
    setHasBeenClicked(false); // Set button as clicked
  };

  useEffect(() => {
    if (visible && !hasBeenClicked) {
      toggle(false);
    }
    //
  }, [hasBeenClicked]);

  return (
    <>
      <Box pos="relative">
        <div className="video-player">
          <LoadingOverlay
            visible={visible}
            overlayBlur={3}
            transitionDuration={500}
          />
          <video
            controls
            src={url}
            width="100%"
            className="video-player rounded-md"
          />
        </div>
      </Box>
      <FixturaGroup>
        <H size="h6">
          {hasBeenClicked ? "Working on your download" : "Download Video"}
        </H>
        <CTAGroup URL={url} onClick={handleClick} disabled={hasBeenClicked} />
      </FixturaGroup>
    </>
  );
};

const CTAGroup = ({ onClick, disabled }) => {
  useEffect(() => {}, [disabled]);
  return (
    <FixturaBtnGroup my={5}>
      <BUTTON_ICON_FUNC
        label="Download Video"
        onClick={onClick}
        disabled={disabled}
        Icon={<IconDownload />}
      />
    </FixturaBtnGroup>
  );
};
