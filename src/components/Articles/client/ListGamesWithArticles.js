"use client";

import { useState } from "react";
import { ScrollArea, TextInput, Box, useMantineTheme } from "@mantine/core";
import { IconCricket } from "@tabler/icons-react";
import { P, S } from "@/components/Type/Paragraph";
/* import { FixturaGroup } from "@/components/containers/Group";
import { FixturaStack } from "@/components/containers/stack"; */
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { FixturaArticleBox } from "@/components/containers/boxes";

export const ListGamesWithArticles = ({ groupedData, setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGameID, setSelectedGameID] = useState(null);
  const theme = useMantineTheme();
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = Object.keys(groupedData).filter((gameID) => {
    const firstGame = groupedData[gameID][0];
    const teamHome = firstGame.game_meta_datum.teamHome;
    const teamAway = firstGame.game_meta_datum.teamAway;
    return (
      teamHome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teamAway.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <FixturaArticleBox>
        <S ta="right" fw="700" c="dimmed" >
          Games: {filteredData.length}
        </S>
        <TextInput
          placeholder="Search games..."
          value={searchTerm}
          onChange={handleChange}
        />
      </FixturaArticleBox>
      <ScrollArea h={500} offsetScrollbars>
        {filteredData.map((gameID) => {
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
                backgroundColor:
                  gameID === selectedGameID
                    ? theme.colors.gray[7]
                    : theme.colors.gray[0],
                marginBottom: 3,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.colors.gray[3],
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
                    fz={'sm'}
                    c={
                      gameID === selectedGameID ? "white" : theme.colors.gray[6]
                    }
                  >
                    {" "}
                    {label}
                  </P>
                </FixturaGRIDCOL>
              </FixturaGRIDOUTER>
            </Box>
          );
        })}
      </ScrollArea>
    </>
  );
};
