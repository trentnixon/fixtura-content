import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { selectArticle } from "@/utils/ArticleUtils";
export const Top5Listicle = ({ selectedArticle, copyID }) => {
  const displayArticle = selectArticle(selectedArticle);
  return (
    <div id={copyID}>
      <H size="h3">{displayArticle.title}</H>
      <H size="h5">{displayArticle.subtitle}</H>

      {displayArticle.top_scorers.map((article, i) => {
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
    </div>
  );
};
