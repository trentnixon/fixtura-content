import { AddSponsorsToArticle } from "@/components/Articles/client/AddSponsorsToArticle";
import { FixturaPaper } from "@/components/containers/paper";
import { separateArticleHeaderAndBody } from "@/utils/UI";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const ArticleContainer = ({ article, hasSponsors, version }) => {
  const { articleHeader, articleBody } = separateArticleHeaderAndBody(article);

  return (
    <>
      <ReactMarkdown className="markdown">{articleHeader}</ReactMarkdown>
      <FixturaPaper c={2}>
        <ReactMarkdown className="markdown">{articleBody}</ReactMarkdown>
        <AddSponsorsToArticle hasSponsors={hasSponsors} ArticleFormats={version.asset.ArticleFormats} />
      </FixturaPaper>
    </>
  );
};
