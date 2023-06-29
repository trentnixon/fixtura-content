"use client";

import { Container, Grid } from "@mantine/core";

import ViewGamesTable from "@/components/Tables/ViewGamesTable";
import VideoLayout from "@/components/Video/ViewVideoLayout";
import ViewImageGrid from "@/components/Tables/ViewImageGrid";
import { FixturaPaper } from "@/components/containers/paper";
import { FixturaBox } from "@/components/containers/boxes";
import { N, S } from "@/components/Type/Paragraph";
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
import { RenderDates } from "@/layouts/Headings/client/RenderDates";
import { FixturaContainer } from "@/components/containers/containers";

export const LayoutPageCategory = ({
  ACCOUNTOBJ,
  DATAOBJ,
  RENDEROBJ,
  PATH,
  assetType,
}) => {
  const [Category, SetCategory] = useState("select");

  let images = Object.entries(DATAOBJ[assetType].dl)[1];
  let imageValue = images ? images[1] : undefined;

  const Assets = {
    select: {
      component: <Overview DATA={DATAOBJ[assetType]?.w.Games} params={PATH} />,
    },
    overview: {
      component: <Overview DATA={DATAOBJ[assetType]?.w.Games} params={PATH} />,
    },
    Articles: {
      component: (
        <ViewGamesTable
          DATA={DATAOBJ[assetType]?.w.Games}
          PATH={PATH}
          assetType={assetType}
          folder="r"
        />
      ),
    }, 
    Videos: {
      component: (
        <VideoLayout
          DATA={Object.entries(DATAOBJ[assetType].dl)[0][1]}
          PATH={PATH}
          WriteUpDATA={DATAOBJ[assetType]?.w.Games}
          assetType={assetType}
          RenderDate={RENDEROBJ}
        />
      ),
    },
    Images: {
      component: (
        <ViewImageGrid DATA={imageValue} PATH={PATH} assetType={assetType} />
      ),
    },
  };

  return (
    <FixturaContainer>
      <RenderDates
        createdAt={RENDEROBJ}
        Assets={DATAOBJ.INT[assetType]?.w + DATAOBJ.INT[assetType]?.dl}
      />

      <Grid columns={12}>
        <Grid.Col span={3}>
          {/* <FixturaBox>
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
                label="Articles"
                active={Category === "Articles"}
                description="List of the Weeks fixtures"
                Icon={<IconGoGame size="2rem" />}
                onClick={() => {
                  SetCategory("Articles");
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
          </FixturaBox> */}
        </Grid.Col>
        <Grid.Col span={9}>
          <ShowCategoryWrapper>
            {Assets[Category]?.component}
          </ShowCategoryWrapper>
        </Grid.Col>
      </Grid>
    </FixturaContainer>
  );
};

const ShowCategoryWrapper = ({ children }) => {
  return <FixturaPaper>{children}</FixturaPaper>;
};

const Overview = () => {
  return <>Overview</>;
};
