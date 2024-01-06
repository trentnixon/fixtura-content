"use client";

import { Image, Container, Title, Group, Text, rem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { createStyles } from "@mantine/core";
import { BUTTON_LINK } from "@/components/UI/buttons";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: `calc(${theme.spacing.sm})`,
  },
  content: {
    maxWidth: rem(480),
    marginLeft: `calc(${theme.spacing.xl} * 3)`,
    "@media (max-width: 960px)": {
      maxWidth: "100%",
      marginRight: 0,
    },
  },
  title: {
    color: theme.colors.white,
    fontFamily: "Greycliff CF, var(--mantine-font-family)",
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,
    "@media (max-width: 480px)": {
      fontSize: rem(28),
    },
  },
  control: {
    "@media (max-width: 480px)": {
      flex: 1,
    },
  },
  image: {
    width: rem(350),
    height: rem(350),
    "@media (max-width: 960px)": {
      display: "none",
    },
  },
  highlight: {
    position: "relative",
    backgroundColor: theme.colors.blue[1],
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export function CNSWTemplateNewLayout() {
  const { classes } = useStyles();

  return (
    <Container size="md" mt={15}>
      <div className={classes.inner}>
      <Image
          className={classes.image}
          alt={"New Template"}
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/CNSWIMG_Sq_0f5d86da52.png"
        />
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>CNSW</span> Released
          </Title>
          <Text c="dimmed" mt="md">
            Drawing inspiration from the CNSW digital account, the CNSW template
            introduces stylish animations and a selection of trendy background
            options
          </Text>

          <Group mt={30}>
            <BUTTON_LINK
               href="https://www.fixtura.com.au/members/customizer/"
               Label="Preview Template"
            />
          </Group>
        </div>
        
      </div>
    </Container>
  );
}
