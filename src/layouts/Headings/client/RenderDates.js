"use client";
import { H } from "@/components/Type/Headers";
import { C, P, S } from "@/components/Type/Paragraph";
import { FixturaSection } from "@/components/containers/Section";
import { Group, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const RenderDates = ({ createdAt, Assets = 0 }) => {
  const theme = useMantineTheme();
  return (
    <Group position="apart" align="end">
      <FixturaSection Title={""} shade="7" py={2}>
        <S c={theme.colors.gray[0]}>Asset Date Range</S>
        <H size="h2">
          <C shade={1} fw={700}>
            {createdAt.FROM}
          </C>{" "}
          <C shade={1} fw={700}>
            -
          </C>
          <C shade={2} fw={700}>
            {createdAt.TO}
          </C>
        </H>
      </FixturaSection>
    </Group>
  );
};

export const HeroRenderDates = ({ createdAt, Assets = 0 }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? (
    false
  ) : (
    <P c={`gray.9`} fz={"sm"} fw="700" ta="center">
      {createdAt.FROM} - {createdAt.TO}
    </P>
  );
};
