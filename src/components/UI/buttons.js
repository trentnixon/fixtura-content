"use client";
import {
  ActionIcon,
  Button,
  NavLink,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";

import { IconChevronRight } from "@tabler/icons-react";
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
      leftIcon={Icon}
      color={Color}
      size={size}
      onClick={onClick}
      uppercase
      radius="md"
    >
      {Label}
    </Button>
  );
};

export const BUTTON_LINK = (props) => {
  const {
    href = "",
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
    <Link href={href} passHref>
      <Button
        variant={variant}
        icon={Icon}
      
        size={size}
        onClick={onClick}
        radius="md"
        uppercase
        sx={(theme) => ({
          borderColor: theme.colors[Color][6],
          color: theme.colors[Color][6],
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
        {Label}
      </Button>
    </Link>
  );
};

export const BUTTON_LINK_ICON = (props) => {
  const {
    href = "",
    label = "",
    c = "gray",
    size = "md",
    variant = "outline",
    onClick = () => {
      console.log("Assign a Func to this Button");
    },
    icon = false,
  } = props;

  return (
    <Link href={href} passHref>
      <Button
        variant={variant}
        color={c}
        size={size}
        onClick={onClick}
        uppercase
        radius="md"
        leftIcon={icon}
        sx={(theme) => ({
          borderColor: theme.colors.cyan[6],
          color: theme.colors.cyan[6],
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
        {label}
      </Button>
    </Link>
  );
};

export const NavLinkWithIcon = (props) => {
  const theme = useMantineTheme();
  const {
    label = "",
    active = false,
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
      variant="filled"
      rightSection={
        <IconChevronRight
          size="0.8rem"
          stroke={1.5}
          color={theme.colors.blue[9]}
        />
      }
      onClick={onClick}
      color={theme.colors.blue[9]}
    />
  );
};

export const BUTTON_ICON_FUNC = (props) => { 
  const {
 
    Color = "cyan",
    size = "xl",
    variant = "outline",
    onClick = () => {
      console.log("Assign a Func to this Button");
    },
    Icon = false,
    label = null,
    disabled = false,
  } = props;

  return (
    <Tooltip label={label}>
      <ActionIcon
        disabled={disabled}
        variant={variant}
        size={size}
        onClick={onClick}
        sx={(theme) => ({
          borderColor: theme.colors[Color][6],
          color: theme.colors[Color][6],
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
        {Icon}
      </ActionIcon>
    </Tooltip>
  );
};
