"use client";

import { Container, Grid } from "@mantine/core";

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
import { BackButtonAsNavLink } from "@/components/Navigation/BackBtn";

export const AssetTypeGridLayout = ({
  account,
  scheduler,
  renderData,
  assets,
  params,
  WriteUpDATA,
  assetType,
  Videos,
  Images,

}) => {
  const [Category, SetCategory] = useState("select");

  console.log("Videos", Videos);

  const Assets = {
    select: {
      component: <Overview DATA={WriteUpDATA.Games} params={params} />,
    },
    overview: {
      component: <Overview DATA={WriteUpDATA.Games} params={params} />,
    },
    Matches: {
      component: (
        <ViewGamesTable
          DATA={WriteUpDATA.Games}
          params={params}
          assetType={assetType}
          path='r'
        />
      ),
    },
    Videos: {
      component: (
        <VideoLayout
          DATA={Videos}
          params={params}
          WriteUpDATA={WriteUpDATA.Games}
          assetType={assetType}
          RenderDate={renderData.attributes.createdAt}
        />
      ),
    },
    Images: {
      component: (
        <ViewImageGrid DATA={Images} params={params} assetType={assetType} />
      ),
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
                active={Category === "overview"}
                label="Overview"
                description="A round up of the weeks events"
                Icon={<IconBook size="2rem" />}
                onClick={() => {
                  SetCategory("overview");
                  
                }}
              />
              <NavLinkWithIcon
                label="Matches"
                active={Category === "Matches"}
                description="List of the Weeks fixtures"
                Icon={<IconGoGame size="2rem" />}
                onClick={() => {
                  SetCategory("Matches");
                }}
              />
              <NavLinkWithIcon
                label="Videos"
                active={Category === "Videos"}
                description="List of the Weeks fixtures"
                Icon={<IconVideo size="2rem" />}
                onClick={() => {
                  SetCategory("Videos");
                }}
              />
              <NavLinkWithIcon
                label="Images"
                active={Category === "Images"}
                description="List of the Weeks fixtures"
                Icon={<IconPhotoAi size="2rem" />}
                onClick={() => {
                  SetCategory("Images");
                }}
              />
              <BackButtonAsNavLink />
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
