"use client";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { SingleImageWithDownload } from "@/components/AssetLayout/Image/createImages";
import { SelectedWriteup } from "@/components/AssetLayout/Article/supportingArticles";
import { P } from "@/components/Type/Paragraph";
import { Box, ScrollArea } from "@mantine/core";
import { FixturaPaper } from "@/components/containers/paper";
import { DefaultHeader } from "@/components/AssetLayout/AssetLayout";

export function AssetLayoutFixtures({ OBJ }) {
  const filteredFixtures = findfilteredFixtures(OBJ);

  return (
    <FixturaComponent>
      <DefaultHeader OBJ={OBJ} />
      {filteredFixtures.map((Fixture, i) => {
        const FixtureOBJ = createFixtureOBJ(Fixture, OBJ);
        return (
          <Box my={50} key={i}>
            <Box mb={0}>
              <FixturaPaper c={2} shadow={"none"} mb={0}>
                <P fw={400} fz={"1.3em"} c="gray.8">
                  {FixtureOBJ.FixtureDetails.teamHome} vs{" "}
                  {FixtureOBJ.FixtureDetails.teamAway}
                </P>
                <P fw={600} c="gray.8">
                  {FixtureOBJ.FixtureDetails.Homescores}{" "}
                  {FixtureOBJ.FixtureDetails.HomeOvers} vs{" "}
                  {FixtureOBJ.FixtureDetails.Awayscores}{" "}
                  {FixtureOBJ.FixtureDetails.AwayOvers}
                </P>
              </FixturaPaper>
            </Box>
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
                      <>No Article Found</>
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

// Helper functions

const processCategory = (OBJ) => {
  let Category = OBJ.AssetMetaData.Category;
  if (OBJ.AssetMetaData.AccountType === "Association") {
    const splitCategory = Category.split("-").map((part) => part.trim());
    return splitCategory[1] || "";
  }
  return Category;
};

const findfilteredFixtures = (OBJ) => {
    const Category = processCategory(OBJ);
    const filterKey = OBJ.AssetMetaData.AccountType === "Club" ? "ageGroup" : "gradeName";
  
    return OBJ.FixturesToDisplay.data.filter((fixture) => {
      const categoryValue = fixture.attributes.game_meta_datum.data.attributes.grade.data.attributes[filterKey];
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
