"use client";
import { H } from "@/components/Type/Headers";
import {
  ICO_HEADER_CRICKET,
  ICO_HEADER_LADDER,
  ICO_HEADER_VIDEO,
  ICO_HEADER_IMAGE,
  ICO_HEADER_ARTICLE
} from "@/components/UI/Icons";
import { Box, Container, Group, Stack } from "@mantine/core";

const iconComponents = {
  ICO_HEADER_CRICKET: ICO_HEADER_CRICKET,
  ICO_HEADER_LADDER: ICO_HEADER_LADDER,
  ICO_HEADER_VIDEO: ICO_HEADER_VIDEO,
  ICO_HEADER_IMAGE: ICO_HEADER_IMAGE,
  ICO_HEADER_ARTICLE:ICO_HEADER_ARTICLE
  // add as many as you have
};
export const FixturaSection = (props) => {
  const { shade = 2, Title = "", subTitle = "", Icon = null, py=50,px=0 } = props;
  const IconComponent = iconComponents[Icon];
  return (
    <Stack justify="flex-start" spacing="xs">
      {Title.length === 0 ? (
        false
      ) : (
        <Container size={`xl`} mt={80}>
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
  return (
    <Group>
      <div>{Icon && <Icon />}</div>
      <Stack justify="flex-start" spacing={0}>
        <H size="h1" align="center">
          {Title}
        </H>
        <H size="h5" align="center" color={`gray.5`} weight={200}>
          {subTitle}
        </H>
      </Stack>
    </Group>
  );
};
