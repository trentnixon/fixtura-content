"use client";
import Link from "next/link";

import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  rem,
  Tooltip,
  UnstyledButton,
  Button,
  Col,
  Paper,
  Text,
  Modal,
  Portal,
  Stack,
  Center,
  useMantineTheme,
  Box,
  Badge,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendarDue,
  IconChartPie4,
  IconDownload,
  IconHome,
  IconHome2,
  IconScoreboard,
} from "@tabler/icons-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AccountSettings } from "@/context/ContextAccountSettings";
import { useContext } from "react";
const HEADER_HEIGHT = rem(60);

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

export function HeaderMantine(props) {
  const useAccountSettings = useContext(AccountSettings);
  //console.log("useAccountSettings ", useAccountSettings);
  const { sport, trial_instance, URLParams } = useAccountSettings;
  const { id } = URLParams;
  const { classes } = useStyles();
  const [opened, { close, toggle }] = useDisclosure(false);

  const theme = useMantineTheme();
  const closeDrawer = () => {
    close();
  };

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container
        className={classes.inner}
        fluid
        sx={(theme) => ({
          height: "60px",
          backgroundColor: theme.colors.gray[8],
        })}
      >
        <Group>
          {/* <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          /> */}

          <Image
            src="/images/LogoF.png"
            alt="F"
            width={35}
            height={12}
            priority
          />
          {trial_instance.isActive ? <Badge>Free Trial</Badge> : false}
        </Group>
        <Group spacing="xs" className={classes.links}>
          <Tooltip
            label={"Renders"}
            position="bottom"
            transitionProps={{ duration: 0 }}
          >
            <UnstyledButton>
              <Link href={`/${id}/${sport}`}>
                <IconDownload size="1.2rem" stroke={1.5} color="white" />
              </Link>
            </UnstyledButton>
          </Tooltip>
          <Tooltip
            label={"Home"}
            position="bottom"
            transitionProps={{ duration: 0 }}
          >
            <UnstyledButton>
              <Link href={`https://fixtura.com.au/`}>
                <IconHome2 size="1.2rem" stroke={1.5} color="white" />
              </Link>
            </UnstyledButton>
          </Tooltip>
        </Group>
      </Container>
      <Portal>
        <Modal
          title="Fixtura"
          opened={opened}
          onClose={close}
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
          <Center>
            <Image
              src="/images/LogoF.png"
              alt="Fixtura"
              width={35}
              height={12}
              priority
            />
          </Center>
          {URLParams.render === undefined ? (
            false
          ) : (
            <RenderMobileLinks params={URLParams} closeDrawer={closeDrawer} />
          )}

          <Group spacing="xs" className={classes.links}></Group>
          <Group position="apart" my={10}>
            <UnstyledButton onClick={closeDrawer}>
              <Link href={`/${id}`}>
                <IconDownload size="1.2rem" stroke={1.5} />
              </Link>
            </UnstyledButton>
            <UnstyledButton onClick={closeDrawer}>
              <Link href={`https://fixtura.com.au/`}>
                <IconHome2 size="1.2rem" stroke={1.5} />
              </Link>
            </UnstyledButton>
          </Group>
        </Modal>
      </Portal>
    </Header>
  );
}

const RenderBtns = ({ params }) => {
  const { id, render } = params;
  const pathname = usePathname();
  const CATEGORIES = [
    { value: "", title: "Overview", icon: <IconHome /> },
    { value: "r", title: "Results", icon: <IconScoreboard /> },
    { value: "u", title: "Upcoming", icon: <IconCalendarDue /> },
    { value: "o", title: "Statistics", icon: <IconChartPie4 /> },
  ];

  const renderLinks = CATEGORIES.map((item, i) => {
    const isActive = pathname === `/${id}/${render}/${item.value}`; // check if current path is equal to item's path

    //console.log("isActive ", pathname, `/${id}/${render}/${item.value}`);
    return (
      <Tooltip
        key={i}
        label={item.title}
        position="bottom"
        transitionProps={{ duration: 0 }}
      >
        <Button
          variant="subtle"
          styles={(theme) => ({
            root: {
              background: isActive
                ? `${theme.fn.linearGradient(
                    45,
                    theme.colors.blue[5],
                    theme.colors.cyan[5]
                  )} !important`
                : `transparent`,
              color: isActive
                ? `${theme.colors.gray[2]} `
                : `${theme.colors.gray[6]}`,

              "&:hover": {
                backgroundColor: theme.colors.gray[9],
                color: theme.colors.gray[3],
              },
            },
          })}
        >
          <Link
            href={`/${id}/${render}/${item.value}`}
            className={isActive ? "active" : ""}
          >
            {item.title}
          </Link>
        </Button>
      </Tooltip>
    );
  });

  return render ? renderLinks : null;
};

const RenderMobileLinks = ({ params, closeDrawer }) => {
  const { id, render } = params;
  const pathname = usePathname();
  const CATEGORIES = [
    { value: "", title: "Overview", icon: <IconHome /> },
    { value: "r", title: "Results", icon: <IconScoreboard /> },
    { value: "u", title: "Upcoming", icon: <IconCalendarDue /> },
    { value: "o", title: "Statistics", icon: <IconChartPie4 /> },
  ];

  const renderLinks = CATEGORIES.map((item, i) => {
    const isActive = pathname === `/${id}/${render}/${item.value}`; // check if current path is equal to item's path

    return (
      <Button
        key={i}
        variant="subtle"
        onClick={closeDrawer}
        styles={(theme) => ({
          root: {
            background: isActive
              ? `${theme.fn.linearGradient(
                  45,
                  theme.colors.blue[5],
                  theme.colors.cyan[5]
                )} !important`
              : `transparent`,
            color: isActive
              ? `${theme.colors.gray[2]} `
              : `${theme.colors.gray[6]}`,

            "&:hover": {
              backgroundColor: theme.colors.gray[9],
              color: theme.colors.gray[3],
            },

            // Apply a different background color if this category is the selected one
          },
        })}
      >
        <Link
          href={`/${id}/${render}/${item.value}`}
          className={isActive ? "active" : ""}
        >
          {item.title}
        </Link>
      </Button>
    );
  });

  return render ? <Stack>{renderLinks}</Stack> : null;
};
