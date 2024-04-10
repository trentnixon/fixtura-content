import {
  Button,
  Center,
  Group,
  Image,
  Paper,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { useStyles } from "./styles";
import { P } from "@/components/Type/Paragraph";
import { BUTTON_LINK } from "@/components/UI/buttons";
import { useMediaQuery } from "@mantine/hooks";
import { AccountSettings } from "@/context/ContextAccountSettings";
import { useContext } from "react";

const ICON_SIZE = rem(60);
// Main component function
export const DashBoardGalleryItems = ({ DATA, assetGrouping }) => {
  const AccountContext = useContext(AccountSettings);

  const { stats } = AccountContext;
  //console.log("AccountContext ", AccountContext);
  const { URLParams, account } = AccountContext;
  const { Count } = stats;
  const { id, render } = URLParams;
  const { accountLogo, sport } = account;
  //const { assetGrouping, accountBasic, params, sport } = AccountContext;
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const CardWidth = "100%";

  return (
    <Paper
      radius="md"
      withBorder
      shadow="sm"
      className={classes.card}
      mt={`calc(${ICON_SIZE} / 3)`}
      w={CardWidth}
    >
      <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
        <Image src={accountLogo} radius={ICON_SIZE} />
      </ThemeIcon>

      <P ta="center" fw={700} className={classes.title}>
        {DATA}
      </P>
      <P c="dimmed" ta="center" fz="sm" my={10}>
        {DATA} Assets: {Count.assetGrouping[DATA]}
      </P>

      <Group position="center">
        <BUTTON_LINK
          href={`/${id}/${sport}/${render}/${encodeURIComponent(
            DATA
          )}/a/results`}
          Label="Review"
          size={"sm"}
          Color={"blue"}
          variant="default"
        />
        {/* <BUTTON_LINK
          size={"sm"}
          href={`/${id}/${Sport}/${render}/${encodeURIComponent(DATA)}/u/v`}
          Label="Upcoming"
          Color={"green"}
        /> */}
      </Group>
    </Paper>
  );
};

{
  /*  <Group position="apart" mt="xs">
        <Text fz="sm" color="dimmed">
          Image
        </Text>
        <Text fz="sm" color="dimmed">
        here
        </Text>
      </Group> */
}

{
  /* <Progress value={(stats.mediaItems / 15) * 100} mt={5} color="cyan.5" /> */
}

{
  /*  <Group position="apart" mt="md">
        <Text fz="sm">here</Text>
      </Group> */
}

{
  /*  <Group position="right" mt="md">
        <BTN_TOINTERALLINK LABEL={"Upload"} URL={"members/gallery/"} />
      </Group> */
}
