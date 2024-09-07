import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";

export const LadderSummary = ({ selectedArticle, copyID }) => {
  return (
    <div id={copyID}>
      {selectedArticle.leagues.map((article, i) => {
        return (
          <div key={article.title}>
            <H size="h6">{article.title}</H>
            <P>{article.subtitle}</P>
            <P>{article.article_body}</P>
          </div>
        );
      })}
    </div>
  );
};
