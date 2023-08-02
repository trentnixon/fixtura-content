import React, { useState } from "react";
import {
  Button,
  Modal,
  Portal,
  Tooltip,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconArticleFilledFilled } from "@tabler/icons-react";
import { FixturaStack } from "@/components/containers/stack";

export const MobileSelectArticleType = ({ setVersion, ArticleSet }) => {
  const [modalOpened, setModalOpened] = useState(false);

  const theme = useMantineTheme();

  return (
    <>
      <div style={{ position: "fixed", right: 20, bottom: 20 }}>
        <Tooltip label="Add Additional Context">
          <ActionIcon
            size="xl"
            radius="md"
            onClick={() => setModalOpened(true)}
            sx={(theme) => ({
              borderColor: theme.colors.blue[6],
              color: theme.colors.blue[6],
            })}
          >
            <IconArticleFilledFilled size="2.125rem" />
          </ActionIcon>
        </Tooltip>
      </div>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Select Article Type"
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
        <FixturaStack>
          {ArticleSet.map((type, i) => (
            <Button
              key={i}
              variant="subtle"
              onClick={() => {
                setVersion(i);
                setModalOpened(false);
              }}
              styles={(theme) => ({
                root: {
                  background: `transparent`,
                  color: theme.colors.gray[6],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[9],
                    color: theme.colors.gray[3],
                  },
                },
              })}
            >
              {type.asset.ArticleFormats}
            </Button>
          ))}
        </FixturaStack>
      </Modal>
    </>
  );
};
