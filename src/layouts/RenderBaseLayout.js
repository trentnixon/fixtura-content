"use client";
import { useRouter } from "next/navigation";
import {
  Container,
  SimpleGrid,
  useMantineTheme,
  rem,
  Box,
  Stack,
  createStyles,
  Text,
} from "@mantine/core";

import { RingProgress, Center, Group } from "@mantine/core";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconCalendar,
  IconCalendarDue,
  IconScoreboard,
  IconChartPie4,
} from "@tabler/icons-react";
import {
  DateFromTo,
  FindAccountLogo,
  FindAccountLabel,
  FilterResult,
  FilterUpcoming,
  FilterStatisticsDownload,
  FilterStatisticsWriteup,
} from "@/utils/actions";

import { H } from "@/components/Type/Headers";
import { N, P, S, XS } from "@/components/Type/Paragraph";
import { FixturaPageHeader } from "@/layouts/Headings/PageHeader";
import { FixturaPaper } from "@/components/containers/paper";
import { NavLinkWithIcon } from "@/components/UI/buttons";
import { IconBook } from "@tabler/icons-react";
import { BackButtonAsNavLink } from "@/components/Navigation/BackBtn";
import { FixturaSection } from "@/components/containers/Section";

export const RenderBaseLayout = ({
  account,
  scheduler,
  renderData,
  assets,
  download,
  gtp_3_reports,
  createdAt,
  renderID,
  accountID,
}) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const TotalAssets = gtp_3_reports.data.length + download.data.length;
  // Writeups
  //gtp_3_reports
  const filteredResultsWriteups = FilterResult(gtp_3_reports.data);
  const filteredUpComingWriteups = FilterUpcoming(gtp_3_reports.data);
  // Downloads
  const filteredResultsDownloads = FilterResult(download.data);
  const filteredUpComingDownloads = FilterUpcoming(download.data);
  // Statis

  const filteredStatisticsDownloads = FilterStatisticsDownload(download.data);
  const filteredStatisticsWriteup = FilterStatisticsWriteup(download.data);
  console.log(
    "filteredStatisticsDownloads",
    filteredStatisticsDownloads.length
  );

  return (
    <>
      <FixturaPageHeader
        Logo={FindAccountLogo(account)}
        heading={FindAccountLabel(account)}
        subheading={`Render`}
      />

      <Container my="md" size={`xl`}>
        <FixturaSection Title={"Date range"} shade="7">
          <P c={theme.colors.gray[0]} fw={700}>
            {DateFromTo(createdAt)[0]} - {DateFromTo(createdAt)[1]}
          </P>
        </FixturaSection>

        <FixturaSection Title={"Assets"} shade="0">
          <SimpleGrid
            cols={2}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <Box>
              <Stack>
                <H size="h5" align="right">
                  View a Categories
                </H>
                <FixturaPaper>
                  <NavLinkWithIcon
                    label="UPCOMING EVENTS"
                    description="A round up of the weeks events"
                    Icon={<IconCalendarDue size="2rem"  color={theme.colors.teal[9]}  />}
                    onClick={() => {
                      router.push(`/${accountID}/${renderID}/u`);
                    }}
                  />
                  <NavLinkWithIcon
                    label="RESULTS"
                    description="A round up of the weeks events"
                    Icon={<IconScoreboard size="2rem" color={theme.colors.teal[9]} />}
                    onClick={() => {
                      router.push(`/${accountID}/${renderID}/r`);
                    }}
                  />
                  <NavLinkWithIcon
                    label="STATISTICS"
                    description="A round up of the weeks events"
                    Icon={<IconChartPie4 size="2rem" color={theme.colors.teal[9]}  />}
                    onClick={() => {
                      router.push(`/${accountID}/${renderID}/o`);
                    }}
                  />
                  <BackButtonAsNavLink />
                </FixturaPaper>
              </Stack>
            </Box>
            <Stack>
              <H size="h5" align="right">
                Assets Generated
              </H>
              <StatsGroup
                Downloadables={download.data.length}
                gtp_3_reports={gtp_3_reports.data.length}
              />
              <StatsRing
                results={{
                  num:
                    filteredResultsWriteups.length +
                    filteredResultsDownloads.length,
                  perc:
                    ((filteredResultsWriteups.length +
                      filteredResultsDownloads.length) /
                      TotalAssets) *
                    100,
                }}
                upcoming={{
                  num:
                    filteredUpComingWriteups.length +
                    filteredUpComingDownloads.length,
                  perc:
                    ((filteredUpComingWriteups.length +
                      filteredUpComingDownloads.length) /
                      TotalAssets) *
                    100,
                }}
                statistics={{
                  num:
                    filteredStatisticsDownloads.length +
                    filteredStatisticsWriteup.length,
                  perc:
                    ((filteredStatisticsDownloads.length +
                      filteredStatisticsWriteup.length) /
                      TotalAssets) *
                    100,
                }}
              />
            </Stack>
          </SimpleGrid>
        </FixturaSection>
      </Container>
      <P>
        Render page. About this render and select a asset category. Upcoming,
        Results, Overviews/round ups
      </P>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: `linear-gradient(-60deg, ${theme.colors.teal[7]} 0%, ${theme.colors.teal[5]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    borderRadius: theme.radius.sm,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: rem(50),
    lineHeight: 1,
    fontWeight: 700,
    letterSpacing: "-3px",
    marginBottom: 0,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors.gray[1],
    fontSize: theme.fontSizes.sm,
    marginTop: rem(5),
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${rem(1)} solid ${theme.colors.gray[1]}`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colors.gray[1]}`,
      },
    },
  },
}));

export function StatsGroup({ Downloadables, gtp_3_reports }) {
  const data = [
    {
      title: "Downloadables",
      stats: Downloadables,
      description:
        "A Downloadable reffers to a Video or Image you can download and post on your website or social media account",
    },

    {
      title: "Articles Written",
      stats: gtp_3_reports,
      description:
        "Articles reffer to all potential write ups generated by Fixtura, this includes Long form publications and tweets",
    },
  ];
  const { classes } = useStyles();
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

export function StatsRing({ results, upcoming, statistics }) {
  console.log(results.num);
  const data = [
    {
      label: "Results",
      stats: results.num,
      progress: results.perc,
      color: "teal",
      icon: IconScoreboard,
    },
    {
      label: "Upcoming",
      stats: upcoming.num,
      progress: upcoming.perc,
      color: "teal",
      icon: IconCalendarDue,
    },
    {
      label: "Statistics",
      stats: statistics.num,
      progress: statistics.perc,
      color: "teal",
      icon: IconChartPie4,
    },
  ];

  const stats = data.map((stat) => {
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
            <Text weight={700} size="xl">
              {stat.stats}
            </Text>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
          </div>
        </Group>
      </FixturaPaper>
    );
  });

  return (
    <SimpleGrid cols={3} mt={20} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
}
