import { usePathname } from "next/navigation";
import { Card, Button } from "@mantine/core";
// Import icons from Tabler Icons
import { IconCalendarEvent, IconListDetails } from "@tabler/icons-react";

// Import utility functions and components
import { BUTTON_FUNC } from "@/components/UI/buttons";
import { sportsNavConfig } from "@/layouts/Navigation/components/SportsNavConfig";

export const SideNavigationByAccount = ({
  onButtonClick,
  AccountType,
  AccountSport,
}) => {
  const pathname = usePathname() ?? "";
  const NavColors = ["green", "gray.6"];
  const variantState = ["outline", "light"];
  const renderButtonsForSport =
    sportsNavConfig[AccountSport]?.map((item) => (
      <BUTTON_FUNC
        key={item.label}
        Icon={<item.icon />}
        Label={item.label}
        onClick={() => onButtonClick(item.extension)}
        variant={
          pathname.includes(`/${item.extension}`)
            ? variantState[0]
            : variantState[1]
        }
        Color={
          pathname.includes(`/${item.extension}`) ? NavColors[0] : NavColors[1]
        }
      />
    )) ?? [];

  return (
    <Card.Section>
      <Button.Group orientation="vertical" my={10} mx={20}>
        <BUTTON_FUNC
          Icon={<IconCalendarEvent />}
          Label="Upcoming Fixtures"
          onClick={() => onButtonClick("upcoming")}
          variant={
            pathname.includes("/upcoming") ? variantState[0] : variantState[1]
          }
          Color={pathname.includes("/upcoming") ? NavColors[0] : NavColors[1]}
        />
        {AccountType === "Club" && (
          <BUTTON_FUNC
            Icon={<IconListDetails />}
            Label="Team Rosters"
            onClick={() => onButtonClick("teamroster")}
            variant={
              pathname.includes("/teamroster")
                ? variantState[0]
                : variantState[1]
            }
            Color={
              pathname.includes("/teamroster") ? NavColors[0] : NavColors[1]
            }
          />
        )}
      </Button.Group>
      <Button.Group orientation="vertical" mt={40} mb={20} mx={20}>
        {renderButtonsForSport}
      </Button.Group>
    </Card.Section>
  );
};
