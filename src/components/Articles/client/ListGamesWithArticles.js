import React, { useState } from "react";
import { ScrollArea, TextInput, Box, useMantineTheme } from "@mantine/core";
import { IconCricket, IconShield, IconShieldFilled } from "@tabler/icons-react";
import { P, S } from "@/components/Type/Paragraph";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { FixturaArticleBox } from "@/components/containers/boxes";
import { H } from "@/components/Type/Headers";
import { FixturaGroup } from "@/components/containers/Group";

export const ListGamesWithArticles = ({ groupedData, setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGameID, setSelectedGameID] = useState(null);
  const theme = useMantineTheme();
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Group games by grade
  const gamesByGrade = {};
  Object.keys(groupedData).forEach((gameID) => {
    const grade = groupedData[gameID][0].game_meta_datum.grade.gradeName;
    if (!gamesByGrade[grade]) gamesByGrade[grade] = [];
    gamesByGrade[grade].push(gameID);
  });

  // Filter games by search term
  Object.keys(gamesByGrade).forEach((grade) => {
    gamesByGrade[grade] = gamesByGrade[grade].filter((gameID) => {
      const game = groupedData[gameID][0];
      const teamHome = game.game_meta_datum.teamHome;
      const teamAway = game.game_meta_datum.teamAway;
      return (
        teamHome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teamAway.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  });

  return (
    <>
      <FixturaArticleBox>
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
                <H size="h6" italic={true} color={'gray.6'}>{grade}</H>
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
                const label = `${teamHome} vs ${teamAway}`;

                return (
                  <Box
                    p="sm"
                    key={gameID}
                    onClick={() => {
                      setSelected(gameID);
                      setSelectedGameID(gameID);
                    }}
                    sx={(theme) => ({
                      borderRadius: theme.radius.sm,
                      background:
                        gameID === selectedGameID
                          ? theme.fn.linearGradient(45, theme.colors.blue[5], theme.colors.cyan[5])
                          : theme.colors.gray[0], 
                      marginBottom: 3,
                      cursor: "pointer",
                      "&:hover": {
                        background: theme.fn.linearGradient(45, theme.colors.dark[8], theme.colors.dark[5])
                      },
                    })}
                  >
                    <FixturaGRIDOUTER>
                      <FixturaGRIDCOL span={1}>
                        <IconCricket
                          size="1.3rem"
                          stroke={1.1}
                          color={
                            gameID === selectedGameID
                              ? theme.colors.orange[2]
                              : theme.colors.orange[6]
                          }
                        />
                      </FixturaGRIDCOL>
                      <FixturaGRIDCOL span={11}>
                        <P
                          lh="1.2em"
                          fz={"sm"}
                          c={
                            gameID === selectedGameID
                              ? "white"
                              : theme.colors.gray[6]
                          }
                        >
                          {label}
                        </P>
                      </FixturaGRIDCOL>
                    </FixturaGRIDOUTER>
                  </Box>
                );
              })}
            </React.Fragment>
          ))}
      </ScrollArea>
    </>
  );
};
