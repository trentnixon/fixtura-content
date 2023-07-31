"use client";
import { useEffect, useState } from "react";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { usePollRewrite, useRewrite } from "@/Hooks/useRewrite";
import { useRouter } from "next/navigation";
import { NoArticlesMessage } from "@/components/Articles/client/NoArticlesMessage";
import { PendingRewrite } from "@/components/Articles/client/PendingRewriteMessage";
import { ArticleActionBtns } from "@/components/Articles/client/ArticleActionBtns";
import { SelectArticleType } from "@/components/Articles/client/SelectArticleType";
import { ArticleContainer } from "@/components/Articles/client/ArticleContainer";
import { ArticleMetaData } from "@/components/Articles/client/ArticleMetaData";
import { ArticleHeader } from "@/components/Articles/client/ArticleHeader";

export const DisplayArticleSet = ({ SelectedGame }) => {
  const router = useRouter(); // Next.js router
  // Vars
  const GAME = SelectedGame[0].game_meta_datum;
  const ArticleSet = GAME.gtp_3_reports;
  // state
  const [version, setVersion] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isPending, SetIsPending] = useState(null);
  // hooks
  const [rewriteStatus, requestRewrite] = useRewrite();
  const startPolling = usePollRewrite(ArticleSet[version]?.id, isPending);
  // Func
  const RequestRewrite = () => {
    SetIsPending(true);
    requestRewrite(ArticleSet[version].id);
  };
  // Update the state with the new article once it's ready
  useEffect(() => {
    if (startPolling !== null && isPending) {
      router.refresh(); // Refresh the page to reflect the new data
    }
  }, [startPolling]);

  useEffect(() => {
    console.log("router.refresh() TEST, does this run when it does?");
    SetIsPending(false);
  }, [ArticleSet]);

  if (isPending) {
    return <PendingRewrite />;
  }
  if (ArticleSet.length === 0) return <NoArticlesMessage />;
  return (
    <>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={9}>
          <ArticleHeader GAME={GAME} />

          <ArticleActionBtns
            setCopied={setCopied}
            copied={copied}
            article={ArticleSet[version].article}
            articleID={ArticleSet[version].id}
            requestRewrite={() => RequestRewrite()}
            rewriteStatus={rewriteStatus}
            rewriteCount={ArticleSet[version].rewriteCount}
          />

          <ArticleContainer article={ArticleSet[version].article} />
          <ArticleMetaData GAME={GAME} />
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={3}>
          <SelectArticleType
            setVersion={setVersion}
            version={version}
            ArticleSet={ArticleSet}
          />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </>
  );
};
