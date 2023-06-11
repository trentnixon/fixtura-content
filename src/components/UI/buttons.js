import { Button, Badge, Box, NavLink, useMantineTheme } from "@mantine/core";

import {
  IconHome2,
  IconGauge,
  IconChevronRight,
  IconActivity,
  IconCircleOff,
} from "@tabler/icons-react";
import Link from "next/link";

export const BUTTON_FUNC = (props) => {
  const {
    Label = "",
    Color = "cyan",
    size = "md",
    variant = "outline",
    onClick = () => {
      console.log("Assign a Func to this Button");
    },
    Icon = false,
  } = props;

  return (
    <Button
      variant={variant}
      Icon={Icon}
      color={Color}
      size={size}
      onClick={onClick}
      uppercase
    >
      {Label}
    </Button>
  );
};

export const BUTTON_LINK = (props) => {
  const {
    href='',
    Label = "",
    Color = "cyan",
    size = "md",
    variant = "outline",
    onClick = () => {
      console.log("Assign a Func to this Button");
    },
    Icon = false,
  } = props;

  return (
    <Link
      href={href}
      passHref
    >
      <Button
        variant={variant}
        Icon={Icon}
        color={Color}
        size={size}
        onClick={onClick}
        uppercase
      >
        {Label}
      </Button>
    </Link>
  );
};

export const NavLinkWithIcon = (props) => {
  const theme = useMantineTheme()
  const {
    label = "",
    active=false,
    description = "",
    Icon = "",
    onClick = () => {
      console.log("Add a Func");
    },
  } = props;
  return (
    <NavLink
      active={active}
      label={label}
      description={description}
      icon={Icon}
      rightSection={<IconChevronRight size="0.8rem" stroke={1.5} color={theme.colors.blue[9]} />}
      onClick={onClick}
      color={theme.colors.blue[9]}
    />
  );
};
