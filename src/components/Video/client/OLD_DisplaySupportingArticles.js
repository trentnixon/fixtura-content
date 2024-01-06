"use client";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { P } from "@/components/Type/Paragraph";

import { FixturaArticleBox } from "@/components/containers/boxes";
import { ScrollArea } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { FixturaGroup } from "@/components/containers/Group";
import { H } from "@/components/Type/Headers";
import { useMediaQuery } from "@mantine/hooks";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { AddSponsorsToArticle } from "@/components/Articles/client/AddSponsorsToArticle";
import { formatSponsorsInPlainText } from "@/utils/UI";

function filterByArticleFormat(data, groupBy, accountType) {
  if (data) {
    const filtered = data.filter((item) => {
      return item.asset.ArticleFormats === "Quick Single";
    });
    /* console.log("filtered:", filtered); */
    return filtered;
  }
  return false;
}

function filterRenderData(data, groupBy, accountType) {
  return data.filter((article) => {
    const grade = article.game_meta_datum.grade;
    if (accountType === "Club") {
      return grade.ageGroup === groupBy;
    } else if (accountType === "Association") {
      return grade.competition.competitionName === groupBy;
    }
    return false;
  });
}

export const DisplaySupportingArticles = ({
  renderData,
  hasSponsors,
  GroupBy,
  AccountType,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  // Filtering renderData before the flatMap operation
  const filteredRenderData = filterRenderData(renderData, GroupBy, AccountType);

  // Filtering articles outside of the map function
  const filteredArticles = filterByArticleFormat(
    filteredRenderData.flatMap(
      (article) => article.game_meta_datum?.gtp_3_reports || []
    ),
    GroupBy,
    AccountType
  );
  // Building the string that contains all articles' text
  const allArticlesText = filteredArticles.map((article) => {
    let articleContent = article.article; // Adjusted this line to access the article content directly

    if (articleContent && articleContent.includes("#### Quick Single:")) {
      articleContent = articleContent.replace("#### Quick Single:", "").trim();
    }

    return articleContent;
  });

  // Combine all articles into one string and add any sponsors to be copied
  let allArticlesCombined = allArticlesText.join("\n");
  const sponsorsPlainText = formatSponsorsInPlainText(hasSponsors);
  allArticlesCombined += sponsorsPlainText;

  return (
    <>
      <P
        fw={600}
        c={"gray"}
        my={10}
        fz={"xs"}
        ta={"right"}
      >{`Supporting articles: ${filteredArticles.length}`}</P>
      <ScrollArea h={400}>
        {filteredArticles.map((article, i) => {
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
        <FixturaArticleBox mx={0}>
          <AddSponsorsToArticle
            hasSponsors={hasSponsors}
            version={"supporting"}
          />
        </FixturaArticleBox>
      </ScrollArea>
  
      <CopyArticleCTA ArticleToCopy={allArticlesCombined} />
    </>
  );
  
};





export const DisplayStatisticsSupportingArticles = ({
  ArticleForCopy,
  ArticleForDisplay,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <ScrollArea h={isMobile ? 450 : 600}>
        <FixturaArticleBox mx={0}>
          <ReactMarkdown>
            {ArticleForDisplay.length > 0
              ? ArticleForDisplay
              : "No Article found"}
          </ReactMarkdown>
        </FixturaArticleBox>
      </ScrollArea> 

      <CopyArticleCTA
        ArticleToCopy={
          ArticleForCopy.length > 0 ? ArticleForCopy : "No Article found"
        }
      />
    </>
  );
};

const CopyArticleCTA = ({ ArticleToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <FixturaGroup my={5} mx={10}>
      <H size="h6">Copy Articles to clipboard</H>
      <CopyToClipboard
        text={ArticleToCopy}
        onCopy={() => {
          setIsCopied(true);
        }}
      >
        <button className="btn btn-outline btn-info mx-1">
          {isCopied ? (
            <IconCheck size="1.125rem" />
          ) : (
            <IconCopy size="1.125rem" />
          )}
          {isCopied ? "Copied" : "Copy"}
        </button>
      </CopyToClipboard>
    </FixturaGroup>
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
