"use client";
import { P } from "@/components/Type/Paragraph";
import { FixturaBox } from "@/components/containers/boxes";
// Components
import { FixturaPaper } from "@/components/containers/paper";
import { SectionHeaderWithSubHeader } from "@/layouts/Headings/SectionHeaderWithSubHeader";
import { Center, Group, RingProgress, SimpleGrid, Text } from "@mantine/core";
import {
  IconCalendarDue,
  IconChartPie,
  IconScoreboard,
} from "@tabler/icons-react";

function createDataArray(Count) {
  const TOTAL = Count.downloads + Count.gtp_3_reports;
  const AC = Count.finalStructure;

  return [
    {
      label: "Results",
      stats: AC.results,
      progress: (AC.results / TOTAL) * 100,
      color: "orange",
      icon: IconScoreboard,
    },
    {
      label: "Upcoming",
      stats: AC.upcoming,
      progress: (AC.upcoming / TOTAL) * 100,
      color: "orange",
      icon: IconCalendarDue,
    },
    {
      label: "Statistics",
      stats: AC.statistics,
      progress: (AC.statistics / TOTAL) * 100,
      color: "orange",
      icon: IconChartPie,
    },
  ];
}

function RingComponent({ stat }) {
  const Icon = stat.icon;

  return (
    <FixturaPaper key={stat.label}>
      <Group position="center">
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: stat.progress, color: stat.color }]}
          label={
            <Center>
              <Icon size="1.4rem" stroke={1.5} />
            </Center>
          }
        />

        <div>
          <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
            {stat.label}
          </Text>
          <Text weight={700} size="lg">
            {stat.stats} Assets
          </Text>
        </div>
      </Group>
    </FixturaPaper>
  );
}

export async function SelectedRenderStatsRingsClient(props) {
  const { Count } = props;
  const DATA = createDataArray(Count);

  console.log(DATA);
  return (
    <>
      <SectionHeaderWithSubHeader
        Main="Asset Created for each Category"
        Sub={``}
      />
      <FixturaBox c={2}>
        <P fz={"sm"}>
          The chart provides a visual representation of the distribution of
          assets across different categories: RESULTS, UPCOMING, and STATISTICS.
          It allows users to quickly understand the relative proportions of
          assets in each category.
        </P>
        <SimpleGrid
          cols={3}
          mt={20}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          {DATA.map((stat) => {
            if (stat.stats !== undefined)
              return <RingComponent key={stat.label} stat={stat} />;
          })}
        </SimpleGrid>
      </FixturaBox>
    </>
  );
}
