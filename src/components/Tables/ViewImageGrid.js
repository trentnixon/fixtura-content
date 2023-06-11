"use client";
import {
  Button,
  Group,
  Image,
  ScrollArea,
  SimpleGrid,
  Table,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";

export default async function ViewImageGrid({ DATA }) {
  //console.log(DATA);
  return (
    <>
      <ImageCarousel Images={DATA} />

      <ImageGrid Images={DATA} />
    </>
  );
}

import React, { useState } from "react";
import { BUTTON_FUNC } from "@/components/UI/buttons";

function ImageCarousel({ Images }) {
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleDownload = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.jpg"; // or any name you want
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <H size="h5" align="right">
        IMAGE CAROUSEL
      </H>
      <Carousel
        slideSize="30%"
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "50%" },
        ]}
        height={600}
        slideGap="xs"
        controlsOffset="xs"
        controlSize={30}
        loop
        withIndicators
      >
        {Object.keys(Images).map((Download, i) => {
          const imageUrl = Images[Download].attributes.URL;
          return (
            <Carousel.Slide key={Images[Download].id}>
              <FixturaBox>
                <Image src={imageUrl} width={400} height={500} fit="contain" />
                <Group position="center" my={20}>
                  <BUTTON_FUNC
                    Label={`Download`}
                    onClick={() => handleDownload(imageUrl)}
                  />
                  <BUTTON_FUNC
                    Label={`Open`}
                    onClick={() => window.open(imageUrl)}
                  />
                </Group>
              </FixturaBox>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </>
  );
}

const ImageGrid = ({ Images }) => {
  return (
    <>
      <H size="h5" align="right">
        THUMBNAIL GRID
      </H>
      <ScrollArea h={400} type="always" offsetScrollbars scrollbarSize={2}>
        <SimpleGrid cols={6} spacing="md" verticalSpacing="md">
          {Object.keys(Images).map((Download, i) => {
            return (
              <div key={Images[Download].id}>
                <FixturaBox>
                  <Image
                    src={Images[Download].attributes.URL}
                    width={200 / 2}
                    height={250 / 2}
                    fit="contain"
                  />
                </FixturaBox>
              </div>
            );
          })}
        </SimpleGrid>
      </ScrollArea>
      <BUTTON_FUNC
        Label={`Download`}
        onClick={() => handleDownload(imageUrl)}
      />
    </>
  );
};
