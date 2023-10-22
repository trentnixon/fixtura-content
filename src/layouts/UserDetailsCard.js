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
import { IconArticle, IconPhotoAi, IconVideo } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function UserDetailsCard(props) {
  const { accountBasic } = props;
  const theme = useMantineTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [showButtonGroup, setShowButtonGroup] = useState(false);
  const [isResults, setIsResults] = useState(false); // Switch state

  useEffect(() => {
    const showButtons = pathname.includes("/r") || pathname.includes("/u");
    setShowButtonGroup(showButtons);
    setIsResults(pathname.includes("/r"));
  }, [pathname]);

  const handleButtonClick = (extension) => {
    const baseUrlMatch = pathname.match(/(.*\/[ru])\/?.*/);
    if (baseUrlMatch) {
      const baseUrl = baseUrlMatch[1];
      const newPath = `${baseUrl}/${extension}`;
      router.push(newPath);
    }
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
        <Text ta="center" fz="sm" c="dimmed">
          {FindAccountType(accountBasic)}
        </Text>
        {showButtonGroup && (
          <>
            <AssetTypeButtonGroup />

            <RenderButtonGroup onButtonClick={handleButtonClick} />
          </>
        )}
      </Card>
    </Container>
  );
}

const RenderButtonGroup = ({ onButtonClick }) => {
  const pathname = usePathname();  // Get the current pathname
  return (
    <Card.Section>
      <Button.Group orientation="vertical" my={10} mx={20}>
        <BUTTON_FUNC
          Icon={<IconVideo />}
          Label={`Videos`}
          onClick={() => onButtonClick("v")}
          variant={pathname.includes("/v") ? "outline":"light"}
          Color={pathname.includes("/v") ? "green" : "gray.4"}
        />
        <BUTTON_FUNC
          Icon={<IconPhotoAi />}
          Label={`Images`}
          onClick={() => onButtonClick("i")}
          variant={pathname.includes("/i") ? "outline":"light"}
          Color={pathname.includes("/i") ? "green" : "gray.4"}
        />
        <BUTTON_FUNC
          Icon={<IconArticle />}
          Label={`Write Ups`}
          onClick={() => onButtonClick("w")}
          variant={pathname.includes("/w") ? "outline":"light"}
          Color={pathname.includes("/w") ? "green" : "gray.4"}
        />
      </Button.Group>
    </Card.Section>
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
            onClick={() => handleButtonClick("r")}
            variant={pathname.includes("/r") ?  "outline":"light" }
            Color={pathname.includes("/r") ? "green" : "gray.4"}
            
          />
          <BUTTON_FUNC
           
            size={"sm"}
            Icon={<IconArticle />}
            Label={`Upcoming`}
            onClick={() => handleButtonClick("u")}
            variant={pathname.includes("/u") ? "outline":"light"}
            Color={pathname.includes("/u") ? "green" : "gray.4"}
          />
        </Button.Group>
      </Card.Section>
    </Center>
  );
}
