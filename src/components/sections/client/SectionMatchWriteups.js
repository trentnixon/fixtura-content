"use client";

import { DisplayArticleSet } from "@/components/Articles/client/DisplayArticle";
import { ListGamesWithArticles } from "@/components/Articles/client/ListGamesWithArticles";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { ICO_HEADER_ARTICLE } from "@/components/UI/Icons";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { Box, Container, useMantineTheme } from "@mantine/core";
import { useState } from "react";

const GroupByGame = (dataArray) => {
  console.log(dataArray)
  const groupedData = dataArray.reduce((acc, obj) => {
    const gameID = obj.game_meta_datum.gameID;

    if (!acc[gameID]) {
      acc[gameID] = [];
    }

    acc[gameID].push(obj);

    return acc;
  }, {});

  return groupedData;
};
export default async function SectionMatchWriteupsClient({ renderData }) {
  const [selected, setSelected] = useState(null);
  const groupedData = GroupByGame(renderData?.filteredData);

 
  return (
    <FixturaGRIDOUTER> 
      <FixturaGRIDCOL span={3}> 
        <ListGamesWithArticles
          groupedData={groupedData}
          setSelected={setSelected}
        />
      </FixturaGRIDCOL>
      <FixturaGRIDCOL span={9}>
        {selected === null ? (
          <SelectAArticle />
        ) : (
          <DisplayArticleSet SelectedGame={groupedData[selected]} />
        )} 
      </FixturaGRIDCOL> 
    </FixturaGRIDOUTER> 
  );
}

const SelectAArticle = () => {
  const theme = useMantineTheme();
  return (
    <Container
    sx={(theme) => ({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: '100%'
    
    })}>
    <Box
      p="lg"
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width:'70%',
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colors.gray[1],
        marginBottom: 3,
        "&:hover": {
          backgroundColor: theme.colors.gray[3],
        },
      })}
    >
      <ICO_HEADER_ARTICLE />
      <H>Select a Game review</H>
      <P ta='center'>
        Click on any game or fixture below to access detailed match reports,
        upcoming fixture previews, and results analysis. Our articles cover a
        range of formats, from long-form insights to concise tweets. Gain
        valuable game insights and stay up-to-date with the latest developments
        in cricket. Choose a game to read more.
      </P>
    </Box>
    </Container>
  );
};
