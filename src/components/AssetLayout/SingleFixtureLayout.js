"use client";
// Dev notes: Refactored for improved readability, efficiency, and error handling. Recommendations for future improvements include considering a more modular approach to handle data processing and UI component rendering separately, and integrating TypeScript for type safety.
import { useState } from "react";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { SingleImageWithDownload } from "@/components/AssetLayout/Image/createImages";
import { SelectedWriteup } from "@/components/AssetLayout/Article/supportingArticles";
import { P } from "@/components/Type/Paragraph";
import { Box, Group, ScrollArea, Select } from "@mantine/core";
import { FixturaPaper } from "@/components/containers/paper";
import { DefaultHeader } from "@/components/AssetLayout/AssetLayout";

import { NoDataFound } from "@/components/errors/NoDataFound";
import { AssetHasError } from "@/components/errors/AssetHasError";
//import { GetActiveAssetType } from "@/utils/getActiveAssetOBJ";
import { useActiveAssetType } from "@/Hooks/useActiveAssetType";

export async function SingleFixtureLayout(props) {
  //const useAssetType = await GetActiveAssetType(); 
  const useAssetType = useActiveAssetType();
  console.log("useAssetType ", useAssetType)
  if (!useAssetType.useAssetData.length) return <NoDataFound />;

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
  return (
    <FixturaComponent>
      <DefaultHeader {...props} />
      {Graphics.downloads.map((dl, i) => {
        return (
          <Box my={50} key={i}>
            {/* <MatchDetails FixtureDetails={Fixture.game_meta_data[0]} /> */}
            <FixturaGRIDOUTER>
              <FixturaGRIDCOL span={5}>
                <SingleImageWithDownload URL={dl} key={i} />
              </FixturaGRIDCOL>
              <FixturaGRIDCOL span={7}>
                <FixturaPaper key={i}>
                  <SelectedArticle
                    gameMetaData={useAssetType.useAssetData.articles[i]}
                  />
                </FixturaPaper>
              </FixturaGRIDCOL>
            </FixturaGRIDOUTER>
          </Box>
        );
      })}
    </FixturaComponent>
  );
}

const SelectedArticle = ({ gameMetaData }) => {
  // Prepare options for the Select component

  // Initial state is the first article's EditorsArticle, if available
  const [selectedArticle, setSelectedArticle] = useState(
    gameMetaData?.ArticleJournalist || ""
  );

  /* const articleOptions = gameMetaData[0]?.gtp_3_reports.map(
    (report, index) => ({
      value: report.EditorsArticle,
      label: report.CompositionID || `Article ${index + 1}`, // Fallback to a default name if no name is available
    })
  ); */

  /* const handleChange = (value) => {
    setSelectedArticle(value);
  }; */

  return (
    <Box>
      <ScrollArea style={{ height: 400 }}>
        {selectedArticle ? (
          <SelectedWriteup selectedArticle={selectedArticle} />
        ) : (
          <NoArticleMessage />
        )}
      </ScrollArea>
      {/*  {gameMetaData[0]?.gtp_3_reports.length === 1 ? (
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
      )} */}
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
