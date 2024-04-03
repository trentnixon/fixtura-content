// Dev Note: Enhanced error handling, optimized useEffect dependencies, and improved readability.
"use client";
import { useEffect, useState } from "react";
import { handleVideoDownload } from "@/utils/helpers";
import { FixturaBtnGroup, FixturaGroup } from "@/components/containers/Group";
import { IconDownload, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { ActionIcon, Box, Loader, LoadingOverlay } from "@mantine/core";
//import { useDisclosure } from "@mantine/hooks";
import { FixturaBox } from "@/components/containers/boxes";
import {  trackCustomEvent } from "@/utils/GA";
import { P } from "@/components/Type/Paragraph";
import { userFeedbackOnDownload } from "@/api/downloads";
import { BUTTON_ICON_FUNC } from "@/components/UI/buttons";

export const HTML5VideoPlayer = ({ video }) => {
  const [visible, setVisible] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const { Name, downloads, isAccurate, id } = video;
  const URL = downloads[0].url;

  const handleClick = () => {
    setVisible(true);
    setHasBeenClicked(true);
    handleVideoDownload(URL, Name, DownloadComplete);
    trackCustomEvent("Video", "Download", Name);
  };

  const DownloadComplete = () => {
    setVisible(false);
    setHasBeenClicked(false);
  };

  // Dev Note: Removed unnecessary useDisclosure hook for simplification.
  useEffect(() => {
    if (!visible && hasBeenClicked) {
      setVisible(false);
    }
  }, [hasBeenClicked, visible]);

  const handlePlay = () => trackCustomEvent("Video", "Play", Name);
  const handlePause = () => trackCustomEvent("Video", "Pause", Name);

  return (
    <>
      <Box>
        <FixturaBox>
          <div className="video-player">
            <LoadingOverlay visible={visible} overlayBlur={3} transitionDuration={500} />
            <video controls src={URL} width="100%" onPlay={handlePlay} onPause={handlePause} />
          </div>
        </FixturaBox>
      </Box>
      <FixturaGroup my={10} position="right"> 
        {/* <UserFeedback id={id} isAccurate={isAccurate} /> */}
        <CTAGroup onClick={handleClick} disabled={hasBeenClicked} />
      </FixturaGroup>
    </>
  );
};

const CTAGroup = ({ onClick, disabled }) => {
  // Dev Note: Removed unnecessary useEffect as it had no dependencies or side effects.
  return (
    <FixturaBtnGroup>
      <BUTTON_ICON_FUNC size="md" label="Download Video" onClick={onClick} disabled={disabled} Icon={<IconDownload />} />
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
  };

  return (
    <FixturaGroup>
      <P>Was this Video Accurate?</P>
      <FixturaGroup position="center">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ActionIcon onClick={() => handleDownloadFeedback(true)} color="green"><IconThumbUp /></ActionIcon>
            <ActionIcon onClick={() => handleDownloadFeedback(false)} color="red"><IconThumbDown /></ActionIcon>
          </>
        )}
      </FixturaGroup>
      {error && <P color="red">{error}</P>}
    </FixturaGroup>
  );
};

// Future Improvements:
// - Consider implementing a context provider for global state management (e.g., feedbackSent, isLoading) if this pattern is used across multiple components.
// - Explore lazy loading for video components to improve performance in case of multiple videos on the same page.

// LLM Notes:
// This file defines a React component for an HTML5 video player with additional functionality such as downloading the video, providing feedback on the video accuracy, and tracking user interactions for analytics. The video player is wrapped in custom styled components for consistent UI. Error handling is implemented for the feedback submission process. The component resides within a project's components directory, likely under a subdirectory like `components/video` or `components/ui`.
