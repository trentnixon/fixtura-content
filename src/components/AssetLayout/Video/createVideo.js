// Using "use client" directive for client-side operations
"use client";

// Importing necessary components from the project structure
import { P } from "@/components/Type/Paragraph";
import { HTML5VideoPlayer } from "@/components/AssetLayout/Video/HTML5VideoPlayer";
import { FixturaPaper } from "@/components/containers/paper";
import { FixturaGroup } from "@/components/containers/Group";
import { IconVideo } from "@tabler/icons-react";
import { AssetHasError } from "@/components/errors/AssetHasError";
import { GetActiveAssetType } from "@/utils/getActiveAssetOBJ";

// DisplayVideoAsset function component for displaying video assets
export async function DisplayVideoAsset() {
  const useAssetType = await GetActiveAssetType(); 
  const useVideos = useAssetType.useAssetData.videos;
  // Validation: Check for empty or invalid input to prevent runtime errors
  if (!useVideos || !Array.isArray(useVideos) || useVideos.length === 0) {
    // Logging for debugging and future reference
    console.error("DisplayVideoAsset: Invalid or empty OBJ array.");
    // Render error state if OBJ is invalid or empty
    return <VideoError />;
  }

  // Extracting the first item for error handling checks
  const firstItem = useVideos[0];

  // Check for error state in the first item of the OBJ array
  if (firstItem.hasError) {
    return (
      <AssetHasError
        assetID={firstItem.id}
        forceRerender={firstItem.forceRerender}
        hasBeenProcessed={firstItem.hasBeenProcessed}
      />
    );
  }

  // Main render method for DisplayVideoAsset
  return (
    <>
      <FixturaPaper c={1} shadow={"none"} p={5} my={10}>
        <FixturaGroup position="right">
          <P fz="lg" c={"gray.7"} fw={900} ta={"right"} my={7}>
            Video
          </P>
          <IconVideo />
        </FixturaGroup>
      </FixturaPaper>
      {useVideos.map((video, i) => (
        <HTML5VideoPlayer key={i} video={video} />
      ))}
    </>
  );
}

// VideoError component to display error messages
const VideoError = () => (
  <FixturaPaper c={0}>
    <P ta={"center"} c="red.9" fw={600}>
      There was an Error when creating your video.
    </P>
    <P ta={"center"} c="red.9">
      Please contact us to re-render this asset
    </P>
  </FixturaPaper>
);

// Developer notes:
// - Refactored to ensure validation of the OBJ prop at the beginning of the component to handle edge cases more effectively.
// - Standardized error handling with a dedicated VideoError component for consistency and maintainability.
// - Removed unnecessary null check for OBJ since it's validated at the start.
// - Recommend future improvements to include more granular error handling and user feedback mechanisms.
// - Consider implementing a more sophisticated logging system for production environments to track errors and usage metrics.

// LLM Notes:
// This file is part of a React-based web application, specifically for displaying video assets.
// It's located under the components directory, typically used in asset display contexts.
// The DisplayVideoAsset function component takes an array of video objects (OBJ) and renders them using the HTML5VideoPlayer component.
// It includes error handling for scenarios where the video data might be incomplete or erroneous.
