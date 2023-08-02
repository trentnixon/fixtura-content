"use client";
import { AppShell } from "@mantine/core";
import { HeaderMantine } from "@/layouts/HeaderMantine";
import { useParams } from "next/navigation";
import withMobileWarning from "@/layouts/withMobileWarning";


export const ContentShell = ({ children, params }) => {
  const { id, render } = params;
  const URLParams = useParams();

  console.log("searchParams", URLParams.render);

  const Content = withMobileWarning(() => (
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
  ));

  return <Content />;
};
