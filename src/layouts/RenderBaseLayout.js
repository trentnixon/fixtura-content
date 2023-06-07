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
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {FindAccountLabel(account)}
      </h1>
      <h2>
        ID : {params.id}, render {params.render}
      </h2>
      Render page. About this render and select a asset category. Upcoming,
      Results, Overviews/round ups
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Box>
          <h1>Something</h1>
        </Box>
        <Grid gutter="md">
          <Grid.Col>
            some stats 1
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            some stats 2
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            some stats 3
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
