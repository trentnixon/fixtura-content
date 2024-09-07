"use client";

import { useRewrite } from "@/Hooks/useRewrite";
import { ModalPortal } from "@/components/AssetLayout/Article/ModalPortal";
import { ActionIcon, Container, Group, Tooltip } from "@mantine/core";
import {
  IconCircleCheck,
  IconCopy,
  IconPlus,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

export const ArticleActionButtonsContainer = (props) => {
  return (
    <Group position="right" my={5} py={5}>
      <BTN_Copy_Article_Content copyID={props.copyID} />
      {/*  <BTN_Article_Rewrite
          Article={props.ArticleBOJ}
          setLoadingState={props.setLoadingState}
          setArticleRewrite={props.setArticleRewrite}
        /> */}
    </Group>
  );
};

// Buttons
const BTN_Article_Rewrite = ({
  Article,
  setLoadingState,
  setArticleRewrite,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [rewriteCount, setRewriteCount] = useState(
    Article.attributes.rewriteCount || 0
  );
  const isDisabled = rewriteCount >= 3;
  const ReWrites = 3;

  const [rewriteStatus, requestRewrite, resetRewriteStatus] = useRewrite();
  const label = `Request a Rewrite (${ReWrites - rewriteCount} Remaining)`;

  const RequestRewrite = () => {
    setIsPending(true);
    setLoadingState(true);
    requestRewrite(Article.id);
  };

  useEffect(() => {
    if (rewriteStatus?.success || rewriteStatus?.error) {
      setIsPending(false);
      setLoadingState(false);
      /* console.log(rewriteStatus); */
      setArticleRewrite(rewriteStatus.RequestResponse.article);
      setRewriteCount(rewriteStatus.RequestResponse.rewriteCount);
      resetRewriteStatus();
    }
  }, [rewriteStatus]);

  if (isPending) return "Processing...";

  return (
    <>
      <Tooltip label={label}>
        <ActionIcon
          size="md"
          radius="sm"
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          disabled={isDisabled}
          sx={(theme) => ({
            borderColor: theme.colors.cyan[6],
            color: theme.colors.cyan[6],
            cursor: "pointer",
            "&:hover": {
              background: theme.fn.linearGradient(
                45,
                theme.colors.blue[5],
                theme.colors.cyan[5]
              ),
              color: theme.colors.gray[0],
              borderColor: theme.colors.blue[6],
            },
          })}
        >
          <IconRefresh size="1.125rem" />
        </ActionIcon>
      </Tooltip>
      <ModalPortal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        requestRewrite={RequestRewrite}
        rewriteCount={Article.attributes.rewriteCount}
        ArticleVersion={"ArticleVersion"}
      />
    </>
  );
};

export const BTN_Copy_Article_Content = ({ copyID }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const articleElement = document.getElementById(`${copyID}`);
    console.log("[articleElement]", articleElement);
    if (articleElement) {
      const articleTextToCopy = articleElement.innerText; // or articleElement.textContent for raw text
      navigator.clipboard
        .writeText(articleTextToCopy)
        .then(() => {
          setCopied(true);
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    }
  }, [copyID]);

  return (
    <>
      <Tooltip label={`Copy Article Text`}>
        <ActionIcon
          size="md"
          radius="sm"
          variant="outline"
          onClick={handleCopy}
          sx={(theme) => ({
            borderColor: theme.colors.cyan[6],
            color: theme.colors.cyan[6],
            cursor: "pointer",
            "&:hover": {
              background: theme.fn.linearGradient(
                45,
                theme.colors.blue[5],
                theme.colors.cyan[5]
              ),
              color: theme.colors.gray[0],
              borderColor: theme.colors.blue[6],
            },
          })}
        >
          {copied ? (
            <IconCircleCheck size="1.125rem" />
          ) : (
            <IconCopy size="1.125rem" />
          )}
        </ActionIcon>
      </Tooltip>
    </>
  );
};

/* const BTN_Copy_Article_Content = ({ Article }) => {
  const [copied, setCopied] = useState(false);
  //console.log(Article.attributes.EditorsArticle);

  const handleCopy = useCallback(() => {
    let articleTextToCopy = Article;
    navigator.clipboard
      .writeText(articleTextToCopy)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  }, [Article, setCopied]);

  return (
    <>
      <Tooltip label={`Copy Article Text`}>
        <ActionIcon
          size="md"
          radius="sm"
          variant="outline"
          onClick={handleCopy}
          sx={(theme) => ({
            borderColor: theme.colors.cyan[6],
            color: theme.colors.cyan[6],
            cursor: "pointer",
            "&:hover": {
              background: theme.fn.linearGradient(
                45,
                theme.colors.blue[5],
                theme.colors.cyan[5]
              ),
              color: theme.colors.gray[0],
              borderColor: theme.colors.blue[6],
            },
          })}
        >
          {copied ? (
            <IconCircleCheck size="1.125rem" />
          ) : (
            <IconCopy size="1.125rem" />
          )}
        </ActionIcon>
      </Tooltip>
    </>
  );
}; */
