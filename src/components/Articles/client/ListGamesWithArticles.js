import React, { useState } from "react";
import {
  ScrollArea,
  TextInput,
  Box,
  useMantineTheme,
  Select,
} from "@mantine/core";
import {  IconShield } from "@tabler/icons-react";
import { P, S } from "@/components/Type/Paragraph";
import { FixturaArticleBox } from "@/components/containers/boxes";
import { H } from "@/components/Type/Headers";
import { FixturaGroup } from "@/components/containers/Group";
import { limitString } from "@/utils/UI";
import { useMediaQuery } from "@mantine/hooks";

export const ListGamesWithArticles = ({ groupedData, setSelected }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [searchTerm, setSearchTerm] = useState("");

  //console.log("groupedData", groupedData)
  // Check if groupedData is not empty
  if (!groupedData || Object.keys(groupedData).length === 0) {
    return <p>No data found</p>;
  }

  // Group games by grade
  const gamesByGrade = {};
  Object.keys(groupedData).forEach((gameID) => {
    const grade = groupedData[gameID][0]?.game_meta_datum?.grade?.gradeName;
    if (!grade) return; // Skip if grade is not found
    if (!gamesByGrade[grade]) gamesByGrade[grade] = [];
    gamesByGrade[grade].push(gameID);
  });

  // Filter games by search term
  Object.keys(gamesByGrade).forEach((grade) => {
    gamesByGrade[grade] = gamesByGrade[grade].filter((gameID) => {
      const game = groupedData[gameID][0];
      const teamHome = game?.game_meta_datum?.teamHome;
      const teamAway = game?.game_meta_datum?.teamAway;
      return (
        (teamHome &&
          teamHome.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (teamAway && teamAway.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  });

  const componentProps = {
    gamesByGrade: gamesByGrade,
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    groupedData: groupedData,
    setSelected: setSelected,
  };

  return isMobile ? (
    <MobileListGamesWithArticles {...componentProps} />
  ) : (
    <DesktopListGamesWithArticles {...componentProps} />
  );
};

const DesktopListGamesWithArticles = ({
  gamesByGrade,
  setSearchTerm,
  searchTerm,
  groupedData,
  setSelected,
}) => {
  const [selectedGameID, setSelectedGameID] = useState(null);
  //const theme = useMantineTheme();
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const theme = useMantineTheme();

  return (
    <>
      <FixturaArticleBox my={'xs'} mx={0} p={'xs'}>
        <S ta="right" fw="700" c="dimmed">
          Games:{" "}
          {Object.values(gamesByGrade).reduce(
            (total, games) => total + games.length,
            0
          )}
        </S>
        <TextInput
          placeholder="Search games..."
          value={searchTerm}
          onChange={handleChange}
        />
      </FixturaArticleBox>
      <ScrollArea h={500} offsetScrollbars>
        {Object.keys(gamesByGrade)
          .sort()
          .map((grade) => (
            <React.Fragment key={grade}>
              <FixturaGroup my={10} position={"right"}>
                <H size="h6" italic={true} color={"gray.6"}>
                  {limitString(grade, 35)}
                </H>
                <IconShield
                  size="1.1rem"
                  stroke={1.1}
                  color={theme.colors.gray[6]}
                />
              </FixturaGroup>

              {gamesByGrade[grade].map((gameID) => {
                const firstGame = groupedData[gameID][0];
                const teamHome = firstGame.game_meta_datum.teamHome;
                const teamAway = firstGame.game_meta_datum.teamAway;
                const label = `${limitString(teamHome, 40)} vs ${limitString(
                  teamAway,
                  40
                )}`;

                return (
                  <Box
                    p="xs"
                    key={gameID}
                    onClick={() => {
                      setSelected(gameID);
                      setSelectedGameID(gameID);
                    }}
                    sx={(theme) => ({
                      borderRadius: theme.radius.sm,
                      background:
                        gameID === selectedGameID
                          ? theme.fn.linearGradient(
                              45,
                              theme.colors.blue[5],
                              theme.colors.cyan[5]
                            )
                          : theme.colors.gray[0],
                      marginBottom: 3,
                      cursor: "pointer",
                      "&:hover": {
                        background: theme.fn.linearGradient(
                          45,
                          theme.colors.dark[7],
                          theme.colors.dark[5]
                        ),
                      },
                    })}
                  >
                   <P
                          lh="1.2em"
                          fz={"xs"}
                          c={
                            gameID === selectedGameID
                              ? "white"
                              : theme.colors.gray[6]
                          }
                        >
                          {label}
                        </P>
                  </Box>
                );
              })}
            </React.Fragment>
          ))}
      </ScrollArea>
    </>
  );
};

export const MobileListGamesWithArticles = ({
  gamesByGrade,
  groupedData,
  setSelected,
}) => {
  const theme = useMantineTheme();

  const options = Object.keys(gamesByGrade)
    .sort()
    .reduce((acc, grade) => {
      const gradeGames = gamesByGrade[grade].map((gameID) => {
        const firstGame = groupedData[gameID][0];
        const teamHome = firstGame.game_meta_datum.teamHome;
        const teamAway = firstGame.game_meta_datum.teamAway;
        const label = `${limitString(teamHome, 20)} vs ${limitString(
          teamAway,
          20
        )}`;
        return { value: gameID, label };
      });
      return [...acc, ...gradeGames];
    }, []);

  return (
    <>
      <Select
        placeholder="Select a fixture!"
        data={options}
        onChange={(gameID) => setSelected(gameID)}
      />
    </>
  );
};
