"use client";

import { DisplayArticleSet } from "@/components/Articles/client/DisplayArticle";
import { ListGamesWithArticles } from "@/components/Articles/client/ListGamesWithArticles";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { ICO_HEADER_ARTICLE } from "@/components/UI/Icons";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { Box, Container, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

const GroupByGame = (dataArray, ageGroupKey, accountType) => {
  const JUNIOR_AGE_GROUPS = [
    "U7",
    "U8",
    "U9",
    "U10",
    "U11",
    "U12",
    "U13",
    "U14",
    "U15",
    "U16",
    "U17",
    "U18",
    "U19",
    "U20",
    "U21",
    "U22",
    "U23",
    "Y4",
    "Y5",
    "Y6",
    "Y7",
    "Y8",
    "Y9",
    "Y10",
    "Y11",
    "Y12",
    "Colts Y9 & 10",
  ]; // Add all junior age groups here
  const SENIOR_AGE_GROUPS = ["Senior", "Senior/Open"]; // Add all senior age groups here
  const MASTERS_AGE_GROUPS = ["Over 35", "Over 40", "Over 50", "Over 60"]; // Add all senior age groups here

  const isAgeGroupInList = (ageGroup, ageGroupList) => {
    return ageGroupList.includes(ageGroup);
  };

  const isMatchingAgeGroup = (obj) => {
    // logic for Clubs
    const ageGroup = obj.game_meta_datum.grade.ageGroup;
    if (accountType === "Club") {
      if (
        ageGroupKey === "Junior" &&
        isAgeGroupInList(ageGroup, JUNIOR_AGE_GROUPS)
      ) {
        return true;
      } else if (
        ageGroupKey === "Senior" &&
        isAgeGroupInList(ageGroup, SENIOR_AGE_GROUPS)
      ) {
        return true;
      } else if (
        ageGroupKey === "Masters" &&
        isAgeGroupInList(ageGroup, MASTERS_AGE_GROUPS)
      ) {
        return true;
      }
    } else if (accountType === "Association") {
      // logic for Associations remains the same
      const competitionName =
        obj.game_meta_datum.grade.competition.competitionName;
      return competitionName === ageGroupKey;
    }
    return false;
  };
  /* const isMatchingAgeGroup = (obj) => { 
    // logic for Clubs
    const ageGroup = obj.game_meta_datum.grade.ageGroup;
    if (accountType === 'Club') {
      if (ageGroupKey === "Junior" && ageGroup && ageGroup.startsWith("U")) {
        return true;
      } else if (
        ageGroupKey === "Senior" &&
        (ageGroup === "Senior" || (ageGroup && ageGroup.startsWith("Over")))
      ) {
        return true; 
      }
    } else if (accountType === 'Association') {
      // logic for Associations
      const competitionName = obj.game_meta_datum.grade.competition.competitionName;
      return competitionName === ageGroupKey;
    }
    return false;
  }; */

  const groupedData = dataArray.reduce((acc, obj) => {
    const gameID = obj.game_meta_datum.gameID;
    if (!acc[gameID]) {
      acc[gameID] = [];
    }
    if (isMatchingAgeGroup(obj)) {
      acc[gameID].push(obj);
    }
    return acc;
  }, {});

  return groupedData;
};

export default function SectionMatchWriteupsClient(props) {
  const { renderData, hasSponsors, GroupBy, FindAccountType } = props;
  const [selected, setSelected] = useState(null);
  const groupedData = GroupByGame(
    renderData?.filteredData,
    GroupBy,
    FindAccountType
  );
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
          <DisplayArticleSet
            SelectedGame={groupedData[selected]}
            hasSponsors={hasSponsors}
          />
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
          background: theme.fn.linearGradient(
            45,
            theme.colors.blue[5],
            theme.colors.cyan[5]
          ),
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
