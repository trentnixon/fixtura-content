"use client";
import { P, S, XS } from "@/components/Type/Paragraph";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { List, ScrollArea, useMantineTheme } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import React from "react";

export const TrackingTeams = ({ clubs }) => {
  const theme = useMantineTheme();
  return (
    <ScrollArea h={900} w={"100%"}>
      <FixturaBox c="0">
        <List
          spacing="xs"
          size="sm"
          center
          icon={<IconUsersGroup color={theme.colors.orange[5]} />}
        >
          {clubs.data.map((Club, clubIndex) => {
            return (
              <React.Fragment key={"club-" + clubIndex}>
                {Club.attributes.teams.data.map((teams, teamIndex) => {
                  return (
                    <List.Item
                      key={"team-" + clubIndex + "-" + teamIndex}
                      my={14}
                    >
                      <FixturaGroup>
                        <div>
                          <P fw="600">{teams.attributes.teamName}</P>
                          <XS>
                            {
                              teams.attributes.competition.data.attributes
                                .competitionName
                            }
                          </XS>
                          <XS>
                            {
                              teams.attributes.grades.data[0].attributes
                                .gradeName
                            }
                          </XS>
                        </div>
                      </FixturaGroup>
                    </List.Item>
                  );
                })}
              </React.Fragment>
            );
          })}
        </List>
      </FixturaBox>
    </ScrollArea>
  );
};
