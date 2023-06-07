"use client";

import {
  Container,
  Grid,
  SimpleGrid,
  useMantineTheme,
  rem,
} from "@mantine/core";

import { DateFromTo, FindAccountLabel } from "@/utils/actions";
import Link from "next/link";
import ViewGamesTable from "@/components/Tables/ViewGamesTable";
import ViewDownloadablesTable from "@/components/Tables/ViewDownloadablesTable";
import ViewImageGrid from "@/components/Tables/ViewImageGrid";
import { FixturaPaper } from "@/components/containers/paper";
import { FixturaBox } from "@/components/containers/boxes";

export const AssetTypeGridLayout = ({
  account,
  scheduler,
  renderData,
  assets,
  params,
  WriteUpDATA,
  DownloadData,
}) => {
  const theme = useMantineTheme();

  return (
    <Container my="md" size={`xl`}>
      
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <FixturaBox>
          <h1>Match Writeups</h1>
          <FixturaPaper>
            <ViewGamesTable DATA={WriteUpDATA.Games} params={params} />
          </FixturaPaper>
        </FixturaBox>
        <Grid gutter="md">
          <Grid.Col>
            <FixturaPaper>
              <h1>Videos</h1>
              <ViewDownloadablesTable DATA={DownloadData[1]} />
            </FixturaPaper>
          </Grid.Col>
          <Grid.Col>
            <FixturaPaper>
              <h1>Images</h1>
              <ViewImageGrid DATA={DownloadData[2]} />
            </FixturaPaper>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};
