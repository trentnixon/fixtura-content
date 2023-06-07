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

export const AccountHomeGridLayout = ({ account, scheduler, params }) => {
  const theme = useMantineTheme();

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    <Container my="md" size={`xl`}>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {FindAccountLabel(account)}
      </h1>
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Box>
          <h1>Select a render date</h1>
          <RenderTable RENDERS={scheduler?.attributes?.renders?.data} params={params}/>
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

const RenderTable = ({ RENDERS,params }) => {
  console.log(RENDERS);

  return (
    <Table>
      <thead>
        <tr>
          <th>Render</th>
          <th>Date</th>
          <th>Select</th>
        </tr>
      </thead>

      <tbody>
        {RENDERS.map((render, i) => {
          return (
            <tr key={`option_${i}`} id={render.id} value={render.id}>
              <td>{render.attributes.Name}</td>
              <td>{DateFromTo(render.attributes.createdAt)}</td>
              <td>
                <Link passHref href={`/${params.id}/${render.id}`}>
                  <Button variant="outline">View</Button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
