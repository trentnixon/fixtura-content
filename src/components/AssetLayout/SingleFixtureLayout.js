"use client";
import { useState } from "react";
import {
  FixturaComponent,
  RoundedSectionContainer,
} from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { SingleImageWithDownload } from "@/components/AssetLayout/Image/createImages";
import { SelectedWriteup } from "@/components/AssetLayout/Article/supportingArticles";
import { P } from "@/components/Type/Paragraph";
import { Input, Box, Group } from "@mantine/core";
import { FixturaPaper } from "@/components/containers/paper";
import { DefaultHeader } from "@/components/AssetLayout/AssetLayout";
import { NoDataFound } from "@/components/errors/NoDataFound";
import { AssetHasError } from "@/components/errors/AssetHasError";
import { useActiveAssetType } from "@/Hooks/useActiveAssetType";
import SingleFixtureResultTable from "@/components/AssetLayout/Table/SingleFixtureResultTable";
import { BUTTON_FUNC } from "@/components/UI/buttons";
import { ArticleActionButtonsContainer } from "@/components/AssetLayout/Article/ArticleButtons";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";

export function SingleFixtureLayout(props) {
  const [selectedFixture, setSelectedFixture] = useState(null); // Track selected fixture
  const useAssetType = useActiveAssetType();
  const Graphics = useAssetType.useAssetData.graphics[0];

  if (useAssetType.useAssetData.graphics.length === 0) return <NoDataFound />;

  if (Graphics.hasError) {
    return (
      <AssetHasError
        errorType={Graphics.errorHandler.Type}
        errorMsg={Graphics.errorHandler.Message}
        assetID={Graphics.id}
      />
    );
  }

  // Step 1: Format the data by combining graphics with articles (no memoization)
  const formattedAssets = Graphics.downloads.map((graphic, index) => {
    const correspondingArticle =
      useAssetType.useAssetData.articles[index] || {};
    return {
      id: correspondingArticle.id,
      name: correspondingArticle.Name,
      url: graphic.url,
      structuredOutput: correspondingArticle.structuredOutput || {},
      hasError: correspondingArticle.hasError,
      hasCompleted: correspondingArticle.hasCompleted,
      errorHandler: correspondingArticle.errorHandler,
    };
  });

  // Step 2: Function to handle fixture selection by finding the correct item using the ID
  const handleFixtureSelect = (fixtureId) => {
    const selectedFixture = Graphics.downloads.find(
      (_, index) => useAssetType.useAssetData.articles[index].id === fixtureId
    );
    setSelectedFixture(selectedFixture);
  };

  // Function to go back to the table
  const handleBackToTable = () => {
    setSelectedFixture(null); // Reset the selected fixture
  };

  return (
    <FixturaComponent>
      <DefaultHeader {...props} />
      <P my={20}>
        The Weekend Results provide a graphic overview and multiple write-up
        options for each game. Search or select a fixture below to view the
        available assets
      </P>
      {selectedFixture === null ? (
        <>
          <LocalFilterTable
            formattedAssets={formattedAssets}
            onSelectFixture={handleFixtureSelect} // Pass the fixture selection by ID
          />
        </>
      ) : (
        // Show the selected fixture if one is selected
        <Box my={50}>
          <RoundedSectionContainer
            title={""}
            topContent={
              <Group position="right">
                <BUTTON_FUNC
                  Label="Back to Fixtures"
                  onClick={handleBackToTable}
                  size="xs"
                  Color="green"
                  variant="subtle"
                />
              </Group>
            }
            bottomContent={
              <FixturaGRIDOUTER>
                <FixturaGRIDCOL span={5}>
                  <SingleImageWithDownload URL={selectedFixture} />
                </FixturaGRIDCOL>
                <FixturaGRIDCOL span={7}>
                  <FixturaBox baseColor="gray" c={0} p={0}>
                    <ArticleActionButtonsContainer copyID={`copy_selected`} />
                    <FixturaBox p="xs" baseColor="gray" c={1}>
                      <DisplayFixtureArticle
                        gameMetaData={
                          useAssetType.useAssetData.articles[
                            Graphics.downloads.indexOf(selectedFixture)
                          ].structuredOutput
                        }
                        copyID={`copy_selected`}
                      />
                    </FixturaBox>
                  </FixturaBox>
                </FixturaGRIDCOL>
              </FixturaGRIDOUTER>
            }
          />
        </Box>
      )}
    </FixturaComponent>
  );
}

/* ------------------------------------------------------------------- */
// This component handles the local filter input and filters without causing unnecessary re-renders.
const LocalFilterTable = ({ formattedAssets, onSelectFixture }) => {
  const [filterInput, setFilterInput] = useState(""); // Local state for filter input

  // Step 3: Filter the data based on user input
  const filteredAssets = formattedAssets.filter((asset) => {
    const { structuredOutput } = asset;
    const searchStr = filterInput.toLowerCase();

    return (
      structuredOutput.match_identifier?.toLowerCase().includes(searchStr) ||
      structuredOutput.team1?.toLowerCase().includes(searchStr) ||
      structuredOutput.team2?.toLowerCase().includes(searchStr)
    );
  });

  return (
    <>
      <RoundedSectionContainer
        title={""}
        topContent={
          <Group position="apart">
            <Box>
              <H size="h6">Select a Fixture</H>
            </Box>

            <Input
              placeholder="Filter by Team Name"
              value={filterInput}
              onChange={(event) => setFilterInput(event.currentTarget.value)}
              mb="md"
              style={{
                marginBottom: 0,
              }}
            />
          </Group>
        }
        bottomContent={
          <SingleFixtureResultTable
            filteredAssets={filteredAssets}
            onSelectFixture={onSelectFixture}
          />
        }
      />
    </>
  );
};

/* ------------------------------------------------------------------- */
const DisplayFixtureArticle = ({ gameMetaData, copyID }) => {
  return (
    <Box>
      {gameMetaData ? (
        <SelectedWriteup selectedArticle={gameMetaData} copyID={copyID} />
      ) : (
        <NoArticleMessage />
      )}
    </Box>
  );
};

const NoArticleMessage = () => (
  <Box textAlign="center" py={20}>
    <P fw={500} fz="sm" c="gray.6" ta="center">
      No articles available at the moment.
    </P>
  </Box>
);
