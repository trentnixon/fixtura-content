"use client";

import { FixturaArticleBox } from "@/components/containers/boxes";
import { FixturaContainer } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const SupportingArticleClient = (props) => {
  const { ITEMS } = props;
  return (
    <FixturaContainer>
        {ITEMS.map((article, i) => {
          return (
            <SelectedWriteup writeup={article.attributes.article} key={i} />
          );
        })}
    </FixturaContainer>
  );
};

const SelectedWriteup = ({ writeup }) => {
  if (writeup === null) return;
  return (
    <FixturaArticleBox c={0}>
      <ReactMarkdown className="markdown">{writeup}</ReactMarkdown>
    </FixturaArticleBox>
  );
};
