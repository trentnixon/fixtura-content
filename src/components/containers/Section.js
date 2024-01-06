"use client";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import {
  ICO_HEADER_CRICKET,
  ICO_HEADER_LADDER,
  ICO_HEADER_VIDEO,
  ICO_HEADER_IMAGE,
  ICO_HEADER_ARTICLE,
  ICO_HEADER_ACCOUNT,
  ICO_Edit,
  ICO_Speakerphone,
  ICO_RES_CALENDAR,
  ICO_TEMPLATE
} from "@/components/UI/Icons";
import { Box, Container, Group, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const iconComponents = {
  ICO_HEADER_CRICKET: ICO_HEADER_CRICKET,
  ICO_HEADER_LADDER: ICO_HEADER_LADDER,
  ICO_HEADER_VIDEO: ICO_HEADER_VIDEO,
  ICO_HEADER_IMAGE: ICO_HEADER_IMAGE,
  ICO_HEADER_ARTICLE: ICO_HEADER_ARTICLE,
  ICO_HEADER_ACCOUNT: ICO_HEADER_ACCOUNT,
  ICO_Edit:ICO_Edit,
  ICO_Speakerphone:ICO_Speakerphone,
  ICO_RES_CALENDAR:ICO_RES_CALENDAR, 
  ICO_TEMPLATE:ICO_TEMPLATE
  // add as many as you have
};
export const FixturaSection = (props) => {
  const {
    Blurb = "",
    shade = 2,
    Title = "",
    subTitle = "",
    Icon = null,
    py = 10,
    px = 0,
    my=0,
    mx=0
  } = props;
  const IconComponent = iconComponents[Icon];
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Stack
      px={0}
      justify="flex-start"
      spacing="xs"
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[shade],
      })}
    >
      {Title.length === 0 ? (
        false
      ) : (
        <Container size={`xl`} px={0} mt={isMobile ? 10 : 40} mb={0} my={my} mx={mx}>
          <ShowTitles
            Title={Title}
            subTitle={subTitle}
            Icon={IconComponent}
            Blurb={Blurb}
          />
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
        <Container size={`xl`} px={0}>
          {props.children}
        </Container>
      </Box>
    </Stack>
  );
};

const ShowTitles = ({ Title, subTitle, Icon, Blurb }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Stack justify="flex-start" spacing={0}>
      <Group position="apart">
        <Stack align="flex-start" justify="flex-start" spacing={0}>
          <H size={isMobile ? "h2" : "h1"} align={"left"}>
            {Title}
          </H>
        </Stack>
        <div>{Icon && <Icon />}</div>
      </Group>
      <H
        size={isMobile ? "h6" : "h5"}
        align="left"
        color={`gray.7`}
        weight={600}
        my={7}
      >
        {subTitle}
      </H>
      <P c={`gray.7`}>{Blurb}</P>
    </Stack>
  );
};
