import { P, S } from "@/components/Type/Paragraph";
import { FixturaPaper } from "@/components/containers/paper";
import { Button, Space, rem } from "@mantine/core";

export function SelectArticleType({ setVersion, version, ArticleSet }) {
  return (
    <>
      <P fz={'xs'} ta='right' fw={900}>Select Type</P>
      <Button.Group orientation="vertical">
        {ArticleSet.map((type, i) => {
          return (
            <Button
              key={i}
              variant="default"
              styles={(theme) => ({
                root: {
                  background:
                    version === i
                      ? `${theme.fn.linearGradient(
                          45,
                          theme.colors.blue[5],
                          theme.colors.cyan[5]
                        )} !important`
                      : `transparent`,
                  color:
                    version === i
                      ? `${theme.colors.gray[2]} `
                      : `${theme.colors.gray[6]}`,
                  height: rem(42),
                  paddingLeft: rem(20),
                  paddingRight: rem(20),
                  "&:hover": {
                    backgroundColor: theme.colors.gray[9],
                    color: theme.colors.gray[3],
                  },
                  leftIcon: {
                    marginRight: theme.spacing.md,
                  },
                  // Apply a different background color if this category is the selected one
                },
              })}
              onClick={() => {
                setVersion(i);
              }}
            >
              {type.asset.ArticleFormats}
            </Button>
          );
        })}
      </Button.Group>
      <FixturaPaper my={10}>
        <S fz={"xs"}>{ArticleSet[version].asset.description}</S>
      </FixturaPaper>
    </>
  );
}
