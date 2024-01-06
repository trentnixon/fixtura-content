"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  FindAccountLabel,
  FindAccountLogo,
  FindAccountType,
} from "@/utils/actions";
import {
  Card,
  Avatar,
  Text,
  useMantineTheme,
  Container,
  Button,
  Switch,
  Center,
} from "@mantine/core";
import { BUTTON_FUNC } from "@/components/UI/buttons";
import {
  IconArticle,
  IconCalendarEvent,
  IconCricket,
  IconHome2,
  IconLadder,
  IconListDetails,
  IconListNumbers,
  IconScoreboard,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function UserDetailsCard(props) {
  const { OBJ } = props;
  const { accountBasic, URLParams, Sport } = OBJ;
  console.log(FindAccountType(accountBasic));
  const theme = useMantineTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [showButtonGroup, setShowButtonGroup] = useState(false);
  const [isResults, setIsResults] = useState(false); // Switch state

  useEffect(() => {
    const showButtons = pathname.includes("/a") || pathname.includes("/u");
    setShowButtonGroup(showButtons);
    setIsResults(pathname.includes("/r"));
  }, [pathname]);

  const handleButtonClick = (extension) => {
    /* console.log("URLParams ", URLParams, Sport); */
    const newPath = `/${URLParams.id}/${Sport}/${URLParams.render}/${URLParams.key}/a/${extension}`;
    router.push(newPath);
  };

  return (
    <Container fluid mx={0} p={0}>
      <Card withBorder padding="xl" radius="md" mt={30}>
        <Card.Section
          sx={{
            background: theme.fn.linearGradient(
              45,
              accountBasic.attributes.theme.data.attributes.Theme.primary,
              accountBasic.attributes.theme.data.attributes.Theme.secondary
            ),
            height: 70,
            "@media (max-width: 768px)": {
              height: 30,
            },
          }}
        />

        <Avatar
          src={FindAccountLogo(accountBasic)}
          size={100}
          radius={100}
          mx="auto"
          mt={-30}
        />
        <Text ta="center" fz="lg" fw={500} mt="sm">
          {FindAccountLabel(accountBasic)}
        </Text>

        {/*  <Text ta="center" fz="sm" c="dimmed">
          {FindAccountType(accountBasic)}
        </Text> */}
        {showButtonGroup && (
          <>
            {/* <AssetTypeButtonGroup /> */}

            <RenderButtonGroup
              onButtonClick={handleButtonClick}
              AccountType={FindAccountType(accountBasic)}
            />
            <ReturnHomeBTN />
          </>
        )}
      </Card>
    </Container>
  );
}

const RenderButtonGroup = ({ onButtonClick, AccountType }) => {
  const pathname = usePathname(); // Get the current pathname
  /*console.log(pathname); */
  const NavColors = ["green", "gray.6"];
  const variantState = ["outline", "light"];
  return (
    <Card.Section>
      <Button.Group orientation="vertical" my={10} mx={20}>
        <BUTTON_FUNC
          Icon={<IconCalendarEvent />}
          Label={`Upcoming Fixtures`}
          onClick={() => onButtonClick("upcoming")}
          variant={
            pathname.includes("/upcoming") ? variantState[0] : variantState[1]
          }
          Color={pathname.includes("/upcoming") ? NavColors[0] : "gray.6"}
        />
        {AccountType === "Club" ? (
          <BUTTON_FUNC
            Icon={<IconListDetails />}
            Label={`Team Rosters`}
            onClick={() => onButtonClick("teamroster")}
            variant={
              pathname.includes("/teamroster")
                ? variantState[0]
                : variantState[1]
            }
            Color={pathname.includes("/teamroster") ? NavColors[0] : "gray.6"}
          />
        ) : (
          false
        )}
      </Button.Group>
      <Button.Group orientation="vertical" mt={40} mb={20} mx={20}>
        <BUTTON_FUNC
          Icon={<IconScoreboard />}
          Label={`Weekend Results`}
          onClick={() => onButtonClick("results")}
          variant={
            pathname.includes("/results") ? variantState[0] : variantState[1]
          }
          Color={pathname.includes("/results") ? NavColors[0] : NavColors[1]}
        />
        <BUTTON_FUNC
          Icon={<IconListNumbers />}
          Label={`Fixtures`}
          onClick={() => onButtonClick("fixtures")}
          variant={
            pathname.includes("/fixtures") ? variantState[0] : variantState[1]
          }
          Color={pathname.includes("/fixtures") ? NavColors[0] : NavColors[1]}
        />

        <BUTTON_FUNC
          Icon={<IconCricket />}
          Label={`Top 5 Batting`}
          onClick={() => onButtonClick("top5batting")}
          variant={
            pathname.includes("/top5batting")
              ? variantState[0]
              : variantState[1]
          }
          Color={
            pathname.includes("/top5batting") ? NavColors[0] : NavColors[1]
          }
        />
        <BUTTON_FUNC
          Icon={<IconCricket />}
          Label={`Top 5 Bowling`}
          onClick={() => onButtonClick("top5bowling")}
          variant={
            pathname.includes("/top5bowling")
              ? variantState[0]
              : variantState[1]
          }
          Color={
            pathname.includes("/top5bowling") ? NavColors[0] : NavColors[1]
          }
        />
        <BUTTON_FUNC
          Icon={<IconUsersGroup />}
          Label={`Team of the Week`}
          onClick={() => onButtonClick("teamoftheweek")}
          variant={
            pathname.includes("/teamoftheweek")
              ? variantState[0]
              : variantState[1]
          }
          Color={
            pathname.includes("/teamoftheweek") ? NavColors[0] : NavColors[1]
          }
        />
        <BUTTON_FUNC
          Icon={<IconLadder />}
          Label={`Ladder`}
          onClick={() => onButtonClick("ladder")}
          variant={
            pathname.includes("/ladder") ? variantState[0] : variantState[1]
          }
          Color={pathname.includes("/ladder") ? NavColors[0] : NavColors[1]}
        />
      </Button.Group>
      {/*  <Button.Group orientation="vertical" my={10} mx={20}>
        <BUTTON_FUNC
          Icon={<IconVideo />}
          Label={`Videos`}
          onClick={() => onButtonClick("v")}
          variant={pathname.includes("/v") ? variantState[0] : variantState[1]}
          Color={pathname.includes("/v") ? NavColors[0] : NavColors[1]}
        />
        <BUTTON_FUNC
          Icon={<IconPhotoAi />}
          Label={`Images`}
          onClick={() => onButtonClick("i")}
          variant={pathname.includes("/i") ? variantState[0] : variantState[1]}
          Color={pathname.includes("/i") ? NavColors[0] : NavColors[1]}
        />
        <BUTTON_FUNC
          Icon={<IconArticle />}
          Label={`Write Ups`}
          onClick={() => onButtonClick("w")}
          variant={pathname.includes("/w") ? variantState[0] : variantState[1]}
          Color={pathname.includes("/w") ? NavColors[0] : NavColors[1]}
        />
      </Button.Group> */}
    </Card.Section>
  );
};

const ReturnHomeBTN = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleReturnToRender = () => {
    const baseUrlSegments = pathname.split("/").filter(Boolean); // Split and remove any empty strings
    const newPath = `/${baseUrlSegments.slice(0, 3).join("/")}`; // Take first two segments and join them

    /* console.log("New Path", newPath); */

    // Navigate to newPath
    setTimeout(() => {
      router.push(newPath);
    }, 500);
  };

  return (
    <Center>
      <Card.Section>
        <BUTTON_FUNC
          size={"sm"}
          Icon={<IconHome2 />}
          Label={`Back to List`}
          Color={"gray.8"}
          onClick={() => handleReturnToRender("")}
          variant={"default"}
        />
      </Card.Section>
    </Center>
  );
};

