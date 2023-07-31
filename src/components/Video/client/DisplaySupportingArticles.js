"use client";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { FixturaGroup } from "@/components/containers/Group";
import {
  FixturaAccountBox,
  FixturaArticleBox,
} from "@/components/containers/boxes";
import { ScrollArea } from "@mantine/core";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function filterByArticleFormat(data) {
  return data.filter((item) => item.asset.ArticleFormats === "Quick Single");
}

export const DisplaySupportingArticles = ({ renderData }) => {
  return (
    <ScrollArea h={600}>
      {renderData.map((article, i) => {
        const GAME = article.game_meta_datum;
        //console.log("GAME", GAME)
        return (
          <div key={i}>
            <FixturaArticleBox>
              {GAME ? <ArticleMeta GAME={GAME} /> : false}

              <ReactMarkdown className="markdown">
                {
                  filterByArticleFormat(
                    article.game_meta_datum.gtp_3_reports
                  )[0]?.article
                }
              </ReactMarkdown>
            </FixturaArticleBox>
          </div>
        );
      })}
    </ScrollArea>
  );
};

const ArticleMeta = ({ GAME }) => {
  return (
    <>
      <FixturaAccountBox c={0} my={20} py={10}>
        <FixturaGroup my={5}>
          <P>
            {GAME.type} {GAME.round}
          </P>

          <P>{GAME.date}</P>
        </FixturaGroup>
        <FixturaGroup>
          <div>
            <H size={`h3`} align="right">{`${GAME.teamHome}`}</H>
            <H size={`h6`} align="right" color="gray.6" weight="400">{`${
              GAME?.Homescores === null ? "" : GAME?.Homescores
            } ${GAME?.HomeOvers === null ? "" : GAME?.HomeOvers}`}</H>
          </div>

          <div>vs</div>
          <div>
            <H size={`h3`}>{`${GAME.teamAway}`}</H>
            <H size={`h6`} color="gray.6" weight="400">{`${
              GAME?.Awayscores === null ? "" : GAME?.Awayscores
            } ${GAME?.AwayOvers === null ? "" : GAME?.AwayOvers}`}</H>
          </div>
        </FixturaGroup>

        {!GAME.ResultStatement ? (
          false
        ) : (
          <FixturaArticleBox c={1}>
            <P ta="center">{GAME.ResultStatement}</P>
          </FixturaArticleBox>
        )}
      </FixturaAccountBox>
    </>
  );
};
/*
<FixturaAccountBox c={0} my={20} py={10}>
            <FixturaGroup my={5}>
              <P>
                {GAME.type} {GAME.round}
              </P>

              <P>{GAME.date}</P>
            </FixturaGroup>
            <FixturaGroup>
              <div>
                <H size={`h3`} align="right">{`${GAME.teamHome}`}</H>
                <H
                  size={`h6`}
                  align="right"
                  color="gray.6"
                  weight="400"
                >{`${GAME.Homescores} ${GAME.HomeOvers}`}</H>
              </div>

              <div>vs</div>
              <div>
                <H size={`h3`}>{`${GAME.teamAway}`}</H>
                <H
                  size={`h6`}
                  color="gray.6"
                  weight="400"
                >{`${GAME.Awayscores} ${GAME.AwayOvers}`}</H>
              </div>
            </FixturaGroup>

            <FixturaArticleBox c={1}>
              <P ta="center">{GAME.ResultStatement}</P>
            </FixturaArticleBox>
          </FixturaAccountBox>
*/
