"use client";

import { ArticleActionButtonsContainer } from "@/components/AssetLayout/Article/ArticleButtons";
import { P } from "@/components/Type/Paragraph";
import { ProcessingLoader } from "@/components/UI/Loader";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaContainer } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import { selectArticle } from "@/utils/ArticleUtils";
import { getActiveAssetType } from "@/utils/getActiveAssetOBJ";
import { Box, ScrollArea } from "@mantine/core";
import { IconArticle } from "@tabler/icons-react";
import { useState } from "react";
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

  const useAssetType = await getActiveAssetType();
  const useArticles = useAssetType.useAssetData.articles;

  console.log("SupportingArticleClientWithScroll === ", useArticles);
  return (
    <FixturaContainer>
      <FixturaPaper c={1} shadow={"none"} p={5} my={10}>
        <FixturaGroup position="right">
          <P fz="lg" c={"gray.7"} fw={900} ta={"right"} my={7}>
            Article
          </P>
          <IconArticle />
        </FixturaGroup>
      </FixturaPaper>

      {useArticles.map((article, i) => {
        const selectedArticle = ArticleRewrite
          ? ArticleRewrite
          : selectArticle(article);
        return (
          <Box key={i} my="md" mx="md">
            <ScrollArea h={480}>
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
            <Box mt={10}>
              <ArticleActionButtonsContainer
                ArticleBOJ={article}
                selectedArticle={selectedArticle}
                setLoadingState={setLoadingState}
                setArticleRewrite={setArticleRewrite}
              />
            </Box>
          </Box>
        );
      })}
    </FixturaContainer>
  );
};

export const SelectedWriteup = ({ selectedArticle }) => {
  /*  console.log("selectedArticle", selectedArticle); */
  if (selectedArticle === null) return; // need a handler for no article
  return <ReactMarkdown className="markdown">{selectedArticle}</ReactMarkdown>;
};