function AssetTypeButtonGroup() {
  const router = useRouter();
  const pathname = usePathname();
  const [isResults, setIsResults] = useState(pathname.includes("/r"));

  const handleButtonClick = (type) => {
    const baseUrl = pathname.replace(/\/[ru]\/?.*/, "");
    const newPath = `${baseUrl}/${type}`;
    setTimeout(() => {
      router.push(newPath);
    }, 500);
  };

  useEffect(() => {
    setIsResults(pathname.includes("/r"));
  }, [pathname]);

  return (
    <Center>
      <Card.Section>
        <Button.Group my={10} mx={20}>
          <BUTTON_FUNC
            size={"sm"}
            Icon={<IconArticle />}
            Label={`Results`}
            onClick={() => handleButtonClick("r/v")}
            variant={pathname.includes("/r") ? "outline" : "light"}
            Color={pathname.includes("/r") ? "green" : "gray.4"}
          />
          <BUTTON_FUNC
            size={"sm"}
            Icon={<IconArticle />}
            Label={`Upcoming`}
            onClick={() => handleButtonClick("u/v")}
            variant={pathname.includes("/u") ? "outline" : "light"}
            Color={pathname.includes("/u") ? "green" : "gray.4"}
          />
        </Button.Group>
      </Card.Section>
    </Center>
  );
}
