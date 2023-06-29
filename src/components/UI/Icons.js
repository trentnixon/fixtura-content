"use client";
import { useMantineTheme } from "@mantine/core";
import {
  IconInfoCircle,
  IconCalendar,
  IconDownload,
  IconCalendarDue,
  IconScoreboard,
  IconChartPie4,
  IconBook,
  IconGoGame,
  IconVideo,
  IconPhotoAi,
  IconCricket,
  IconLadder,
  IconArticle
} from "@tabler/icons-react";

export const ICO_INFO = () => {
  const theme = useMantineTheme();
  return <IconInfoCircle color={theme.colors.orange[5]} />;
};

export const ICO_CALENDAR = () => {
  const theme = useMantineTheme();
  return <IconCalendar color={theme.colors.orange[7]} />;
};



export const ICO_DOWNLOAD = () => {
  const theme = useMantineTheme();
  return <IconDownload color={theme.colors.orange[7]} />;
};



// NavItemsIcons
export const ICO_CALENDARDUE = () => {
  const theme = useMantineTheme();
  return <IconCalendarDue size="2rem" color={theme.colors.orange[5]} />;
};

export const ICO_SCOREBOARD = () => {
  const theme = useMantineTheme();
  return <IconScoreboard size="2rem" color={theme.colors.orange[5]}  />;
};
export const ICO_PIE = () => {
  const theme = useMantineTheme();
  return <IconChartPie4 size="2rem" color={theme.colors.orange[5]}  />;
};

export const ICO_BOOK = () => {
  const theme = useMantineTheme();
  return <IconBook size="2rem" color={theme.colors.orange[5]}  />;
};
export const ICO_GAME = () => {
  const theme = useMantineTheme();
  return <IconGoGame size="2rem" color={theme.colors.orange[5]}  />;
};

export const ICO_VIDEO = () => {
  const theme = useMantineTheme();
  return <IconVideo size="2rem" color={theme.colors.orange[5]}  />;
};
export const ICO_PHOTO = () => {
  const theme = useMantineTheme();
  return <IconPhotoAi size="2rem" color={theme.colors.orange[5]}  />;
};

// Heading ICONS
export const ICO_HEADER_CRICKET= () => {
  const theme = useMantineTheme();
  return <IconCricket size="5rem" color={theme.colors.orange[3]} stroke={0.5}  />;
};
export const ICO_HEADER_LADDER= () => {
  const theme = useMantineTheme();
  return <IconLadder size="5rem" color={theme.colors.orange[3]} stroke={0.5}  />;
};

export const ICO_HEADER_VIDEO= () => {
  const theme = useMantineTheme();
  return <IconVideo size="5rem" color={theme.colors.orange[3]} stroke={0.5}  />;
};

export const ICO_HEADER_IMAGE= () => {
  const theme = useMantineTheme();
  return <IconPhotoAi size="5rem" color={theme.colors.orange[3]} stroke={0.5}  />;
};

export const ICO_HEADER_ARTICLE= () => {
  const theme = useMantineTheme();
  return <IconArticle size="5rem" color={theme.colors.orange[3]} stroke={0.5}  />;
};