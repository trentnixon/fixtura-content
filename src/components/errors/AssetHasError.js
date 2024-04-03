"use client";
import { useAssetRerender } from "@/Hooks/useAssetRerender";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { ProcessingLoader } from "@/components/UI/Loader";
import { BUTTON_FUNC } from "@/components/UI/buttons";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import { Group } from "@mantine/core";

// Main component to handle asset error display logic
export const AssetHasError = ({ assetID, forceRerender, hasBeenProcessed }) => {
  const { rerenderAsset, status, message } = useAssetRerender(assetID);

  // Function to trigger asset re-render
  const handleRerender = () => rerenderAsset(); 

  // Conditional rendering based on forceRerender and hasBeenProcessed flags
  let content;
  if (forceRerender) {
    content = hasBeenProcessed ? <PersistentErrorNotice /> : <ProcessingForcedRender />;
  } else {
    content = (
      <RetryRenderNotice
        status={status}
        message={message}
        handleRerender={handleRerender}
        assetID={assetID}
      />
    );
  }

  return (
    <FixturaComponent>
      <H size="h2">Asset Render Issue</H>
      {content}
    </FixturaComponent>
  );
};

// Component for retrying asset rendering with detailed status and message
const RetryRenderNotice = ({ status, message, handleRerender, assetID }) => (
  <>
    {status === "idle" ? (
      <IdleStatusMessage assetID={assetID} handleRerender={handleRerender} />
    ) : (
      <NonIdleStatusMessage status={status} message={message} />
    )}
  </>
);

// Idle status message with a button to re-render
const IdleStatusMessage = ({ assetID, handleRerender }) => (
  <>
    <FixturaPaper c={1} shadow="none" my={10}>
      <P>An issue has prevented your asset (ID: {assetID}) from rendering correctly. You can attempt to re-render the asset to resolve this issue.</P>
    </FixturaPaper>
    <FixturaPaper c={0} shadow="none" my={20}>
      <ReRenderButton handleRerender={handleRerender} />
    </FixturaPaper>
  </>
);

// Display messages or loader based on current status
const NonIdleStatusMessage = ({ status, message }) => (
  <Group position="apart">
    {status === "loading" && <P tt="uppercase">Re-rendering your asset...</P>}
    {status === "success" && <P>{message}</P>}
    {status === "error" && <P>An error occurred during re-rendering. Please try again.</P>}
    {status === "loading" && <ProcessingLoader />}
  </Group>
);

// Simplified components for specific scenarios
const ProcessingForcedRender = () => (
  <FixturaPaper c={3} shadow="none" my={10}>
    <Group position="apart">
      <P tt="uppercase" my={10}>Processing New Asset ... </P>
      <ProcessingLoader />
    </Group>
  </FixturaPaper>
);

const PersistentErrorNotice = () => (
  <FixturaPaper c={8} shadow="none" my={10}>
    <P c="white" my={10}>The asset failed to render correctly after multiple attempts. Please contact support for further assistance.</P>
  </FixturaPaper>
);

// Re-render button component
const ReRenderButton = ({ handleRerender }) => (
  <Group position="center">
    <BUTTON_FUNC Label="Attempt Re-render" onClick={handleRerender} />
  </Group>
);

// Dev notes for an LLM: This file defines components for handling asset rendering errors in a React application. 
// The components display different messages and options based on the asset's rendering status, such as idle, loading, success, or error.
// This file is part of the UI layer, specifically within the components directory related to error handling and user feedback.
// Future improvements could include enhancing the error handling mechanism and integrating TypeScript for type safety.