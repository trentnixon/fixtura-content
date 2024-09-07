import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { selectArticle } from "@/utils/ArticleUtils";
import { Divider } from "@mantine/core";

export const UpComingFixtures = ({ selectedArticle, copyID }) => {
  const displayArticle = selectArticle(selectedArticle);
  return (
    <div id={copyID}>
      {displayArticle.fixtures.map((article, i) => {
        return (
          <div key={article.match}>
            <H size="h4" lh="1.1" my="md">
              {article.match}
            </H>
            <P my="md" lh="1.3">
              {article.date} : {article.time}
            </P>
            <P my="md" lh="1.3">
              {article.ground}
            </P>

            <P>{article.summary}</P>
            <Divider my="md" />
          </div>
        );
      })}
    </div>
  );
};
