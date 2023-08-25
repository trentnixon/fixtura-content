import { formatSponsorsInMarkdown } from "@/utils/UI";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
export  const AddSponsorsToArticle = ({ hasSponsors, ArticleFormats }) => {
  const sponsorsPlainText = formatSponsorsInMarkdown(hasSponsors);
 
  if (
    hasSponsors &&
    hasSponsors.length !== 0 &&
    ArticleFormats !== "Quick Single"
  )
    return  <ReactMarkdown className="markdown">{sponsorsPlainText}</ReactMarkdown>
};

