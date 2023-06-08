"use client";
import { H } from "@/components/Type/Headers";
import { P, S } from "@/components/Type/Paragraph";
import { BUTTON_FUNC } from "@/components/UI/buttons";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { getTeamNamesFromGameObj } from "@/utils/actions";
import { Grid, Group, Space } from "@mantine/core";

function filterByArticleFormat(inputObj) {
  let filteredArr = [];

  for (let key in inputObj) {
    let filteredArray = inputObj[key].filter(
      (item) =>
        item.attributes.asset.data.attributes.ArticleFormats === "abstract"
    );

    // Concatenate the filtered array to the final array
    filteredArr = filteredArr.concat(filteredArray);
  }

  return filteredArr;
}

export default async function VideoLayout({ DATA, params, WriteUpDATA }) {
  console.log("filterByArticleFormat(WriteUpDATA)");
  console.log(filterByArticleFormat(WriteUpDATA));

  if (!DATA) {
    // Handle the case where DATA is undefined
    return <div>No data available</div>;
  }
  return (
    <>
      <H size="h6" align="right">
        {DATA[0].attributes.asset.data.attributes.Name}
      </H>
      <FixturaBox>
        <Grid>
          <Grid.Col span={6}>
            <VideoPlayer url={DATA[0].attributes.URL} />
          </Grid.Col>
          <Grid.Col span={6}>
            <H size="h6">Title needed</H>
            <P>{DATA[0].attributes.asset.data.attributes.description}</P>
            <CTAGroup />
          </Grid.Col>
        </Grid>
      </FixturaBox>

      <WriteUP Games={filterByArticleFormat(WriteUpDATA)} />
    </>
  );
}

import React from "react";

const VideoPlayer = ({ url }) => {
  return (
    <div className="video-player">
      <video
        controls
        src={url}
        width="100%"
        className="video-player rounded-md"
      />
    </div>
  );
};

const CTAGroup = () => {
  return (
    <Group>
      <BUTTON_FUNC Label="Download" />
      <BUTTON_FUNC Label="Download" />
    </Group>
  );
};

const WriteUP = ({ Games }) => {
  return (
    <>
      <H size="h2" align="left">
        Article
      </H>

      <FixturaBox>
        {Games.map((article, i) => {
          console.log(article);
          return (
            <div key={i}>
              <H size="h5">
                {getTeamNamesFromGameObj(article?.attributes.game_meta_datum)}
              </H>

              <S>{article.attributes.game_meta_datum.data.attributes.date}</S>
              <S>{article.attributes.game_meta_datum.data.attributes.ground}</S>

              <P>{article.attributes.article}</P>
              <Space h={20} />
            </div>
          );
        })}
      </FixturaBox>
    </>
  );
};
