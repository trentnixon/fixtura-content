"use client";
import { P } from "@/components/Type/Paragraph";
import { FixturaBox } from "@/components/containers/boxes";
import { List, ScrollArea, useMantineTheme } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";

export const TrackingCompetitions = ({ associations }) => {
  //console.log(associations);
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
          {associations.data.map((Association, i) => {
            
            return (
              <div key={i}>
                {Association.attributes.competitions.data.map((comp, i) => {
                  //console.log(comp);
                  return (
                    <List.Item key={i} my={25}>
                      <P>{comp.attributes.competitionName}</P>
                    </List.Item>
                  ); 
                })}
              </div>
            );
          })}
        </List>
      </FixturaBox>
    </ScrollArea>
  );
};
