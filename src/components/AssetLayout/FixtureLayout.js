"use client";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { SingleImageWithDownload } from "@/components/AssetLayout/Image/createImages";
import { SelectedWriteup } from "@/components/AssetLayout/Article/supportingArticles";
import { P } from "@/components/Type/Paragraph";
import { Box, Group, ScrollArea } from "@mantine/core";
import { FixturaPaper } from "@/components/containers/paper";
import { DefaultHeader } from "@/components/AssetLayout/AssetLayout";

export function AssetLayoutFixtures({ OBJ }) {
  const filteredFixtures = findFilteredFixtures(OBJ);

  return (
    <FixturaComponent>
      <DefaultHeader OBJ={OBJ} />
      {filteredFixtures.map((Fixture, i) => {
        const FixtureOBJ = createFixtureOBJ(Fixture, OBJ);
        return (
          <Box my={50} key={i}>
            <MatchDetails FixtureOBJ={FixtureOBJ} />

            <FixturaGRIDOUTER>
              <FixturaGRIDCOL span={5}>
                {FixtureOBJ.FixtureGraphic.map((Graphic, i) => {
                  return (
                    <SingleImageWithDownload
                      URL={Graphic.attributes.URL}
                      key={i}
                    />
                  );
                })}
              </FixturaGRIDCOL>
              <FixturaGRIDCOL span={7}>
                <FixturaPaper key={i}>
                  <ScrollArea h={450}>
                    {FixtureOBJ.Articles.length !== 0 ? (
                      <SelectedWriteup
                        selectedArticle={
                          FixtureOBJ.Articles[0].attributes?.EditorsArticle
                        }
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

// external Component

const MatchDetails = ({ FixtureOBJ }) => {
  const { FixtureDetails } = FixtureOBJ;
  console.log("FixtureDetails ", FixtureDetails);
  return (
    <Box mb={0}>
      <Group position="apart">
        <P fw={400} fz={".8em"} c="gray.8">
          {FixtureDetails?.round}
        </P>
        <P fw={400} fz={".8em"} c="gray.8">
          {FixtureDetails?.ground}
        </P>
      </Group>
      <Group position="apart">
        <P fw={600} fz={"1.1em"} c="gray.8">
          {FixtureDetails.teamHome} {FixtureDetails.Homescores}{" "}
          {FixtureDetails.HomeOvers}
        </P>
        <P fw={400} fz={".8em"} c="gray.8">
          VS
        </P>
        <P fw={600} fz={"1.1em"} c="gray.8">
          {FixtureDetails.Awayscores} {FixtureDetails.AwayOvers}{" "}
          {FixtureDetails.teamAway}
        </P>
      </Group>

      <P ta="center" fw={400} fz={".8em"} c="gray.8" my={10}>
        {FixtureDetails?.ResultStatement}
      </P>
    </Box>
  );
};

// A component for displaying when no article is found
const NoArticleMessage = () => (
  <Box textAlign="center" py={20}>
    <P fw={500} fz={"sm"} c="gray.6" ta="center">
      No articles available at the moment.
    </P>
  </Box>
);

// Data functions
const processCategory = (OBJ) => {
  let Category = OBJ.AssetMetaData.Category;
  if (
    OBJ.AssetMetaData.AccountType === "Association" &&
    OBJ.AssetMetaData.group_assets_by
  ) {
    const splitCategory = Category.split("-").map((part) => part.trim());
    return splitCategory[1] || "";
  }
  return Category;
};

/* findFilteredFixtures  **************** */
const findFilteredFixtures = (OBJ) => {
  // Extract the category from OBJ using processCategory function
  const Category = processCategory(OBJ);
  // Destructure AccountType and group_assets_by from AssetMetaData for easy access
  const { AccountType, group_assets_by } = OBJ.AssetMetaData;

  // Default filter key for 'Club' AccountType
  let filterKey = AccountType === "Club" ? "ageGroup" : "gradeName";
  // Determine if the competition path should be used
  let isCompetitionPath = AccountType !== "Club" && !group_assets_by;

  // Change filterKey to 'competitionName' if it's a competition path
  if (isCompetitionPath) {
    filterKey = "competitionName";
  }

  // Filter the FixturesToDisplay data
  return OBJ.FixturesToDisplay.data.filter((fixture) => {
    // Safely navigate to grade data
    let gradeData =
      fixture.attributes.game_meta_datum.data.attributes.grade.data;
    let categoryValue;

    // Extract the categoryValue based on whether it's a competition path
    if (
      isCompetitionPath &&
      gradeData.attributes &&
      gradeData.attributes.competition &&
      gradeData.attributes.competition.data
    ) {
      // Accessing competitionName from the nested competition data
      categoryValue =
        gradeData.attributes.competition.data.attributes[filterKey];
    } else if (gradeData.attributes) {
      // Accessing ageGroup/gradeName from grade data
      categoryValue = gradeData.attributes[filterKey];
    }

    // Compare the extracted categoryValue with the Category
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

// Helper functions
// Filters image data based on game ID and asset name with added robustness
const filterImages = (DATA, ID) => {
  return DATA.filter((download) => {
    const GameMetaData = download.attributes.game_meta_data?.data[0];
    if (!GameMetaData) return false;

    const GameID = GameMetaData.id;
    const AssetName = download.attributes.asset.data.attributes.Name;

    return ID === GameID && AssetName === "Weekend Result Single Game";
  });
};

// Filters write-ups based on name, write-up ID, and bias with type checks
const filterWriteUps = (writeUps, Name, WriteupID) => {
  return writeUps.filter((writeUp) => {
    const writeUpName = writeUp.attributes.asset.data.attributes.Name;
    const writeUpArticleFormats =
      writeUp.attributes.asset.data.attributes.ArticleFormats;
    const writeUpBias = writeUp.attributes.Bias;

    const isBiasMatch = Number(writeUpBias) === Number(WriteupID); // Ensure numerical comparison

    if (Array.isArray(Name)) {
      return (
        isBiasMatch &&
        Name.includes(writeUpName) &&
        writeUpArticleFormats === "Breakdown"
      );
    }

    return (
      isBiasMatch &&
      writeUpName === Name &&
      writeUpArticleFormats === "Breakdown"
    );
  });
};
