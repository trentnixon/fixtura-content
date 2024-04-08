import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { BUTTON_FUNC } from "@/components/UI/buttons";
import { IconHome2 } from "@tabler/icons-react";
import { Card, Center } from "@mantine/core";

export const ReturnHomeBTN = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleReturnToRender = () => {
    if (!pathname) {
      console.warn("ReturnHomeBTN: pathname is null or undefined");
      return;
    }
    const baseUrlSegments = pathname.split("/").filter(Boolean);
    if (!baseUrlSegments) {
      console.warn("ReturnHomeBTN: baseUrlSegments is null or undefined");
      return;
    }
    const newPath = `/${baseUrlSegments.slice(0, 3).join("/")}`;
    if (!newPath) {
      console.warn("ReturnHomeBTN: newPath is null or undefined");
      return;
    }
    setTimeout(() => {
      router.push(newPath);
    }, 500);
  };

  return (
    <Center>
      <Card.Section>
        <BUTTON_FUNC
          size="sm"
          Icon={<IconHome2 />}
          Label="Back to List"
          Color="gray.8"
          onClick={handleReturnToRender}
          variant="default"
        />
      </Card.Section>
    </Center>
  );
};
