"use client";

import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { createStyles } from "@mantine/core";
import { BUTTON_LINK } from "@/components/UI/buttons";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",

    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },
  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,
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
    width: rem(376),
    height: rem(356),
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

export function UserFeedback() {
  const { classes } = useStyles();

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Error</span> and{" "}
            <span className={classes.highlight}>Issue</span> Reporting
          </Title>
          <Text c="dimmed" mt="md">
            We would greatly appreciate it if you could take a moment to message
            us on our Facebook channel with any issues or feedback you might
            have. We are committed to refining and enhancing our product, and
            your valuable insights play a pivotal role in ensuring we offer the
            best possible experience for your organization. Your feedback truly
            matters to us.
          </Text>

          <Group mt={30}>
            <BUTTON_LINK
              Label="Message Fixtura"
              href="https://www.facebook.com/profile.php?id=100095406210560"
            />
          </Group>
        </div>
        <Image className={classes.image} alt={'Message Us on Facebook'}  src="https://fixtura.s3.ap-southeast-2.amazonaws.com/voiceicon_d9c979445c.png" />
      </div>
    </Container>
  );
}
