"use client";
import { Tabs, useMantineTheme } from "@mantine/core";
import { P } from "@/components/Type/Paragraph";
import { HTML5VideoPlayer } from "@/components/Video/client/HTML5VideoPlayer";
import { FixturaArticleBox, FixturaBox } from "@/components/containers/boxes";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { DisplaySupportingArticles } from "@/components/Video/client/DisplaySupportingArticles";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { IconArticle, IconBookFilled, } from "@tabler/icons-react";


export function CreateVideoClient(props) {
  const { ITEM, renderArticles, description } = props;

  return (
    <FixturaGRIDOUTER>
      <FixturaGRIDCOL span={5} md={6} lg={3}>
        <P fz="sm" c={"gray"} fw={600} ta={"right"} my={7}>
          {ITEM.Name}
        </P>

        <FixturaBox p={0} c={1}>
          <HTML5VideoPlayer url={ITEM.URL} Name={ITEM.Name} />
        </FixturaBox>
      </FixturaGRIDCOL>
      <FixturaGRIDCOL span={7} md={6} lg={9}>
        <VideoSupportingData
          description={description}
          articles={renderArticles}
        />
      </FixturaGRIDCOL>
    </FixturaGRIDOUTER>
  );
}

const VideoSupportingData = ({ description, articles }) => {
  const theme = useMantineTheme();
  return (
    <Tabs
      defaultValue="articles"
      variant="pills"
      color={theme.fn.linearGradient(
        45,
        theme.colors.blue[5],
        theme.colors.cyan[5]
      )}
    >
      <Tabs.List position="center">
        <Tabs.Tab value="articles" icon={<IconArticle size="1rem" />}>
          <P>Supporting Articles</P>
        </Tabs.Tab>
        <Tabs.Tab value="about" icon={<IconBookFilled size="1rem" />}>
          <P>About</P>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="about" pt="xs">
        <AssetDescription description={description} />
      </Tabs.Panel>
      <Tabs.Panel value="articles" pt="xs">
        {articles ? <DisplaySupportingArticles renderData={articles} /> : false}
      </Tabs.Panel>
    </Tabs>
  );
};

const AssetDescription = ({ description }) => {
  return (
    <FixturaArticleBox>
      <ReactMarkdown className="markdown">{description}</ReactMarkdown>
    </FixturaArticleBox>
  );
};
