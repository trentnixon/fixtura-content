"use client";
import { useState } from "react";

import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconHome2,
  IconLogout,
  IconSwitchHorizontal,
  IconCricket,
  IconCalendarDue,
  IconScoreboard,
  IconChartPie4,
  IconQuestionMark,
} from "@tabler/icons-react";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.sm,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

function NavbarLink({
  icon: Icon,
  label,
  href,
  active,
  onClick,
  Account = "",
  Render = "",
}) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Link href={`${href}`}>
          <Icon size="1.2rem" stroke={1.5} color={active ? theme.colors.green[9]:theme.colors.orange[5]} />
        </Link>
      </UnstyledButton>
    </Tooltip>
  );
}

export function NavbarMinimal({ params, URLParams }) { 
  const { id, render } = URLParams;
  const [active, setActive] = useState(2);

  const SideNavItems = [
    { icon: IconHome2, label: "Home", href: `/${id}`, renderOnly: false },
    {
      icon: IconCricket,
      label: "Render",
      href: `/${id}/${render}`,
      renderOnly: true,
    },
    {
      icon: IconCalendarDue,
      label: "Upcoming",
      href: `${id}/${render}/u`,
      renderOnly: true,
    },
    {
      icon: IconScoreboard,
      label: "Results",
      href: `${id}/${render}/r`,
      renderOnly: true,
    },
    {
      icon: IconChartPie4,
      label: "Statistics",
      href: `${id}/${render}/o`,
      renderOnly: true,
    },
  ];

  const links = SideNavItems.map((link, index) => {
    //console.log("render ", render, link.renderOnly);
    if (render === undefined && link.renderOnly === true) {
      return null;
    } else {
      return (
        <NavbarLink
          {...link}
          Account={id}
          Render={render}
          key={link.label}
          active={index === active}
          onClick={() => setActive(index)}
        />
      );
    }
  });

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
       <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconQuestionMark}
            label="How To Use"
            href={`/${id}/howto`}
          />
          {/* <NavbarLink icon={IconLogout} label="Logout" href="/" /> */}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
