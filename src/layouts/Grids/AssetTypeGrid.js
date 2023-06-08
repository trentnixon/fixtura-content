"use client";

import { Container, Grid, useMantineTheme } from "@mantine/core";

import ViewGamesTable from "@/components/Tables/ViewGamesTable";
import VideoLayout from "@/components/Video/ViewVideoLayout";
import ViewImageGrid from "@/components/Tables/ViewImageGrid";
import { FixturaPaper } from "@/components/containers/paper";
import { FixturaBox } from "@/components/containers/boxes";
import { S } from "@/components/Type/Paragraph";
import { H } from "@/components/Type/Headers";
import {
  IconBook,
  IconGoGame,
  IconPhotoAi,
  IconVideo,
} from "@tabler/icons-react";
import { NavLinkWithIcon } from "@/components/UI/buttons";
import { useState } from "react";

export const AssetTypeGridLayout = ({
  account,
  scheduler,
  renderData,
  assets,
  params,
  WriteUpDATA,
  DownloadData,
}) => {
  const [Category, SetCategory] = useState("select");
  const theme = useMantineTheme();

  const Assets = {
    select: {
      component: <Overview DATA={WriteUpDATA.Games} params={params} />,
    },
    overview: {
      component: <Overview DATA={WriteUpDATA.Games} params={params} />,
    },
    Matches: {
      component: <ViewGamesTable DATA={WriteUpDATA.Games} params={params}  />,
    },
    Videos: {
      component: <VideoLayout DATA={DownloadData[1]} params={params} WriteUpDATA={WriteUpDATA.Games}/>,
    },
    Images: {
      component: <ViewImageGrid DATA={DownloadData[2]} params={params} />,
    },
  };

  return (
    <Container my="md" size={`xl`}>
      <Grid columns={12}>
        <Grid.Col span={3}>
          <FixturaBox>
            <H size="h6" align="right">
              OPTIONS
            </H>
            <S ta="right" fw={400}>
              Select from the caterogies below
            </S>
            <FixturaPaper>
              <NavLinkWithIcon
                label="Overview"
                description="A round up of the weeks events"
                Icon={<IconBook size="2rem" />}
                onClick={() => {
                  SetCategory("overview");
                }}
              />
              <NavLinkWithIcon
                label="Matches"
                description="List of the Weeks fixtures"
                Icon={<IconGoGame size="2rem" />}
                onClick={() => {
                  SetCategory("Matches");
                }}
              />
              <NavLinkWithIcon
                label="Videos"
                description="List of the Weeks fixtures"
                Icon={<IconVideo size="2rem" />}
                onClick={() => {
                  SetCategory("Videos");
                }}
              />
              <NavLinkWithIcon
                label="Images"
                description="List of the Weeks fixtures"
                Icon={<IconPhotoAi size="2rem" />}
                onClick={() => {
                  SetCategory("Images");
                }}
              />
            </FixturaPaper>
          </FixturaBox>
        </Grid.Col>
        <Grid.Col span={9}>
          <ShowCategoryWrapper>
            {Assets[Category].component}
          </ShowCategoryWrapper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

const ShowCategoryWrapper = ({ children }) => {
  return <FixturaPaper>{children}</FixturaPaper>;
};

const Overview = () => {
  return <>Overview</>;
};
