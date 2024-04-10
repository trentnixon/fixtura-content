// Import React, Next.js, and Mantine UI components
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Card, useMantineTheme, Container } from "@mantine/core";
// Import utility functions and components
import { AccountDetails } from "@/layouts/Navigation/components/UserDetails";
import { RenderButtonGroup } from "@/layouts/Navigation/components/RenderButtonGroup";
import { AccountSettings } from "@/context/ContextAccountSettings";

// UserDetailsCard Component
export function AccountAssetTypeNavigation() {
  const useAccountSettings = useContext(AccountSettings);
  const { account, URLParams } = useAccountSettings;
  const theme = useMantineTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [showButtonGroup, setShowButtonGroup] = useState(false);
  useEffect(() => {
    if (pathname == null) {
      console.error("[AccountAssetTypeNavigation] pathname is null");
      return;
    }
    setShowButtonGroup(pathname.includes("/a/"));
  }, [pathname]);

  if (!account) {
    console.error("[AccountAssetTypeNavigation] account is null");
    return null;
  }

  const handleButtonClick = (extension) => {
    console.log(URLParams.key)
    if (URLParams == null || account.sport == null || extension == null) {
      console.error(
        "[AccountAssetTypeNavigation] handleButtonClick arguments are null"
      );
      return;
    }

    const newPath = `/${URLParams.id}/${account.sport}/${URLParams.render}/${URLParams.key}/a/${extension}`;

    if (router == null) {
      console.error("[AccountAssetTypeNavigation] router is null");
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
              useAccountSettings.theme.primary,
              useAccountSettings.theme.secondary
            ),
            height: 50,
            "@media (max-width: 768px)": { height: 30 },
          }}
        />
        <AccountDetails accountBasic={account} />
        {showButtonGroup && (
          <RenderButtonGroup
            onButtonClick={handleButtonClick}
            accountBasic={account}
          />
        )}
      </Card>
    </Container>
  );
}
