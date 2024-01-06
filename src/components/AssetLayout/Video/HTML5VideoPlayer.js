"use client";
import { useEffect, useState } from "react";
import { handleVideoDownload } from "@/utils/helpers";
import { H } from "@/components/Type/Headers";
import { BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { FixturaBtnGroup, FixturaGroup } from "@/components/containers/Group";
import { IconDownload, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FixturaBox } from "@/components/containers/boxes";
import { trackButtonClick, trackCustomEvent } from "@/utils/GA";
import { P } from "@/components/Type/Paragraph";
import { userFeedbackOnDownload } from "@/api/downloads";

export const HTML5VideoPlayer = ({ Video }) => {
  const [visible, { toggle }] = useDisclosure(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const { id, attributes } = Video;
  const { Name, URL, isAccurate } = attributes;

  const handleClick = () => {
    toggle(true); // Display loading overlay
    setHasBeenClicked(true); // Set button as clicked
    handleVideoDownload(URL, Name, DownloadComplete); // Hide loading overlay after download starts
    trackCustomEvent("Video", "Download", Name); // Track video download event
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
  }, [hasBeenClicked, visible, toggle]);

  const handlePlay = () => {
    trackCustomEvent("Video", "Play", Name); // Track video play event
  };

  const handlePause = () => {
    trackCustomEvent("Video", "Pause", Name); // Track video pause event
  };

  return (
    <>
      <Box pos="relative">
        <FixturaBox p={0} c={1}>
          <div className="video-player">
            <LoadingOverlay
              visible={visible}
              overlayBlur={3}
              transitionDuration={500}
            />
            <video
              controls
              src={URL}
              width="100%"
              className="video-player rounded-md"
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </div>
        </FixturaBox>
      </Box>
      <FixturaGroup>
        <UserFeedback id={id} isAccurate={isAccurate} />

        <CTAGroup URL={URL} onClick={handleClick} disabled={hasBeenClicked} />
      </FixturaGroup>
    </>
  );
};

const CTAGroup = ({ onClick, disabled }) => {
  useEffect(() => {}, [disabled]);
  return (
    <FixturaBtnGroup my={5}>
      <BUTTON_ICON_FUNC
        size="md"
        label="Download Video"
        onClick={onClick}
        disabled={disabled}
        Icon={<IconDownload />}
      />
    </FixturaBtnGroup>
  );
};

const UserFeedback = ({ id, isAccurate }) => {
  const [feedbackSent, setFeedbackSent] = useState(isAccurate !== null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownloadFeedback = async (accuracy) => {
    setIsLoading(true);
    setError("");
    try {
      await userFeedbackOnDownload(id, accuracy);
      setFeedbackSent(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
    trackButtonClick(handleDownloadFeedback); // Track video download event
  };

  if (feedbackSent) {
    return <P fz="sm">Thank you for your feedback!</P>;
  }

  if (error) {
    return (
      <P fz="sm" color="red">
        {error}
      </P>
    );
  }

  return (
    <FixturaGroup>
      <P fz="sm">Was this Video Accurate?</P>
      <FixturaGroup position="center">
        {isLoading ? (
          <Center>
            <Loader color="gray" size="xl" variant="dots" />
          </Center>
        ) : (
          <>
            <ActionIcon
              onClick={() => handleDownloadFeedback(true)}
              color="green"
            >
              <IconThumbUp size="1.3rem" />
            </ActionIcon>
            <ActionIcon
              onClick={() => handleDownloadFeedback(false)}
              color="red"
            >
              <IconThumbDown size="1.3rem" />
            </ActionIcon>
          </>
        )}
      </FixturaGroup>
    </FixturaGroup>
  );
};
