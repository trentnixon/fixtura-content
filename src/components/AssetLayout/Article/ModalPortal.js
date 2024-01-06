import { Modal, Button, Portal, useMantineTheme, Center } from "@mantine/core";

import { P } from "@/components/Type/Paragraph";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaGroup } from "@/components/containers/Group";

export const ModalPortal = ({
  isModalOpen,
  setIsModalOpen,
  requestRewrite,
  rewriteCount,
}) => {
  const ReWrites = 3;
  const theme = useMantineTheme();

  return (
    <Portal>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        title={`Confirm Article Rewrite`}
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
              ? `You are about to request a rewrite for the article. Don't worry, you still have ${
                  ReWrites - rewriteCount
                } rewrite requests left. Are you sure you want to proceed?`
              : `This is your last rewrite request available for the  article.`}
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
