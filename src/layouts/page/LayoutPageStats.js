"use client";

import { Grid, Group, Image, SimpleGrid } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Tabs } from "@mantine/core"; 

import { FixturaPaper } from "@/components/containers/paper";
import { FixturaBox } from "@/components/containers/boxes";
import { N, P, S } from "@/components/Type/Paragraph";
import { H } from "@/components/Type/Headers";
import { IconPhoto, IconGoGame, IconVideo } from "@tabler/icons-react";
import { BUTTON_FUNC, NavLinkWithIcon } from "@/components/UI/buttons";
import { useState } from "react";
import { BackButtonAsNavLink } from "@/components/Navigation/BackBtn";
import { RenderDates } from "@/layouts/Headings/client/RenderDates";
import { FixturaContainer } from "@/components/containers/containers";
import { HTML5VideoPlayer } from "@/components/AssetLayout/Video/HTML5VideoPlayer";
import { handleDownload } from "@/utils/helpers";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function groupByAssetType(obj1, obj2) {
  let groupedObj = {};

  const extractItemsAndAddToGroup = (object) => {
    for (let key in object) {
      if (key === "Other") {
        object[key].forEach((item) => {
          let compositionID =
            item.attributes.asset.data.attributes.CompositionID;
          if (!groupedObj[compositionID]) {
            groupedObj[compositionID] = [];
          }
          groupedObj[compositionID].push(item);
        });
      } else if (object[key].statistics) {
        object[key].statistics.forEach((item) => {
          let compositionID =
            item.attributes.asset.data.attributes.CompositionID;
          if (!groupedObj[compositionID]) {
            groupedObj[compositionID] = [];
          }
          groupedObj[compositionID].push(item);
        });
      }
    }
  };

  extractItemsAndAddToGroup(obj1);
  extractItemsAndAddToGroup(obj2);

  return groupedObj;
}

export const LayoutPageStatistics = ({
  ACCOUNTOBJ,
  DATAOBJ,
  RENDEROBJ,
  PATH,
  assetType,
}) => {
  const [Category, SetCategory] = useState("select");
  const [SelectedAsset, setSelectedAsset] = useState(null);
  //console.log("DATAOBJ", DATAOBJ[assetType]);

  let groupedData = groupByAssetType(
    DATAOBJ[assetType].dl,
    DATAOBJ[assetType].w
  );

  const Assets = Object.keys(groupedData).reduce((acc, key) => {
    acc[key] = {
      component: (
        <AssetComponent
          key={key}
          label={key}
          data={groupedData[key]}
          onCategoryChange={setSelectedAsset}
        />
      ),
    };
    return acc;
  }, {});


  return (
    <FixturaContainer>
      <RenderDates
        createdAt={RENDEROBJ}
        Assets={DATAOBJ.INT[assetType]?.w + DATAOBJ.INT[assetType]?.dl}
      />

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
              {Object.keys(groupedData).map((key) => {
                let label = key; // Or any transformation you want
                let description = `List of ${key}`; // Or any transformation you want
                return (
                  <NavLinkWithIcon
                    key={key} // Important to provide a unique key for each item when mapping in React
                    label={label}
                    active={Category === label}
                    description={description}
                    Icon={<IconGoGame size="2rem" />} // Replace with appropriate icon if available
                    onClick={() => {
                      setSelectedAsset(label);
                    }}
                  />
                );
              })}
              <BackButtonAsNavLink />
            </FixturaPaper>
          </FixturaBox>
        </Grid.Col>
        <Grid.Col span={9}>
          <FixturaPaper>
            {SelectedAsset === null ? false : Assets[SelectedAsset].component}
          </FixturaPaper>
        </Grid.Col>
      </Grid>
    </FixturaContainer>
  );
};

const AssetComponent = ({ data, label }) => {
  const getContentType = (data) => {
    const contents = {
      video: [],
      image: [],
      content: [],
    };

    data.forEach((item) => {
      const url = item.attributes.URL;

      if (url) {
        const fileExtension = url.split(".").pop().toLowerCase();

        const videoExtensions = ["mp4", "webm", "ogg"];
        if (videoExtensions.includes(fileExtension)) {
          contents.video.push(item);
          return;
        }

        const imageExtensions = ["jpg", "jpeg", "png", "gif"];
        if (imageExtensions.includes(fileExtension)) {
          contents.image.push(item);
          return;
        }
      }

      contents.content.push(item);
    });

    return contents;
  };

  const contents = getContentType(data);

  return (
    <>
      <Grid>
        <Grid.Col span={6} md={6} lg={6}>
          <Tabs variant="pills" defaultValue="video">
            <Tabs.List grow position="center">
              <Tabs.Tab value="video" icon={<IconVideo size="0.8rem" />}>
                Video
              </Tabs.Tab>
              <Tabs.Tab value="image" icon={<IconPhoto size="0.8rem" />}>
                Images
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="video" pt="xs">
              <FixturaBox>
                <VideoComponent Data={contents.video} />
              </FixturaBox>
            </Tabs.Panel>

            <Tabs.Panel value="image" pt="xs">
              <FixturaBox>
                <ImageComponent Data={contents.image} />{" "}
              </FixturaBox>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
        <Grid.Col span={6} md={6} lg={6}>
          <H size="h4" align="right">
            {label}
          </H>
          <FixturaBox>
            <ContentComponent Data={contents.content} />
          </FixturaBox>
        </Grid.Col>
      </Grid>
    </>
  );
};

const VideoComponent = ({ Data }) => {
  //console.log(Data);
  return (
    <>
      {Data.map((video, i) => {
        return <HTML5VideoPlayer url={video.attributes.URL} key={i} />;
      })}
    </>
  );
};

const ImageComponent = ({ Data }) => {
  return (
    <>
      <SimpleGrid cols={1}>
        {Data.map((image, i) => {
        
          return (
            <Image
              src={image.attributes.URL}
              width={400 }
              height={500 }
              fit="contain"
              alt="Ladder image"
              key={i}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
};

const ContentComponent = ({ Data }) => {
  return (
    <>
      {Data.map((copy, i) => {
        return <P key={i}><ReactMarkdown className="markdown">{copy.attributes.article}</ReactMarkdown></P>;
      })}
    </>
  );
};
