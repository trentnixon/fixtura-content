"use client";
import { H } from "@/components/Type/Headers";
import { N, P, S } from "@/components/Type/Paragraph";
import { BUTTON_FUNC } from "@/components/UI/buttons";
import { HTML5VideoPlayer } from "@/components/Video/client/HTML5VideoPlayer";
import { FixturaBox } from "@/components/containers/boxes";
import { getTeamNamesFromGameObj } from "@/utils/actions";
import { Grid, Group, Space } from "@mantine/core";
import { IconCricket } from "@tabler/icons-react";

function filterByArticleFormat(inputObj, RenderDate) {
  let filteredArr = [];

  for (let gameId in inputObj) {
    for (let assetType in inputObj[gameId]) {
      let filteredArray = inputObj[gameId][assetType].filter((item) => {
        // Check the ArticleFormat
        const isTwitter =
          item.attributes.asset.data.attributes.ArticleFormats === "Twitter";

        // Check if the assetType is 'upcoming'
        if (assetType === "upcoming") {
          // Parse the game date and the createdAt date into JavaScript Date objects
          const gameDate = new Date(
            item.attributes.game_meta_datum.data.attributes.date
          );
          const createdAt = new Date(RenderDate);
          // If the game date is after the createdAt date, keep this item
          return isTwitter && gameDate > createdAt;
        } else {
          // If the assetType is not 'upcoming', keep this item only based on the ArticleFormat
          return isTwitter;
        }
      });

      // Concatenate the filtered array to the final array
      filteredArr = filteredArr.concat(filteredArray);
    }
  }

  return filteredArr;
}

export default async function VideoLayout({
  DATA,
  WriteUpDATA,
  RenderDate,
  assetType,
  PATH,
}) { 
  if (!DATA) {
    // Handle the case where DATA is undefined
    return <div>No data available</div>;
  }
  return (
    <>
      <H size="h6" align="right">
        {DATA[assetType.toLowerCase()][0].attributes.asset.data.attributes.Name}
      </H>

      <Grid>
        <Grid.Col span={6} md={6} lg={4}>
          <FixturaBox>
            <HTML5VideoPlayer
              url={DATA[assetType.toLowerCase()][0].attributes.URL}
            />
          </FixturaBox>
        </Grid.Col>
        <Grid.Col span={6} md={6} lg={8}>
          <N>NOTE</N>
          <H size="h6">Title needed</H>

          <P>
            {
              DATA[assetType.toLowerCase()][0].attributes.asset.data.attributes
                .description
            }
          </P>
          <CTAGroup />
        </Grid.Col>
      </Grid>
      <Space h={50} />
      <WriteUP Games={filterByArticleFormat(WriteUpDATA, RenderDate)} />
    </>
  );
}

import React from "react";

const CTAGroup = () => {
  return (
    <Group>
      <BUTTON_FUNC Label="Download" />
      <BUTTON_FUNC Label="Download" />
    </Group>
  );
};

const WriteUP = ({ Games }) => {
  function extractSummary(text) {
    const summaryIndex = text.indexOf("Tweet:");
    if (summaryIndex !== -1) {
      // 'Summary:' length is 8, so we add 8 to index to get the start of the actual summary
      return text.slice(summaryIndex + 6).trim();
    } else {
      return text;
    }
  }
  return (
    <>
      <H size="h4" align="left">
        Supporting Articles
      </H>
      <N>ADD OPTION TO CHANGE WRITE TYPE</N>

      <FixturaBox>
        {Games.map((article, i) => {
          return (
            <div key={i}>
              <H size="h5">
                <IconCricket />{" "}
                {getTeamNamesFromGameObj(article?.attributes.game_meta_datum)}
              </H>

              <S>{article.attributes.game_meta_datum.data.attributes.date}</S>
              <S>{article.attributes.game_meta_datum.data.attributes.ground}</S>

              <P> {extractSummary(article.attributes.article)}</P>
              <Space h={20} />
            </div>
          );
        })}
      </FixturaBox>
    </>
  );
};
