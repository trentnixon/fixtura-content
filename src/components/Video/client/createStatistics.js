"use client";
import { Image, ScrollArea, Table, Tabs } from "@mantine/core";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { HTML5VideoPlayer } from "@/components/Video/client/HTML5VideoPlayer";
//import VideoSupportingArticles from "@/components/Video/server/VideoSupportingArticles";
import { FixturaBtnGroup, FixturaGroup } from "@/components/containers/Group";
import { FixturaArticleBox, FixturaBox } from "@/components/containers/boxes";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { DisplaySupportingArticles } from "@/components/Video/client/DisplaySupportingArticles";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { IconArticle, IconBookFilled, IconDownload } from "@tabler/icons-react";
import { handleVideoDownload } from "@/utils/helpers";
import { SingleImageWithDownload } from "@/components/Images/client/createImages";

export async function CreateStatisticsClient(props) {
  const { ITEM, renderArticles, assetName, assetTypes, description } = props;

  //console.log(assetTypes?.IMAGE);
  if (!assetTypes?.IMAGE) return false;
  return (
    <>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={5} md={6} lg={4}>
          <Tabs defaultValue="about" variant="pills" color="blue">
            <Tabs.List position="center">
              <Tabs.Tab value="about" icon={<IconBookFilled size="1rem" />}>
                <P>Video</P>
              </Tabs.Tab>
              <Tabs.Tab value="articles" icon={<IconArticle size="1rem" />}>
                <P>Image</P>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="about" pt="xs">
              {assetTypes?.VIDEO.map((video, i) => {
                return (
                  <div key={i}>
                    <FixturaBox>
                      <HTML5VideoPlayer url={video.attributes.URL} key={i} />
                    </FixturaBox>
                  </div>
                );
              })}
            </Tabs.Panel>
            <Tabs.Panel value="articles" pt="xs">
              <FixturaGroup>
                <H size="h6">{assetName}</H>
              </FixturaGroup>
              <FixturaBox>
                {assetTypes?.IMAGE?.length > 1 ? (
                  <ImageList ITEMS={assetTypes.IMAGE} />
                ) : (
                  assetTypes?.IMAGE.map((image, i) => {
                    //console.log(image)
                    return (
                      <SingleImageWithDownload
                        URL={image.attributes.URL}
                        key={i}
                      />
                    );
                  })
                )}
              </FixturaBox>
            </Tabs.Panel>
          </Tabs>
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={7} md={6} lg={8}>
          <VideoSupportingData
            description={description}
            articles={assetTypes.article}
          />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </>
  );
}

const ImageList = ({ ITEMS }) => {
  //console.log(ITEMS);
  const rows = ITEMS?.map((element) => (
    <tr key={element.name}>
      <td>
        <Image
          alt={`download image`}
          src={element?.attributes?.URL}
          height={50}
          width={`auto`}
        />
      </td>
      <td>{element.name}</td>
      <td>View</td>
      <td>DL</td>
    </tr>
  ));
  return (
    <ScrollArea h={450}>
      <Table>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

const CTAGroup = ({ URL }) => {
  return (
    <FixturaBtnGroup my={5}>
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
  return (
    <Tabs defaultValue="about" variant="pills" color="orange">
      <Tabs.List position="center">
        <Tabs.Tab value="about" icon={<IconBookFilled size="1rem" />}>
          <P>About</P>
        </Tabs.Tab>
        <Tabs.Tab value="articles" icon={<IconArticle size="1rem" />}>
          <P>Supporting Articles</P>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="about" pt="xs">
        <AssetDescription description={description} title="Description" />
      </Tabs.Panel>
      <Tabs.Panel value="articles" pt="xs">
        {/* {articles ? <DisplaySupportingArticles renderData={articles} /> : false} */}
      </Tabs.Panel>
    </Tabs>
  );
};

const AssetDescription = ({ description, title }) => {
  return (
    <>
      <FixturaArticleBox>
        <ReactMarkdown className="markdown">{description}</ReactMarkdown>
      </FixturaArticleBox>
    </>
  );
};
