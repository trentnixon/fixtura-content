import { H } from "@/components/Type/Headers";
import { P, S } from "@/components/Type/Paragraph";
import { selectArticle } from "@/utils/ArticleUtils";
import { Divider } from "@mantine/core";
export const Top5Listicle = ({ selectedArticle, copyID }) => {
  const displayArticle = selectArticle(selectedArticle);
  return (
    <div id={copyID}>
      <H size="h4" lh="1.2" mb="md">
        {displayArticle.title}
      </H>
      <H size="h5" lh="1.2" mb="md" weight="400">
        {displayArticle.subtitle}
      </H>
      <Divider my="md" />
      {displayArticle.top_scorers.map((article, i) => {
        console.log("article ", article);
        return (
          <div key={article.player_name}>
            <H size="h5" lh="1.1" mb="sm">
              {article.position}. {article.player_name}{" "}
            </H>
            <S lh="1.2" fw="400">
              {article.performance_stats}
            </S>
            {/* <P my="md" lh="1.3">
              {article.highlights}
            </P> */}
            <P my="md" lh="1.3">
              {article.article_body}
            </P>
            <Divider my="md" />
          </div>
        );
      })}
    </div>
  );
};
