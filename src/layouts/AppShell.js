"use client";
import { AppShell } from "@mantine/core";
//import { NavbarMinimal } from "@/layouts/SideBarMantine";
import { HeaderMantine } from "@/layouts/HeaderMantine";
import { useParams } from "next/navigation";

export const ContentShell = ({ children, params }) => {
  const { id, render } = params;
  const URLParams = useParams();

  console.log("searchParams", URLParams.render);
  // navbar={<NavbarMinimal params={params} URLParams={URLParams}/>}
  return (
    <AppShell
      padding={0}
      header={<HeaderMantine params={params} URLParams={URLParams} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};
