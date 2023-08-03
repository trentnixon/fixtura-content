"use client";

import { DisplayArticleSet } from "@/components/Articles/client/DisplayArticle";
import {
  GameListParent,
  ListGamesWithArticles,
} from "@/components/Articles/client/ListGamesWithArticles";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { ICO_HEADER_ARTICLE } from "@/components/UI/Icons";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { Box, Container, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

const GroupByGame = (dataArray) => {
  console.log(dataArray);
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
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Container
      p={isMobile ? 0 : "lg"}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      })}
    >
      <Box
        p="lg"
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: isMobile ? "100%" : "70%",
          borderRadius: theme.radius.sm,
          backgroundColor: theme.colors.gray[8],
          marginBottom: 3,
        })}
      >
        <ICO_HEADER_ARTICLE />
        <H color={"white"} size={isMobile ? "h4" : "h1"}>
          Select a fixture.
        </H>
        <P c={"white"} ta="center">
          Select a fixture to access your detailed analysis.
        </P>
      </Box>
    </Container>
  );
};
