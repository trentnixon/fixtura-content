"use client";
import { useState } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { P } from "@/components/Type/Paragraph";

import { FixturaArticleBox } from "@/components/containers/boxes";
import { ActionIcon, ScrollArea, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { FixturaGroup } from "@/components/containers/Group";
import { H } from "@/components/Type/Headers";
import { useMediaQuery } from "@mantine/hooks";

function filterByArticleFormat(data) {
  return data.filter((item) => item.asset.ArticleFormats === "Quick Single");
}



export const DisplaySupportingArticles = ({ renderData }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isCopied, setIsCopied] = useState(false);

  // Building the string that contains all articles' text
  const allArticlesText = renderData.map((article) => {
    let articleContent = filterByArticleFormat(
      article.game_meta_datum.gtp_3_reports
    )[0]?.article;

    if (articleContent && articleContent.includes("#### Quick Single:")) {
      articleContent = articleContent.replace("#### Quick Single:", "").trim();
    }

    return articleContent;
  });

  // Combine all articles into one string to be copied
  const allArticlesCombined = allArticlesText.join("\n");

  return (
    <>
      <P
        fw={600}
        c={"gray"}
        my={10}
        fz={"xs"}
        ta={"right"}
      >{`Supporting articles: ${renderData.length}`}</P>
      <ScrollArea h={isMobile ? 450 : 600}>
        {renderData.map((article, i) => {
          const GAME = article.game_meta_datum;
          const articleContent = allArticlesText[i];

          return (
            <div key={i}>
              <FixturaArticleBox mx={0}>
                {GAME ? <ArticleMeta GAME={GAME} /> : false}
                {articleContent}
              </FixturaArticleBox>
            </div>
          );
        })}
      </ScrollArea>

      <FixturaGroup  my={5} mx={10}>
        <H size="h6">Copy Articles to clipboard</H>
        <CopyToClipboard text={allArticlesCombined} onCopy={() => setIsCopied(true)}>
          <Tooltip label={"Copy Supporting Articles"}>
            <ActionIcon
              size="xl"
              radius="md"
              variant="outline"
              sx={(theme) => ({
                borderColor: isCopied ? theme.colors.green[6] : theme.colors.cyan[6],
                color: isCopied ? theme.colors.green[6] : theme.colors.cyan[6],
                cursor: "pointer",
                "&:hover": {
                  background: theme.fn.linearGradient(
                    45,
                    theme.colors.blue[5],
                    theme.colors.cyan[5]
                  ),
                  color: theme.colors.gray[0],
                  borderColor: theme.colors.blue[6],
                },
              })}
            >
              {isCopied ? <IconCheck size="1.125rem" /> : <IconCopy size="1.125rem" />}
            </ActionIcon>
          </Tooltip>
        </CopyToClipboard>
      </FixturaGroup>
    </>
  );
};


const ArticleMeta = ({ GAME }) => {
  return (
    <>
      <P my={10} fw={900}>
        {`${GAME.teamHome}`}{" "}
        {`${GAME?.Homescores === null ? "" : GAME?.Homescores} ${
          GAME?.HomeOvers === null ? "" : GAME?.HomeOvers
        }`}{" "}
        vs {`${GAME.teamAway}`}{" "}
        {`${GAME?.Awayscores === null ? "" : GAME?.Awayscores} ${
          GAME?.AwayOvers === null ? "" : GAME?.AwayOvers
        }`}
      </P>
      <P my={10} fw={400}>
        {GAME.type} - {GAME.round} - {GAME.date}
      </P>
      {!GAME.ResultStatement ? (
        false
      ) : (
        <P fw={400} my={10}>
          {GAME.ResultStatement}
        </P>
      )}
    </>
  );
};
