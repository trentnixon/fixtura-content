"use client";
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  rem,
  Box,
  Table,
  Button,
} from "@mantine/core";

import { DateFromTo, FindAccountLabel } from "@/utils/actions";
import Link from "next/link";
import { H } from "@/components/Type/Headers";
import { P, S, XS } from "@/components/Type/Paragraph";

const PRIMARY_COL_HEIGHT = rem(300);

export const RenderBaseLayout = ({
  account,
  scheduler,
  renderData,
  assets,
  params,
}) => {
  const theme = useMantineTheme();

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    <Container my="md" size={`xl`}>
      <H size="h1">{FindAccountLabel(account)}</H>
      <P>
        Render page. About this render and select a asset category. Upcoming,
        Results, Overviews/round ups
      </P>

      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Box>
          <H size="h3">Something</H>
        </Box>
        <Grid gutter="md">
          <Grid.Col>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};
