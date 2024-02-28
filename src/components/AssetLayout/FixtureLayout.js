"use client";
// Dev notes: Refactored for improved readability, efficiency, and error handling. Recommendations for future improvements include considering a more modular approach to handle data processing and UI component rendering separately, and integrating TypeScript for type safety.

import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { SingleImageWithDownload } from "@/components/AssetLayout/Image/createImages";
import { SelectedWriteup } from "@/components/AssetLayout/Article/supportingArticles";
import { P } from "@/components/Type/Paragraph";
import { Box, Group, ScrollArea } from "@mantine/core";
import { FixturaPaper } from "@/components/containers/paper";
import { DefaultHeader } from "@/components/AssetLayout/AssetLayout";

export function AssetLayoutFixtures({ OBJ }) {
  if (!OBJ || typeof OBJ !== 'object') {
    // Dev notes: Added error handling for invalid OBJ input to improve debugging
    console.error("Invalid OBJ provided to AssetLayoutFixtures");
    return null; // Consider providing a fallback UI or error message here
  }


  const filteredFixtures = findFilteredFixtures(OBJ);

  return (
    <FixturaComponent>
      <DefaultHeader OBJ={OBJ} />
      {filteredFixtures.map((Fixture, index) => {
        const FixtureOBJ = createFixtureOBJ(Fixture, OBJ);
        return (
          <Box my={50} key={index}>
            <MatchDetails FixtureOBJ={FixtureOBJ} />
            <FixturaGRIDOUTER>
              <FixturaGRIDCOL span={5}>
                {FixtureOBJ.FixtureGraphic.map((Graphic, graphicIndex) => (
                  <SingleImageWithDownload
                    URL={Graphic.attributes.URL}
                    key={graphicIndex}
                  />
                ))}
              </FixturaGRIDCOL>
              <FixturaGRIDCOL span={7}>
                <FixturaPaper key={index}>
                  <ScrollArea height={450}>
                    {FixtureOBJ.Articles.length > 0 ? (
                      <SelectedWriteup
                        selectedArticle={FixtureOBJ.Articles[0].attributes?.EditorsArticle}
                      />
                    ) : (
                      <NoArticleMessage />
                    )}
                  </ScrollArea>
                </FixturaPaper>
              </FixturaGRIDCOL>
            </FixturaGRIDOUTER>
          </Box>
        );
      })}
    </FixturaComponent>
  );
}

const MatchDetails = ({ FixtureOBJ }) => {
  const { FixtureDetails } = FixtureOBJ;
  return (
    <Box mb={0}>
      <Group position="apart">
        <P fw={400} fz=".8em" c="gray.8">{FixtureDetails?.round}</P>
        <P fw={400} fz=".8em" c="gray.8">{FixtureDetails?.ground}</P>
      </Group>
      <Group position="apart">
        <P fw={600} fz="1.1em" c="gray.8">
          {FixtureDetails.teamHome} {FixtureDetails.Homescores} {FixtureDetails.HomeOvers}
        </P>
        <P fw={400} fz=".8em" c="gray.8">VS</P>
        <P fw={600} fz="1.1em" c="gray.8">
          {FixtureDetails.Awayscores} {FixtureDetails.AwayOvers} {FixtureDetails.teamAway}
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

// Refactored data functions and added comments for clarity and error handling improvements
const processCategory = (OBJ) => {
  if (!OBJ?.AssetMetaData?.Category) return ""; // Dev notes: Added error handling for missing Category
  let Category = OBJ.AssetMetaData.Category;
  if (OBJ.AssetMetaData.AccountType === "Association" && OBJ.AssetMetaData.group_assets_by) {
    // Find the index of the first hyphen
    const firstHyphenIndex = Category.indexOf("-");
    // Check if the hyphen exists in the string
    if (firstHyphenIndex !== -1) {
      // Extract everything after the first hyphen and trim whitespace
      return Category.substring(firstHyphenIndex + 1).trim();
    }
  }
  return Category;
};

const findFilteredFixtures = (OBJ) => {
  const Category = processCategory(OBJ);
 
  const { AccountType, group_assets_by } = OBJ.AssetMetaData;
  let filterKey = AccountType === "Club" ? "ageGroup" : "gradeName";
  let isCompetitionPath = AccountType !== "Club" && !group_assets_by;
  if (isCompetitionPath) {
    filterKey = "competitionName";
  }

  return OBJ.FixturesToDisplay.data.filter((fixture) => {
    let gradeData = fixture.attributes.game_meta_datum.data.attributes.grade.data;
    let categoryValue;
    if (isCompetitionPath && gradeData.attributes && gradeData.attributes.competition && gradeData.attributes.competition.data) {
      categoryValue = gradeData.attributes.competition.data.attributes[filterKey];
    } else if (gradeData.attributes) {
      categoryValue = gradeData.attributes[filterKey];
    }
    return categoryValue === Category;
  });
};

const createFixtureOBJ = (Fixture, OBJ) => {
  const FixtureDetails = Fixture.attributes.game_meta_datum.data.attributes;
  const Articles = filterWriteUps(
    FixtureDetails.gtp_3_reports.data,
    OBJ.AssetMetaData.Writeup,
    OBJ.AssetMetaData.WriteupID
  );
  const FixtureGraphic = filterImages(
    OBJ.downloads,
    Fixture.attributes.game_meta_datum.data.id
  );
  return { FixtureDetails, Articles, FixtureGraphic };
};

const filterImages = (DATA, ID) => DATA.filter((download) => {
  const GameMetaData = download.attributes.game_meta_data?.data[0];
  if (!GameMetaData) return false;
  const GameID = GameMetaData.id;
  const AssetName = download.attributes.asset.data.attributes.Name;
  return ID === GameID && AssetName === "Weekend Result Single Game";
});

const filterWriteUps = (writeUps, Name, WriteupID) => writeUps.filter((writeUp) => {
  const writeUpName = writeUp.attributes.asset.data.attributes.Name;
  const writeUpArticleFormats = writeUp.attributes.asset.data.attributes.ArticleFormats;
  const isBiasMatch = Number(writeUp.attributes.Bias) === Number(WriteupID);
  if (Array.isArray(Name)) {
    return isBiasMatch && Name.includes(writeUpName) && writeUpArticleFormats === "Breakdown";
  }
  return isBiasMatch && writeUpName === Name && writeUpArticleFormats === "Breakdown";
});

// Notes for LLM: The AssetLayoutFixtures function component renders a layout for displaying sports fixture details, images, and related articles. It processes input data (OBJ) to filter and display relevant information for each fixture. This component is part of a larger sports-related web application, specifically within the UI components managing sports assets and their presentations. It is located in the `components/AssetLayout` directory.
