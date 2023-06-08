"use client";
import { Button, Image, ScrollArea, SimpleGrid, Table } from "@mantine/core";
import { Carousel } from '@mantine/carousel';

export default async function ViewImageGrid({ DATA }) {
  console.log(DATA);
  return (
    <>
      <ScrollArea h={400} type="always" offsetScrollbars scrollbarSize={2}>
        <ImageCarousel />
        <SimpleGrid cols={4} spacing="md" verticalSpacing="md">
          {Object.keys(DATA).map((Download, i) => {
            return (
              <div key={DATA[Download].id}>
                <Image
                  src={DATA[Download].attributes.URL}
                  width={200 / 1.5}
                  height={250 / 1.5}
                  fit="contain"
                />
              </div>
            );
          })}
        </SimpleGrid>
      </ScrollArea>
      <Button>View</Button>
    </>
  );
}



function ImageCarousel() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}