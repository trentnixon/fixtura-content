"use client";
// Dev notes: Refactored for improved readability, efficiency, and error handling. Recommendations for future improvements include considering a more modular approach to handle data processing and UI component rendering separately, and integrating TypeScript for type safety.
import { useState } from "react";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { SingleImageWithDownload } from "@/components/AssetLayout/Image/createImages";
import { SelectedWriteup } from "@/components/AssetLayout/Article/supportingArticles";
import { P } from "@/components/Type/Paragraph";
import { Box, Group, ScrollArea } from "@mantine/core";
import { FixturaPaper } from "@/components/containers/paper";
import { DefaultHeader } from "@/components/AssetLayout/AssetLayout";

import { NoDataFound } from "@/components/errors/NoDataFound";
import { AssetHasError } from "@/components/errors/AssetHasError";
//import { GetActiveAssetType } from "@/utils/getActiveAssetOBJ";
import { useActiveAssetType } from "@/Hooks/useActiveAssetType";

export async function SingleFixtureLayout(props) {
  //const useAssetType = await GetActiveAssetType();
  const useAssetType = useActiveAssetType();
  console.log("useAssetType ", useAssetType, useAssetType.useAssetData.length);

  //if (!useAssetType.useAssetData.length) return;

  const Graphics = useAssetType.useAssetData.graphics[0];
  console.log("Graphics ", Graphics);
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
               {/*  Information about game | playHQ link | Data infor was taken |
                view infor that makes this image */}
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

  return (
    <Box>
      <ScrollArea style={{ height: 400 }}>
        {selectedArticle ? (
          <SelectedWriteup selectedArticle={selectedArticle} />
        ) : (
          <NoArticleMessage />
        )}
      </ScrollArea>
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
