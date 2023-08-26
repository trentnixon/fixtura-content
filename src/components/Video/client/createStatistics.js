"use client";
import { Center, Image, Modal, ScrollArea, Table, Tabs } from "@mantine/core";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { BUTTON_FUNC, BUTTON_ICON_FUNC } from "@/components/UI/buttons";
import { HTML5VideoPlayer } from "@/components/Video/client/HTML5VideoPlayer";
//import VideoSupportingArticles from "@/components/Video/server/VideoSupportingArticles";
import { FixturaBtnGroup, FixturaGroup } from "@/components/containers/Group";
import { FixturaArticleBox, FixturaBox } from "@/components/containers/boxes";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import {
  DisplayStatisticsSupportingArticles,
  DisplaySupportingArticles,
} from "@/components/Video/client/DisplaySupportingArticles";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  IconArticle,
  IconBookFilled,
  IconDownload,
  IconEye,
} from "@tabler/icons-react";
import {
  handleDownload,
  handleDownloadAll,
  handleVideoDownload,
} from "@/utils/helpers";
import { SingleImageWithDownload } from "@/components/Images/client/createImages";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  formatSponsorsInMarkdown,
  formatSponsorsInPlainText,
} from "@/utils/UI";

export function CreateStatisticsClient(props) {
  const {
    ITEM,
    renderArticles,
    assetName,
    assetTypes,
    description,
    hasSponsors,
  } = props;
  if (!assetTypes?.IMAGE) return false;
  console.log('hasSponsors', hasSponsors)
  return (
    <>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={5} md={6} lg={4}>
          <Tabs defaultValue="video" variant="pills" color="blue">
            <Tabs.List position="center">
              <Tabs.Tab value="video" icon={<IconBookFilled size="1rem" />}>
                <P>Video</P>
              </Tabs.Tab>
              <Tabs.Tab value="images" icon={<IconArticle size="1rem" />}>
                <P>Image</P>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="video" pt="xs">
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
            <Tabs.Panel value="images" pt="xs">
              <FixturaGroup>
                <H size="h6">{assetName}</H>
              </FixturaGroup>
              <FixturaBox>
                {assetTypes?.IMAGE?.length > 1 ? (
                  <ImageList ITEMS={assetTypes.IMAGE} />
                ) : (
                  assetTypes?.IMAGE.map((image, i) => {
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
            assetName={assetName}
            hasSponsors={hasSponsors}
          />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </>
  );
}

const ImageList = ({ ITEMS }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleViewClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    open();
  };

  const rows = ITEMS?.map((element) => (
    <tr key={element.id}>
      <td>
        <Center>
          <Image
            alt={`download image`}
            src={element?.attributes?.URL}
            width={250}
            height={`auto`}
          />
        </Center>
        <FixturaGroup position="center" my={10}>
          <BUTTON_ICON_FUNC
            label="Click to View"
            onClick={() => handleViewClick(element?.attributes?.URL)}
            Icon={<IconEye size="1.125rem" stroke={2} />}
          />
          <BUTTON_ICON_FUNC
            label="Download Image"
            onClick={() => {
              handleDownload(element?.attributes?.URL);
            }}
            Icon={<IconDownload size="1.125rem" stroke={2} />}
          />
        </FixturaGroup>
      </td>
      {/*  */}
    </tr>
  ));

  return (
    <>
      <ScrollArea h={500}>
        <Table>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <FixturaGroup position="right" my={10}>
        <BUTTON_FUNC
          Label={`Download All (${ITEMS.length})`}
          onClick={() => handleDownloadAll(ITEMS)}
        />
      </FixturaGroup>
      <Modal opened={opened} onClose={close} title="Image View">
        <Image src={selectedImage} alt="Image View" />
      </Modal>
    </>
  );
};

const VideoSupportingData = ({
  description,
  articles,
  assetName,
  hasSponsors,
}) => {
  const CreateArticleForDisplay = (Article) => {
    return (Article[0].attributes.article +=
      formatSponsorsInMarkdown(hasSponsors));
  };
  const CreateArticleForCopy = (Article) => {
    return (Article[0].attributes.article +=
      formatSponsorsInPlainText(hasSponsors));
  };
  // formatSponsorsInMarkdown
  return (
    <Tabs defaultValue="articles" variant="pills" color="blue">
      <Tabs.List position="center">
        <Tabs.Tab value="articles" icon={<IconArticle size="1rem" />}>
          <P>Supporting Articles</P>
        </Tabs.Tab>
        <Tabs.Tab value="about" icon={<IconBookFilled size="1rem" />}>
          <P>About</P>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="about" pt="xs">
        <AssetDescription description={description} title="Description" />
      </Tabs.Panel>
      <Tabs.Panel value="articles" pt="xs">
        {articles ? (
          <DisplayStatisticsSupportingArticles
            ArticleForDisplay={CreateArticleForDisplay(articles)}
            ArticleForCopy={CreateArticleForCopy(articles)}
          />
        ) : (
          false
        )}
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
