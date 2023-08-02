import { ActionIcon, Container, Group, Tooltip } from "@mantine/core";
import {
  IconCircleCheck,
  IconCopy,
  IconPlus,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
export const ArticleActionBtns = ({
  setCopied,
  copied,
  article,

  requestRewrite,
  rewriteCount,
  setIsAddingContext,
  isAddingContext,
}) => {
  const ReWrites = 3;
  return (
    <Container className=" p-1 my-2">
      <Group position="right">
        <Tooltip label="Add Additional Context">
          <ActionIcon
            size="xl" 
            radius="md"
            variant="outline"
            onClick={() => setIsAddingContext(!isAddingContext)}
            disabled={ReWrites === rewriteCount}
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
            {isAddingContext ? (
              <IconX size="1.125rem" />
            ) : (
              <IconPlus size="1.125rem" />
            )}
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label={`Request a Rewrite (${ReWrites - rewriteCount} Remaining)`}
        >
          <ActionIcon
            size="xl"
            radius="md"
            variant="outline"
            onClick={requestRewrite}
            disabled={ReWrites === rewriteCount}
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

        <CopyToClipboard text={article || ""} onCopy={() => setCopied(true)}>
          <Tooltip label={`Copy Article Text`}>
            <ActionIcon
              size="xl"
              radius="md"
              variant="outline"
           
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
        </CopyToClipboard>
      </Group>
    </Container>
  );
};