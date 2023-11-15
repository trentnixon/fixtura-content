import {
  ActionIcon,
  Container,
  Group,
  Tooltip,
  Modal,
  Button,
  Portal,
  useMantineTheme,
  Center,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconCopy,
  IconPlus,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useCallback, useState } from "react";
import { P } from "@/components/Type/Paragraph";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaGroup } from "@/components/containers/Group";
import {
  formatSponsorsInPlainText,
  separateArticleHeaderAndBody,
} from "@/utils/UI";
import { SelectArticleType } from "@/components/Articles/client/SelectArticleType";

export const ArticleActionBtns = ({
  setCopied,
  copied,
  article,
  requestRewrite,
  rewriteCount,
  setIsAddingContext,
  isAddingContext,
  ArticleVersion,
  hasSponsors,
  setVersion,
  version,
  ArticleSet,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { articleHeader, articleBody } = separateArticleHeaderAndBody(article);
  return (
    <Container p={0} m={0}>
      <Container className=" p-1 my-2">
        <Group position="apart">
          <SelectArticleType
            setVersion={setVersion}
            version={version}
            ArticleSet={ArticleSet}
          />
          <ArticleActionBtnGroup
            setCopied={setCopied}
            copied={copied}
            article={articleBody}
            requestRewrite={requestRewrite}
            rewriteCount={rewriteCount}
            setIsAddingContext={setIsAddingContext}
            isAddingContext={isAddingContext}
            setIsModalOpen={setIsModalOpen}
            ArticleVersion={ArticleVersion}
            hasSponsors={hasSponsors}
          />
        </Group>
      </Container>
      <ModalPortal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        requestRewrite={requestRewrite}
        rewriteCount={rewriteCount}
        ArticleVersion={ArticleVersion}
      />
    </Container>
  );
};

export const ArticleActionBtnGroup = ({
  setCopied,
  copied,
  article,
  rewriteCount,
  setIsAddingContext,
  isAddingContext,
  setIsModalOpen,
  ArticleVersion,
  hasSponsors,
}) => {
  const ReWrites = 3;
  // Manually handle copy operation
  const handleCopy = useCallback(() => {
    let articleTextToCopy = article;
    if (hasSponsors && ArticleVersion.asset.ArticleFormats !== "Quick Single") {
      const sponsorsPlainText = formatSponsorsInPlainText(hasSponsors);
      articleTextToCopy += sponsorsPlainText;
    }

    navigator.clipboard
      .writeText(articleTextToCopy)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  }, [article, setCopied, hasSponsors, ArticleVersion]);

  const buttonConfigs = [
    {
      label: "Add Additional Context",
      icon: isAddingContext ? "IconX" : "IconPlus",
      onClick: ({ setIsAddingContext, isAddingContext }) =>
        setIsAddingContext(!isAddingContext),
      disabled: ({ rewriteCount }) => ReWrites === rewriteCount,
      isCopy: false,
    },
    {
      label: `Request a Rewrite (${ReWrites - rewriteCount} Remaining)`,
      icon: "IconRefresh",
      onClick: ({ setIsModalOpen }) => setIsModalOpen(true),
      disabled: ({ rewriteCount }) => ReWrites === rewriteCount,
      isCopy: false,
    },
    {
      label: "Copy Article Text",
      icon: copied ? "IconCircleCheck" : "IconCopy",
      onClick: handleCopy, // attach the copy handler here
      disabled: () => false,
      isCopy: false, // this button is not a copy operation anymore
    },
  ];

  return (
    <Group position="right">
      {buttonConfigs.map((config, index) => {
        const ActionButtonComponent = (
          <ActionButton
            key={index}
            config={config}
            setCopied={setCopied}
            copied={copied}
            setIsAddingContext={setIsAddingContext}
            isAddingContext={isAddingContext}
            setIsModalOpen={setIsModalOpen}
            rewriteCount={rewriteCount}
          />
        );

        if (config.isCopy) {
          return (
            <CopyToClipboard text={article} key={index}>
              {ActionButtonComponent}
            </CopyToClipboard>
          );
        } else {
          return ActionButtonComponent;
        }
      })}
    </Group>
  );
};

const ActionButton = ({ config, ...props }) => {
  const iconComponents = {
    IconX,
    IconPlus,
    IconRefresh,
    IconCopy,
    IconCircleCheck,
  };
  const Icon = iconComponents[config.icon];

  const handleClick = (e) => {
    if (!config.isCopy) {
      e.preventDefault();
      config.onClick(props);
    }
  };

  return (
    <Tooltip label={config.label}>
      <ActionIcon
        size="xl"
        radius="md"
        variant="outline"
        onClick={handleClick}
        disabled={config.disabled(props)}
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
        <Icon size="1.125rem" />
      </ActionIcon>
    </Tooltip>
  );
};

const ModalPortal = ({
  isModalOpen,
  setIsModalOpen,
  requestRewrite,
  rewriteCount,
  ArticleVersion,
}) => {
  const ReWrites = 3;
  const theme = useMantineTheme();

  return (
    <Portal>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        title={`Confirm ${ArticleVersion.asset.ArticleFormats} Article Rewrite`}
        overflow="outside"
        transitionProps={{ transition: "skew-up" }}
        overlayProps={{
          color: theme.colors.gray[6],
          opacity: 0.55,
          blur: 3,
        }}
        styles={{
          title: {
            color: theme.colors.gray[0],
          },
          header: {
            backgroundColor: theme.colors.gray[9],
            padding: "7px 10px",
            marginBottom: "14px",
          },
          content: { backgroundColor: theme.colors.gray[1] },
        }}
      >
        <FixturaBox>
          <P ta="center">
            {ReWrites - rewriteCount > 1
              ? `You are about to request a rewrite for the ${
                  ArticleVersion.asset.ArticleFormats
                } article. Don't worry, you still have ${
                  ReWrites - rewriteCount
                } rewrite requests left. Are you sure you want to proceed?`
              : `This is your last rewrite request available for the ${ArticleVersion.asset.ArticleFormats} article.`}
          </P>
          <Center>
            <FixturaGroup>
              <Button
                mt={20}
                onClick={() => {
                  setIsModalOpen(false); // Close the modal
                  requestRewrite(); // Trigger the rewrite
                }}
                sx={(theme) => ({
                  borderRadius: theme.radius.md,
                  borderColor: theme.colors.blue[6],
                  color: theme.colors.blue[6],
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
                Confirm
              </Button>

              <Button
                mt={20}
                onClick={() => {
                  setIsModalOpen(false); // Close the modal
                }}
                sx={(theme) => ({
                  borderRadius: theme.radius.md,
                  borderColor: theme.colors.red[6],
                  color: theme.colors.red[6],
                  cursor: "pointer",
                  "&:hover": {
                    background: theme.fn.linearGradient(
                      45,
                      theme.colors.red[5],
                      theme.colors.orange[5]
                    ),
                    color: theme.colors.gray[0],
                    borderColor: theme.colors.blue[6],
                  },
                })}
              >
                Close
              </Button>
            </FixturaGroup>
          </Center>
        </FixturaBox>
      </Modal>
    </Portal>
  );
};
