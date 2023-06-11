"use client";

import { Button, NavLink, useMantineTheme } from "@mantine/core";
import { IconBackspaceFilled, IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      Back
    </button>
  );
}

export function BackButton() {
  const router = useRouter();
  return <Button onClick={() => router.back()}>Back</Button>;
}

export function BackButtonAsNavLink() {
  const router = useRouter();
  const theme = useMantineTheme()
  return (
    <NavLink
      label={"Back"}
      description={""}
      icon={<IconBackspaceFilled  color={'red'} />}
      rightSection={<IconChevronLeft size="0.8rem" stroke={1.5} />}
      onClick={() => router.back()}
    />
  );
}
