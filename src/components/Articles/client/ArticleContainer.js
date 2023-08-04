import { FixturaPaper } from "@/components/containers/paper";
import { separateArticleHeaderAndBody } from "@/utils/UI";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const ArticleContainer = ({ article }) => {
  const {articleHeader, articleBody} = separateArticleHeaderAndBody(article);
  return (
    <>
      <ReactMarkdown className="markdown">{articleHeader}</ReactMarkdown> 
      <FixturaPaper c={2}>
        <ReactMarkdown className="markdown">{articleBody}</ReactMarkdown>
      </FixturaPaper>
    </>
  );
};
