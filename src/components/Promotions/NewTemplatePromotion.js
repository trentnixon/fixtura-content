"use client";
// APIS
// Structure
import { FixturaSection } from "@/components/containers/Section";
import { Group, Image } from "@mantine/core";
import { BUTTON_LINK } from "@/components/UI/buttons";

export const NewTemplatePromo = () => {
  return (
    <FixturaSection
      shade={0}
      Title={`CNSW Released`}
      subTitle={`Drawing inspiration from the CNSW digital account, the CNSW template
      introduces stylish animations and a selection of trendy background
      options`}
      Icon={`ICO_TEMPLATE`}
    >
      <Image src="https://fixtura.s3.ap-southeast-2.amazonaws.com/CNSW_Poster_dca81f5732.png" />
      <Group position="right" mt={10}>
        <BUTTON_LINK
          href="https://www.fixtura.com.au/members/customizer/"
          Label="Preview Template"
        />
      </Group>
    </FixturaSection>
  );
}; 
