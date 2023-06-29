"use client";
import Link from "next/link";
import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconHome2 } from "@tabler/icons-react";
import Image from "next/image";

const HEADER_HEIGHT = rem(60);

const LINKS = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/Fixtura",
    label: "Fixtura",
  },
];

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

export function HeaderMantine({ params }) {
  const { id } = params;
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />

          <Image
            src="/images/LogoF.png"
            alt="Fixtura"
            width={35}
            height={12}
            priority
          />
        </Group>
        <Group spacing={5} className={classes.links}>
          <Tooltip
            label={"Home"}
            position="bottom"
            transitionProps={{ duration: 0 }}
          >
            <UnstyledButton>
              <Link href={`/${id}`}>
                <IconHome2 size="1.2rem" stroke={1.5} />
              </Link>
            </UnstyledButton>
          </Tooltip>
        </Group>
      </Container>
    </Header>
  );
}
