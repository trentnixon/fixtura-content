import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { ICO_HEADER_ARTICLE } from "@/components/UI/Icons";
import { Box, Container, Loader, Space } from "@mantine/core";

export const PendingRewrite = () => {
    return (
      <Container
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        })}
      >
        <Box
          p="lg"
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
            borderRadius: theme.radius.sm,
            backgroundColor: theme.colors.gray[1],
            marginBottom: 3,
            "&:hover": {
              backgroundColor: theme.colors.gray[3],
            },
          })}
        >
          <ICO_HEADER_ARTICLE />
          <H>Article Rewrite in Progress</H>
          <Space h={15} />
          <Loader color="gray" size="xl" variant="dots" />
          <Space h={15} />
          <P ta="center">Your article is being rewritten.</P>
          <P ta="center">
            If the result is not what you expected, you can enhance it with
            additional context by using the "Add Context" button. This will allow
            you to provide further insights into the fixture that are not included
            in the scorecard, ensuring a more personalized and tailored article.
          </P>
        </Box>
      </Container>
    );
  };