"use client";
import { H } from "@/components/Type/Headers";
// APIS
import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: `linear-gradient(-60deg, ${theme.colors.blue[7]} 0%, ${theme.colors.blue[5]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    borderRadius: theme.radius.sm,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${rem(1)} solid ${theme.colors.gray[1]}`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colors.gray[1]}`,
      },
    },
  },
}));

export async function SelectedRenderStatsClient({ data }) {
  const { classes } = useStyles();
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <H color={"gray.1"}>{stat.stats}</H>
      <H size={"h3"} color={"gray.1"}>
        {stat.title}
      </H>
      <H size={"h5"} color={"gray.1"} weight={200}>
        {stat.description}
      </H>
    </div>
  ));

  return <div className={classes.root}>{stats}</div>;
}
