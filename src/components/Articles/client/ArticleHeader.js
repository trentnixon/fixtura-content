import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { FixturaGroup } from "@/components/containers/Group";
import {
  ArticleMetaBox,
  FixturaAccountBox,
  FixturaArticleBox,
  FixturaBox,
} from "@/components/containers/boxes";
import { FixturaStack } from "@/components/containers/stack";
import { limitString } from "@/utils/UI";
import { useMediaQuery } from "@mantine/hooks";

export const ArticleHeader = ({ GAME }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const ResponsiveGroup = isMobile ? FixturaStack : FixturaGroup;

  return (
    <FixturaAccountBox c={0} my={5} mx={0} py={0} px={0}>
      <FixturaGroup my={5}>
        <P fz={isMobile ? `xs` : `xs`} fw={800} c={'dark.5'}>
          {GAME.type} {GAME.round}
        </P>

        <P fz={isMobile ? `xs` : `xs`} fw={400} c={'dark.8'}>{GAME.date}</P>
      </FixturaGroup>
      <ResponsiveGroup grow={true}>
        <ArticleMetaBox c={5} baseColor={`blue`} w="100%" border={'borderRight'} >
          <H
            size={isMobile ? `h6` : `h4`}
            color={"gray.9"}
            align={isMobile ? `center` : `right`}
          >{`${limitString(GAME.teamHome, isMobile ? 50 : 35)} `}</H>
          <H
            size={`h5`}
            color={"gray.9"}
            align={isMobile ? `center` : `right`}
            weight="400"
          >{`${GAME?.Homescores === null ? "" : GAME?.Homescores} ${
            GAME?.HomeOvers === null ? "" : GAME?.HomeOvers
          }`}</H>
        </ArticleMetaBox>

        <ArticleMetaBox c={5} baseColor={`cyan`} w="100%" >
          <H
            size={isMobile ? `h6` : `h4`}
            align={isMobile ? `center` : `left`}
          >{`${limitString(GAME.teamAway, isMobile ? 50 : 35)} `}</H>
          <H
            size={`h5`}
            align={isMobile ? `center` : `left`}
            color="gray.6"
            weight="400"
          >{`${GAME?.Awayscores === null ? "" : GAME?.Awayscores} ${
            GAME?.AwayOvers === null ? "" : GAME?.AwayOvers
          }`}</H>
        </ArticleMetaBox>
      </ResponsiveGroup>

      {!GAME.ResultStatement ? (
        false
      ) : (
        <FixturaArticleBox my={10} mx={0} c={5} baseColor={`dark`}>
          <P c={"white"} ta="center" fz={"xs"}>
            {GAME.ResultStatement}
          </P>
        </FixturaArticleBox>
      )}
    </FixturaAccountBox>
  );
};
