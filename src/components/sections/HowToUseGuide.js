"use client";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { FixturaSection } from "@/components/containers/Section";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { List, SimpleGrid, ThemeIcon } from "@mantine/core";
import {
  IconCalendar,
  IconCircleCheck,
  IconCircleDashed,
} from "@tabler/icons-react";

export const HowToUseGuide = () => {
  return (
    <FixturaSection
      shade={1}
      Title={"Mastering Fixtura: A Comprehensive Guide"}
    >
      <SimpleGrid
        cols={2}
        mb={20}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <FixturaBox>
          <P>
            Understanding how to effectively utilize Fixtura&rsquo;s features
            and functionalities can greatly enhance your experience. This
            section serves as a user manual, providing explanations, directions,
            and tips on navigating through the application.
          </P>
        </FixturaBox>
        <div>
          <H size="h6" my={5}>
            In Fixtura, you&rsquo;ll encounter various icons signifying
            different actions, categories, and statuses.
          </H>
          <H size="h6" my={5}>
            These include, but are not limited to:
          </H>

          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCircleCheck size="1rem" />
              </ThemeIcon>
            }
          >
            <List.Item
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <IconCalendar size="1rem" />
                </ThemeIcon>
              }
            >
              <FixturaPaper>
                <P>
                  Render Icon: This indicates your weekly renders, allowing you
                  to monitor and access the progress and results of your render
                  requests.
                </P>
              </FixturaPaper>
            </List.Item>

            <List.Item>
              Upcoming Games Icon: This allows you to preview all assets and
              asset information related to the upcoming games.
            </List.Item>

            <List.Item>
              Results Icon: Here, you can view all assets and asset information
              concerning the results of previous games.
            </List.Item>

            <List.Item>
              Statistics Icon: This icon leads you to a comprehensive collection
              of assets and asset information pertaining to statistical assets.
            </List.Item>
          </List>
        </div>
      </SimpleGrid>
      <P>
        Your scheduled render day is highlighted in the application, providing
        visibility on when to expect the next render. This is typically set for
        Mondays, but can vary based on your specific scheduling preferences.
        Fixtura also keeps track of the number of renders you've completed,
        which can be found in the 'Account' section. This is an excellent way to
        monitor your utilization of the application and to keep track of your
        asset generation history. To use Fixtura to its fullest potential,
        remember to consistently check these different sections, monitor your
        render schedule, and don't hesitate to explore and experiment with the
        app's various features." Remember, the more you use Fixtura, the more
        familiar and intuitive these functionalities will become. Happy
        exploring!
      </P>
    </FixturaSection>
  );
};
