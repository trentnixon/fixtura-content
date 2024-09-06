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

  console.log("useAssetType ", useAssetType.AssetMetaData.AssetName);
  console.log("useArticles ", useArticles);

  console.log("useAssetType ", useAssetType.AssetMetaData.AssetName);

  if (useAssetType.AssetMetaData.AssetName === "Weekend Results") {
    useArticles = [mergeArticles(useArticles)];
  }

  return (
    <FixturaContainer>
      {useArticles.map((article, i) => {
        if (!article) return false;
        const selectedArticle = ArticleRewrite
          ? ArticleRewrite
          : selectArticle(article);
        return (
          <Box key={i} my="md" mx="md">
            <Box mb={10}>
              <ArticleActionButtonsContainer
                ArticleBOJ={article}
                selectedArticle={selectedArticle}
                setLoadingState={setLoadingState}
                setArticleRewrite={setArticleRewrite}
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
                <SelectedWriteup selectedArticle={selectedArticle} />
              )}
            </ScrollArea>
          </Box>
        );
      })}
    </FixturaContainer>
  );
};

export const SelectedWriteup = ({ selectedArticle }) => {
  const { compositionID } = useContext(FixturaSettings);
  console.log("compositionID ", compositionID);

  if (selectedArticle === null) return; // need a handler for no article
  console.log("selectedArticle ", selectedArticle);

  const selectArticleFormat = {
    Top5BattingList: <Top5Listicle selectedArticle={selectedArticle} />,
    Top5BowlingList: <Top5Listicle selectedArticle={selectedArticle} />,
  };

  // <ReactMarkdown className="markdown">{selectedArticle.title}</ReactMarkdown>
  return <>{selectArticleFormat[compositionID]}</>;
};
const mergeArticles = (articles) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  const mergedArticle = { ...articles[0] };
  mergedArticle.ArticleJournalist = articles
    .map((article) => article.ArticleJournalist)
    .join("\n\n");

  return mergedArticle;
};

const Top5Listicle = ({ selectedArticle }) => {
  return (
    <>
      <H size="h3">{selectedArticle.title}</H>
      <H size="h5">{selectedArticle.subtitle}</H>

      {selectedArticle.top_scorers.map((article, i) => {
        return (
          <div key={article.player_name}>
            <H size="h6">
              {article.player_name} {article.runs}
            </H>
            <P>{article.highlights}</P>
            <P>{article.article_body}</P>
          </div>
        );
      })}
    </>
  );
};
