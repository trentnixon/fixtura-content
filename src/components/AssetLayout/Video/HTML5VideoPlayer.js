"use client";
import { useEffect, useState } from "react";
import { handleVideoDownload } from "@/utils/helpers";
import { FixturaBtnGroup, FixturaGroup } from "@/components/containers/Group";
import {
  IconDownload,
  IconThumbDown,
  IconThumbUp,
  IconCode,
  IconCopy,
  IconX,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Box,
  Loader,
  LoadingOverlay,
  Button,
  Tooltip,
} from "@mantine/core";
import { FixturaBox } from "@/components/containers/boxes";
import { trackCustomEvent } from "@/utils/GA";
import { P } from "@/components/Type/Paragraph";
import { userFeedbackOnDownload } from "@/api/downloads";
import { BUTTON_ICON_FUNC } from "@/components/UI/buttons";

export const HTML5VideoPlayer = ({ video }) => {
  const [visible, setVisible] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [showIframeCode, setShowIframeCode] = useState(false);
  const { Name, downloads, isAccurate, id } = video;
  const URL = downloads[0].url;
  const iframeCode = `<iframe width="540" height="675" src="${URL}" title="YouTube video player" frameborder="0" allowfullscreen></iframe>`;

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

  useEffect(() => {
    if (!visible && hasBeenClicked) {
      setVisible(false);
    }
  }, [hasBeenClicked, visible]);

  const handlePlay = () => trackCustomEvent("Video", "Play", Name);
  const handlePause = () => trackCustomEvent("Video", "Pause", Name);

  const handleIframeCodeToggle = () => {
    setShowIframeCode(!showIframeCode);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iframeCode);
  };

  return (
    <>
      <FixturaGroup my={10} position="right">
        <CTAGroup
          onClick={handleClick}
          disabled={hasBeenClicked}
          onIframeClick={handleIframeCodeToggle}
        />
      </FixturaGroup>
      <Box>
        {showIframeCode && (
          <Box>
            <P fw="800">Embed Video</P>
            <P>Copy the code below and paste it into your website&rsquo;s HTML.</P>
            <FixturaBox p={"xs"} m={"xs"} c={1}>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  fontSize: ".9em",
                  lineHeight: "1em",
                }}
              >
                {iframeCode}
              </pre>
            </FixturaBox>
            <FixturaBtnGroup>
              <BUTTON_ICON_FUNC
                size="md"
                label="Copy Code"
                Color="green"
                onClick={copyToClipboard}
                Icon={<IconCopy />}
              />

              <BUTTON_ICON_FUNC
                size="md"
                label="Close"
                Color="red"
                onClick={handleIframeCodeToggle}
                Icon={<IconX />}
              />
            </FixturaBtnGroup>
          </Box>
        )}

        {!showIframeCode && (
          <FixturaBox p={"xs"} c={1}>
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
                onPlay={handlePlay}
                onPause={handlePause}
              />
            </div>
          </FixturaBox>
        )}
      </Box>
    </>
  );
};

const CTAGroup = ({ onClick, disabled, onIframeClick }) => {
  return (
    <FixturaBtnGroup>
      <BUTTON_ICON_FUNC
        size="md"
        label="Download Video"
        onClick={onClick}
        disabled={disabled}
        Icon={<IconDownload />}
      />
      <BUTTON_ICON_FUNC
        size="md"
        label="Embed Video"
        onClick={onIframeClick}
        disabled={disabled}
        Icon={<IconCode />}
      />
    </FixturaBtnGroup>
  );
};
