import { Button, Container, Group } from "@mantine/core";
import { IconCircleCheck, IconCopy, IconPlus, IconRefresh } from "@tabler/icons-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
export const ArticleActionBtns = ({
    setCopied,
    copied,
    article,
    rewriteStatus,
    requestRewrite,
    rewriteCount,
  }) => {
    const ReWrites = 3;
    return (
      <Container className=" p-1 my-2">
        <Group position="right">
          <Button
            leftIcon={<IconPlus />}
            variant="default"
            radius="md"
            size="md"
            disabled={ReWrites === rewriteCount}
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
            Add Context
          </Button>
  
          <Button
            leftIcon={<IconRefresh />}
            variant="default"
            radius="md"
            size="md"
            onClick={requestRewrite}
            disabled={ReWrites === rewriteCount}
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
            {rewriteStatus === "pending"
              ? "Rewriting..."
              : `Rewrite (${ReWrites - rewriteCount})`}
          </Button>
  
          <CopyToClipboard text={article || ""} onCopy={() => setCopied(true)}>
            <Button
              leftIcon={copied ? <IconCircleCheck /> : <IconCopy />}
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
              {copied ? "Copied" : "Copy"}
            </Button>
          </CopyToClipboard>
        </Group>
      </Container>
    );
  };