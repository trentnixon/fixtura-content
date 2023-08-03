"use client";
import { H } from "@/components/Type/Headers";
import {
  ICO_HEADER_CRICKET,
  ICO_HEADER_LADDER,
  ICO_HEADER_VIDEO,
  ICO_HEADER_IMAGE,
  ICO_HEADER_ARTICLE,
} from "@/components/UI/Icons";
import { Box, Container, Group, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const iconComponents = {
  ICO_HEADER_CRICKET: ICO_HEADER_CRICKET,
  ICO_HEADER_LADDER: ICO_HEADER_LADDER,
  ICO_HEADER_VIDEO: ICO_HEADER_VIDEO,
  ICO_HEADER_IMAGE: ICO_HEADER_IMAGE,
  ICO_HEADER_ARTICLE: ICO_HEADER_ARTICLE,
  // add as many as you have
};
export const FixturaSection = (props) => {
  const {
    shade = 2,
    Title = "",
    subTitle = "",
    Icon = null,
    py = 10,
    px = 0,
  } = props;
  const IconComponent = iconComponents[Icon];
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Stack
      justify="flex-start"
      spacing="xs"
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[shade],
      })}
    >
      {Title.length === 0 ? (
        false
      ) : (
        <Container
          size={`xl`}
          mt={isMobile ? 50 : 60}
          mb={20}
          mx={isMobile ? 0 : "auto"}
        >
          <ShowTitles Title={Title} subTitle={subTitle} Icon={IconComponent} />
        </Container>
      )}

      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[shade],

          borderRadius: theme.radius.sm,
          marginBottom: theme.spacing.xl,
        })}
        px={px}
        py={py}
      >
        <Container size={`xl`}>{props.children}</Container>
      </Box>
    </Stack>
  );
};

const ShowTitles = ({ Title, subTitle, Icon }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Stack justify="center" spacing={0}>
      <Group>
        <div>{Icon && <Icon />}</div>
        <Stack justify="flex-start" spacing={0}>
          <H size={isMobile ? "h2" : "h1"} align={isMobile ? "left" : "center"}>
            {Title}
          </H>
        </Stack>
      </Group>
      <H
        size={isMobile ? "h6" : "h5"}
        align="left"
        color={`gray.7`}
        weight={200}
      >
        {subTitle}
      </H>
    </Stack>
  );
};
