// Import React, Next.js, and Mantine UI components
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Card, useMantineTheme, Container } from "@mantine/core";
// Import utility functions and components
import { AccountDetails } from "@/layouts/Navigation/components/UserDetails";
import { RenderButtonGroup } from "@/layouts/Navigation/components/RenderButtonGroup";

// UserDetailsCard Component
export function AccountAssetTypeNavigation({ OBJ }) {
  const { accountBasic, URLParams, Sport } = OBJ ?? {};

  if (!accountBasic) {
    console.error("[AccountAssetTypeNavigation] accountBasic is null");
    return null;
  }

  const theme = useMantineTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [showButtonGroup, setShowButtonGroup] = useState(false);

  useEffect(() => {
    if (pathname == null) {
      console.error(
        "[AccountAssetTypeNavigation] pathname is null"
      );
      return;
    }
    setShowButtonGroup(pathname.includes("/a/"));
  }, [pathname]);

  const handleButtonClick = (extension) => {
    if (URLParams == null || Sport == null || extension == null) {
      console.error(
        "[AccountAssetTypeNavigation] handleButtonClick arguments are null"
      );
      return;
    }

    const newPath = `/${URLParams.id}/${Sport}/${URLParams.render}/${URLParams.key}/a/${extension}`;

    if (router == null) {
      console.error(
        "[AccountAssetTypeNavigation] router is null"
      );
      return;
    }

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
            height: 50,
            "@media (max-width: 768px)": { height: 30 },
          }}
        />
        <AccountDetails accountBasic={accountBasic} />
        {showButtonGroup && (
          <RenderButtonGroup
            onButtonClick={handleButtonClick}
            accountBasic={accountBasic}
          />
        )}
      </Card>
    </Container>
  );
}
