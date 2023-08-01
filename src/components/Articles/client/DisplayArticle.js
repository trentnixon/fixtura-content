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
import { Button, Textarea } from "@mantine/core";
import { putGameContext } from "@/api/getGame";

export const DisplayArticleSet = ({ SelectedGame }) => {
  const router = useRouter(); // Next.js router
  // Vars
  const GAME = SelectedGame[0].game_meta_datum;
  const ArticleSet = GAME.gtp_3_reports;
  // state
  const [version, setVersion] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isPending, SetIsPending] = useState(null);
  const [isAddingContext, setIsAddingContext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gameContext, setGameContext] = useState(GAME.gameContext || "");
  const [needsRefresh, setNeedsRefresh] = useState(false);
  // hooks
  const [rewriteStatus, requestRewrite] = useRewrite();
  const startPolling = usePollRewrite(ArticleSet[version]?.id, isPending);
  // Func
  const RequestRewrite = () => {
    SetIsPending(true);
    requestRewrite(ArticleSet[version].id);
  };


  const handleSubmit = async (apply) => {
    setIsLoading(true);
    try {
      await putGameContext(GAME.id, gameContext);
      setIsAddingContext(false);
      if (apply) {
        SetIsPending(true);
        requestRewrite(ArticleSet[version].id);
      } else {
        setNeedsRefresh(true);
      }
    } catch (error) {
      console.error("Error updating the game context", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect
  useEffect(() => {
    setGameContext(GAME.gameContext || "");
    setIsAddingContext(false)
  }, [SelectedGame]);
  // Update the state with the new article once it's ready
  useEffect(() => {
    if (startPolling !== null && isPending) {
      router.refresh(); // Refresh the page to reflect the new data
    }
  }, [startPolling]);

  useEffect(() => {
    if (needsRefresh) {
      router.refresh();
      setNeedsRefresh(false);
    }
  }, [needsRefresh]);

  useEffect(() => {
    console.log("router.refresh() TEST, does this run when it does?");
    SetIsPending(false);
  }, [ArticleSet]);

  useEffect(() => {
    console.log("isAddingContext", isAddingContext);
    console.log("GAME", GAME.gameContext);
  }, [isAddingContext]);

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
            setIsAddingContext={setIsAddingContext}
            isAddingContext={isAddingContext}
          />
          {isAddingContext ? (
            <>
              <Textarea
                placeholder="Add game context to this Fixture"
                label="Add Context"
                autosize
                minRows={10}
                value={gameContext}
                onChange={(e) => setGameContext(e.target.value)}
              />
              <Button
                onClick={() => {
                  handleSubmit(false);
                }}
                disabled={isLoading}
                variant="default"
                radius="md"
                size="md"
                sx={(theme) => ({
                  borderRadius: theme.radius.md,
                  background: theme.colors.blue[6],
                  color: theme.colors.gray[6],
                  cursor: "pointer",
                  "&:hover": {
                    background: theme.fn.linearGradient(
                      45,
                      theme.colors.blue[5],
                      theme.colors.cyan[5]
                    ),
                    color: theme.colors.gray[0],
                  },
                })}
              >
                {isLoading ? "Submitting..." : "Save"}
              </Button>
              <Button
                onClick={() => {
                  handleSubmit(true);
                }}
                disabled={isLoading}
                variant="default"
                radius="md"
                size="md"
                sx={(theme) => ({
                  borderRadius: theme.radius.md,
                  background: theme.colors.blue[6],
                  color: theme.colors.gray[6],
                  cursor: "pointer",
                  "&:hover": {
                    background: theme.fn.linearGradient(
                      45,
                      theme.colors.blue[5],
                      theme.colors.cyan[5]
                    ),
                    color: theme.colors.gray[0],
                  },
                })}
              >
                {isLoading ? "Submitting..." : "Save and Apply"}
              </Button>
            </>
          ) : (
            <ArticleContainer article={ArticleSet[version].article} />
          )}

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
