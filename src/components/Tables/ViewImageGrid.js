"use client";
import { Button, Image, ScrollArea, SimpleGrid, Table } from "@mantine/core";

export default async function ViewImageGrid({ DATA }) {
  console.log(DATA);
  return (
    <>
      <ScrollArea h={400} type="always" offsetScrollbars scrollbarSize={2}>
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
