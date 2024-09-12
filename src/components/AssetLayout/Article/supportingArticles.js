"use client";

import { ArticleActionButtonsContainer } from "@/components/AssetLayout/Article/ArticleButtons";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { ProcessingLoader } from "@/components/UI/Loader";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaContainer } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import {
  FixturaSettings,
  FixturaSettingsProvider,
} from "@/context/ContextFixturaSettings";
import { selectArticle } from "@/utils/ArticleUtils";
import { GetActiveAssetType } from "@/utils/getActiveAssetOBJ";
import { Box, ScrollArea } from "@mantine/core";
import { IconArticle } from "@tabler/icons-react";
import { useContext, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

// articles
import { Top5Listicle } from "@/components/AssetLayout/Article/ArticleTypes/Top5Listicle";
import { LadderSummary } from "@/components/AssetLayout/Article/ArticleTypes/LadderSummary";
import { SingleResultArticles } from "@/components/AssetLayout/Article/ArticleTypes/SingleResultArticles";
import { UpComingFixtures } from "@/components/AssetLayout/Article/ArticleTypes/UpComingFixtures";
import { WeekendWrapUp } from "@/components/AssetLayout/Article/ArticleTypes/WeekendWrapUp";

export const SupportingArticleClient = (props) => {
  const { ITEMS } = props;

  return (
    <FixturaContainer>
      {ITEMS.map((article, i) => {
        return <SelectedWriteup writeup={article.attributes.article} key={i} />;
      })}
    </FixturaContainer>
  );
};

export const SupportingArticleClientWithScroll = async () => {
  const [loadingState, setLoadingState] = useState(false);
  const [ArticleRewrite, setArticleRewrite] = useState(false);

  const useAssetType = await GetActiveAssetType();
  let useArticles = useAssetType.useAssetData.articles;

  if (useAssetType.AssetMetaData.AssetName === "Weekend Results") {
    useArticles = [mergeArticles(useArticles)];
  }

  return (
    <FixturaContainer>
      {useArticles.map((article, i) => {
        if (!article) return false;
        return (
          <Box key={i} my="md" mx="md">
            <Box mb={10}>
              <ArticleActionButtonsContainer
                ArticleBOJ={article}
                selectedArticle={article}
                setLoadingState={setLoadingState}
                setArticleRewrite={setArticleRewrite}
                copyID={`copy_${i}`}
              />
            </Box>
            <ScrollArea h={450}>
              {loadingState ? (
                <FixturaBox>
                  <FixturaGroup>
                    <P>Processing New Article</P>
                    <ProcessingLoader />
                  </FixturaGroup>
                </FixturaBox>
              ) : (
                <SelectedWriteup
                  selectedArticle={article}
                  copyID={`copy_${i}`}
                />
              )}
            </ScrollArea>
          </Box>
        );
      })}
    </FixturaContainer>
  );
};

export const SelectedWriteup = ({ selectedArticle, copyID }) => {
  const { compositionID } = useContext(FixturaSettings);
  //console.log("compositionID ", compositionID);

  if (selectedArticle === null) return; // need a handler for no article
  //console.log("selectedArticle ", selectedArticle);

  const selectArticleFormat = {
    Top5BattingList: (
      <Top5Listicle selectedArticle={selectedArticle} copyID={copyID} />
    ),
    Top5BowlingList: (
      <Top5Listicle selectedArticle={selectedArticle} copyID={copyID} />
    ),
    LadderSummary: (
      <LadderSummary selectedArticle={selectedArticle} copyID={copyID} />
    ),
    UpComingFixtures: (
      <UpComingFixtures selectedArticle={selectedArticle} copyID={copyID} />
    ),
    WeekendSingleGameResult: (
      <SingleResultArticles selectedArticle={selectedArticle} copyID={copyID} />
    ),
    WeekendResults: (
      <WeekendWrapUp selectedArticle={selectedArticle} copyID={copyID} />
    ),
  };

  // <ReactMarkdown className="markdown">{selectedArticle.title}</ReactMarkdown>
  return <>{selectArticleFormat[compositionID]}</>;
};

const mergeArticles = (articles) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  // Initialize a structure for the merged results array
  const mergedResults = [];

  // Loop through all articles and merge their `structuredOutput.results`
  articles.forEach((article) => {
    if (article.structuredOutput && article.structuredOutput.results) {
      // Merge the results from each article into the mergedResults array
      mergedResults.push(...article.structuredOutput.results);
    }
  });

  // Return only the merged results array
  return [mergedResults];
};
