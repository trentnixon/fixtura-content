import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";

export const SingleResultArticles = ({ selectedArticle, copyID }) => {
  return (
    <div id={copyID}>
      <H size="h5" lh="1.1" mb="md">{selectedArticle.title}</H>
      <H size="h6" lh="1.1" my="md">{selectedArticle.subtitle}</H>
      <P my="md" lh="1.3">{selectedArticle.article_body}</P>
      <P my="md" lh="1.3">{selectedArticle.highlights}</P>
    </div>
  );
};
