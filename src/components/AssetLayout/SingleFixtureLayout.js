"use client";
// Dev notes: Refactored for improved readability, efficiency, and error handling. Recommendations for future improvements include considering a more modular approach to handle data processing and UI component rendering separately, and integrating TypeScript for type safety.

import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { SingleImageWithDownload } from "@/components/AssetLayout/Image/createImages";
import { SelectedWriteup } from "@/components/AssetLayout/Article/supportingArticles";
import { P } from "@/components/Type/Paragraph";
import { Box, Group, ScrollArea, Select } from "@mantine/core";
import { FixturaPaper } from "@/components/containers/paper";
import { DefaultHeader } from "@/components/AssetLayout/AssetLayout";
import { useState } from "react";

export function SingleFixtureLayout({ OBJ }) {
  if (!OBJ || typeof OBJ !== "object") {
    // Dev notes: Added error handling for invalid OBJ input to improve debugging
    console.error("Invalid OBJ provided to AssetLayoutFixtures");
    return null; // Consider providing a fallback UI or error message here
  }

  return (
    <FixturaComponent>
      <DefaultHeader OBJ={OBJ} />
      {OBJ.FixturesToDisplay.map((Fixture, index) => {
        if (Fixture.game_meta_data.length !== 0) {
          console.log(Fixture, Fixture?.game_meta_data[0]?.gtp_3_reports);
          return (
            <Box my={50} key={index}>
              <MatchDetails FixtureDetails={Fixture.game_meta_data[0]} />

              <FixturaGRIDOUTER>
                <FixturaGRIDCOL span={5}>
                  <SingleImageWithDownload URL={Fixture.URL} key={index} />
                </FixturaGRIDCOL>
                <FixturaGRIDCOL span={7}>
                  <FixturaPaper key={index}>
                    <SelectedArticle gameMetaData={Fixture.game_meta_data} />
                    {/* <ScrollArea height={450}>
                      {Fixture.game_meta_data.length > 0 ? (
                        <SelectedWriteup
                          selectedArticle={
                            Fixture.game_meta_data[0].gtp_3_reports[0]
                              ?.EditorsArticle
                          }
                        />
                      ) : (
                        <NoArticleMessage />
                      )}
                    </ScrollArea> */}
                  </FixturaPaper>
                </FixturaGRIDCOL>
              </FixturaGRIDOUTER>
            </Box>
          );
        }
      })}
    </FixturaComponent>
  );
}

const SelectedArticle = ({ gameMetaData }) => {
  // Initial state is the first article's EditorsArticle, if available
  const [selectedArticle, setSelectedArticle] = useState(
    gameMetaData[0]?.gtp_3_reports[0]?.EditorsArticle || ""
  );

  // Prepare options for the Select component
  console.log("gameMetaData[0]?.gtp_3_reports", gameMetaData[0]?.gtp_3_reports);
  const articleOptions = gameMetaData[0]?.gtp_3_reports.map(
    (report, index) => ({
      value: report.EditorsArticle,
      label: report.CompositionID || `Article ${index + 1}`, // Fallback to a default name if no name is available
    })
  );

  const handleChange = (value) => {
    setSelectedArticle(value);
  };

  return (
    <Box>
      <ScrollArea style={{ height: 400 }}>
        {selectedArticle ? (
          <SelectedWriteup selectedArticle={selectedArticle} />
        ) : (
          <NoArticleMessage />
        )}
      </ScrollArea>
      {gameMetaData[0]?.gtp_3_reports.length === 1 ? (
        false
      ) : (
        <Select
          label="Writeup Options"
          placeholder="Choose a Writeup"
          data={articleOptions}
          onChange={handleChange}
          value={selectedArticle}
          mt={30}
        />
      )}
    </Box>
  );
};

const MatchDetails = ({ FixtureDetails }) => {
  return (
    <Box mb={0}>
      <Group position="apart">
        <P fw={400} fz=".8em" c="gray.8">
          {FixtureDetails?.round}
        </P>
        <P fw={400} fz=".8em" c="gray.8">
          {FixtureDetails?.ground}
        </P>
      </Group>
      <Group position="apart">
        <P fw={600} fz="1.1em" c="gray.8">
          {FixtureDetails.teamHome} {FixtureDetails.Homescores}{" "}
          {FixtureDetails.HomeOvers}
        </P>
        <P fw={400} fz=".8em" c="gray.8">
          VS
        </P>
        <P fw={600} fz="1.1em" c="gray.8">
          {FixtureDetails.Awayscores} {FixtureDetails.AwayOvers}{" "}
          {FixtureDetails.teamAway}
        </P>
      </Group>
      <P ta="center" fw={400} fz=".8em" c="gray.8" my={10}>
        {FixtureDetails?.ResultStatement}
      </P>
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
