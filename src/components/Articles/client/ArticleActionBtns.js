import { Button, Container, Group } from "@mantine/core";
import {
  IconCircleCheck,
  IconCopy,
  IconPlus,
  IconRefresh,
} from "@tabler/icons-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
export const ArticleActionBtns = ({
  setCopied,
  copied,
  article,
  rewriteStatus,
  requestRewrite,
  rewriteCount,
  setIsAddingContext,
  isAddingContext,
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
          onClick={() => setIsAddingContext(!isAddingContext)}
          sx={(theme) => ({
            borderRadius: theme.radius.md,
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
          {isAddingContext ? "close" : "Add Context"}
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
            borderColor: theme.colors.red[4],
            color: theme.colors.red[4],
            cursor: "pointer",
            "&:hover": {
              background: theme.fn.linearGradient(
                45,
                theme.colors.red[5],
                theme.colors.cyan[5]
              ),
              color: theme.colors.gray[0],
              borderColor: theme.colors.blue[6],
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
              borderColor: theme.colors.violet[4],
              color: theme.colors.violet[4],
              cursor: "pointer",
              "&:hover": {
                background: theme.fn.linearGradient(
                  45,
                  theme.colors.violet[5],
                  theme.colors.cyan[5]
                ),
                color: theme.colors.gray[0],
                borderColor: theme.colors.blue[6],
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
