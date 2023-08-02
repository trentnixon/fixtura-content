"use client";
import { Tabs, useMantineTheme } from "@mantine/core";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import {  BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { HTML5VideoPlayer } from "@/components/Video/client/HTML5VideoPlayer";
//import VideoSupportingArticles from "@/components/Video/server/VideoSupportingArticles";
import { FixturaBtnGroup, FixturaGroup } from "@/components/containers/Group";
import { FixturaArticleBox, FixturaBox } from "@/components/containers/boxes";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { DisplaySupportingArticles } from "@/components/Video/client/DisplaySupportingArticles";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { IconArticle, IconBookFilled, IconDownload } from "@tabler/icons-react";
import { handleVideoDownload } from "@/utils/helpers";

export async function CreateVideoClient(props) {
  const { ITEM, renderArticles, description } = props;

  return (
    <>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={5} md={6} lg={4}>
          <FixturaGroup>
            <H size="h6">Download Video</H>
            <CTAGroup URL={ITEM.URL} />
          </FixturaGroup>
          <FixturaBox>
            <HTML5VideoPlayer url={ITEM.URL} />
          </FixturaBox>
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={7} md={6} lg={8}>
          <VideoSupportingData
            description={description}
            articles={renderArticles}
          />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </>
  );
}

const CTAGroup = ({ URL }) => {
  return (
    <FixturaBtnGroup my={20}>
      <BUTTON_ICON_FUNC
        onClick={() => {
          handleVideoDownload(URL);
        }}
        Icon={<IconDownload />}
      />
    </FixturaBtnGroup>
  );
};

const VideoSupportingData = ({ description, articles }) => {
  const theme = useMantineTheme()
  return (
    <Tabs defaultValue="about" variant="pills" color={theme.fn.linearGradient(
      45,
      theme.colors.blue[5],
      theme.colors.cyan[5]
    )}>
      <Tabs.List position="center">
        <Tabs.Tab value="about" icon={<IconBookFilled size="1rem" />}>
          <P>Description</P>
        </Tabs.Tab>
        <Tabs.Tab value="articles" icon={<IconArticle size="1rem" />}>
          <P>Supporting Articles</P>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="about" pt="xs">
        <AssetDescription description={description} title="Description" />
      </Tabs.Panel>
      <Tabs.Panel value="articles" pt="xs">
        {articles ? <DisplaySupportingArticles renderData={articles} /> : false}
      </Tabs.Panel>
    </Tabs>
  );
};

const AssetDescription = ({ description, title }) => {
  return (
    <>
      <H size="h4" my={10}>
        {title}
      </H>
      <FixturaArticleBox>
        <ReactMarkdown className="markdown">{description}</ReactMarkdown>
      </FixturaArticleBox>
      
    </>
  );
};
