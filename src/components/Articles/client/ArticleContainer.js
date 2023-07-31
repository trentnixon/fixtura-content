import { FixturaPaper } from "@/components/containers/paper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const ArticleContainer = ({ article }) => {
  return (
    <FixturaPaper c={2}>
      <ReactMarkdown className="markdown">{article}</ReactMarkdown>
    </FixturaPaper>
  );
};
