"use client";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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

// ResponsiveIcon component
const ResponsiveIcon = ({ IconComponent, theme, isMobile }) => {
  return (
    <IconComponent
      size={isMobile ? "2.5rem" : "3rem"}
      color={theme.colors.orange[3]}
      stroke={0.5}
    />
  );
};

// Icon components
export const ICO_HEADER_CRICKET = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <ResponsiveIcon IconComponent={IconCricket} theme={theme} isMobile={isMobile} />;
};

export const ICO_HEADER_LADDER = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <ResponsiveIcon IconComponent={IconLadder} theme={theme} isMobile={isMobile} />;
};

export const ICO_HEADER_VIDEO = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <ResponsiveIcon IconComponent={IconVideo} theme={theme} isMobile={isMobile} />;
};

export const ICO_HEADER_IMAGE = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <ResponsiveIcon IconComponent={IconPhotoAi} theme={theme} isMobile={isMobile} />;
};

export const ICO_HEADER_ARTICLE = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <ResponsiveIcon IconComponent={IconArticle} theme={theme} isMobile={isMobile} />;
};