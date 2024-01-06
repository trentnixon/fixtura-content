"use client";
import { FixturaComponent } from "@/components/containers/containers";

import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import {
  ImageGalleryForAssets,
  SingleImageWithDownload,
} from "@/components/AssetLayout/Image/createImages";
import { DisplayVideoAsset } from "@/components/AssetLayout/Video/createVideo";
import {
  SelectedWriteup,
  SupportingArticleClientWithScroll,
} from "@/components/AssetLayout/Article/supportingArticles";
import { P } from "@/components/Type/Paragraph";
import { Box, ScrollArea } from "@mantine/core";
import { ArticleActionButtonsContainer } from "@/components/AssetLayout/Article/ArticleButtons";
import { FixturaPaper } from "@/components/containers/paper";
import { H } from "@/components/Type/Headers";

const DefaultHeader = ({ OBJ }) => {
  return (
    <FixturaPaper c={1} shadow={"none"} mb={20}>
      <H>{OBJ.AssetMetaData.AssetName}</H>
      <P>{OBJ.decodeURIComponent}</P>
    </FixturaPaper>
  );
};

export default function AssetLayout({ OBJ }) {
  return (
    <FixturaComponent>
      <DefaultHeader OBJ={OBJ} />
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={5}>
          <DisplayVideoAsset OBJ={OBJ} />
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={7}>
          <SupportingArticleClientWithScroll ITEMS={OBJ.ASSETDATA.Articles} />
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={12}>
          <ImageGalleryForAssets OBJ={OBJ} />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </FixturaComponent>
  );
}

export function AssetLayoutImagesOnly({ OBJ }) {
  return (
    <FixturaComponent>
      <DefaultHeader OBJ={OBJ} />
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={12}>
          <ImageGalleryForAssets OBJ={OBJ} />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </FixturaComponent>
  );
}

export function AssetLayoutFixtures({ OBJ }) {
  return (
    <FixturaComponent>
      <DefaultHeader OBJ={OBJ} />
      {OBJ.FixturesToDisplay.data.map((Fixture, i) => {
        const FixtureDetails =
          Fixture.attributes.game_meta_datum.data.attributes;
        const Articles = filterWriteUps(
          FixtureDetails.gtp_3_reports.data,
          "Weekend Results"
        );
          console.log(FixtureDetails)
        const FixtureGraphic = filterImages(
          OBJ.downloads,
          Fixture.attributes.game_meta_datum.data.id
        );
        return Articles.map((Article, i) => {
          return (
            <Box my={50} key={i}>
              <Box mb={0}>
                <FixturaPaper c={5} shadow={"none"} mb={0}>
                  <P fw={400} fz={"1.3em"} c='gray.8'>
                    {FixtureDetails.teamHome} vs {FixtureDetails.teamAway}
                  </P>
                  <P fw={600} c='gray.8'>
                    {FixtureDetails.Homescores} {FixtureDetails.HomeOvers} vs{" "}
                    {FixtureDetails.Awayscores} {FixtureDetails.AwayOvers}
                  </P>
                </FixturaPaper>
              </Box>
              <FixturaGRIDOUTER>
                <FixturaGRIDCOL span={5}>
                  {FixtureGraphic.map((Graphic, i) => {
                    return (
                      <SingleImageWithDownload URL={Graphic.attributes.URL} key={i}/>
                    );
                  })}
                </FixturaGRIDCOL>
                <FixturaGRIDCOL span={7}>
                  <FixturaPaper key={i}>
                    <ScrollArea h={450}>
                      <SelectedWriteup
                        writeup={Article?.attributes?.EditorsArticle}
                      />
                    </ScrollArea>
                  </FixturaPaper>
                  <Box mb={10}>
                    <ArticleActionButtonsContainer
                      Article={Article?.attributes?.EditorsArticle}
                    />
                  </Box>
                </FixturaGRIDCOL>
              </FixturaGRIDOUTER>
            </Box>
          );
        });
      })}
    </FixturaComponent>
  );
}

const filterImages = (DATA, ID) => {
  return DATA.filter((download) => {
    const GameID = download.attributes.game_meta_data.data[0]?.id;

    const AssetName = download.attributes.asset.data.attributes.Name;
    return ID === GameID && AssetName === "Game Spotlight";
  });
};

const filterWriteUps = (writeUps, name = "Name") => {
  return writeUps.filter((writeUp) => {
    const writeUpName = writeUp.attributes.asset.data.attributes.Name;
    const writeUpArticleFormats =
      writeUp.attributes.asset.data.attributes.ArticleFormats;

    return writeUpName === name && writeUpArticleFormats === "Breakdown";
  });
};
