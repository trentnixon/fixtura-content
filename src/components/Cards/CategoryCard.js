"use client";
import { IconEye, IconMessageCircle } from "@tabler/icons-react";
import {
  Card,
  Text,
  Group,
  Center,
  createStyles,
  getStylesRef,
  rem,
} from "@mantine/core";
import { H } from "@/components/Type/Headers";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    height: rem(280),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    [`&:hover .${getStylesRef("image")}`]: {
      transform: "scale(1.2)",
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef("image"),
    backgroundSize: "cover",
    transition: "transform 500ms ease",
  },

  overlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
  },

  content: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1,
  },

  title: {
    color: theme.white,
    marginBottom: rem(5),
  },

  bodyText: {
    color: theme.colors.dark[2],
    marginLeft: rem(7),
  },

  author: {
    color: theme.colors.dark[2],
  },
}));

export function CategoryCard(props) {
  const { OBJ, Category, color, c, Link, icon, IMG } = props;
  const { classes, theme } = useStyles();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      href={Link}
    >
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${IMG})` }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <H color="gray.1" size="h3">
            {Category}
          </H>
        </div>
      </div>
    </Card>
  );
}
