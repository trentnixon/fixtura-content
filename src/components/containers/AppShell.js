"use client";
const { HeaderMantine } = require("@/layouts/HeaderMantine");
const { AppShell, Container, Grid } = require("@mantine/core");
import withMobileWarning from "@/layouts/withMobileWarning";
import { useParams } from "next/navigation";
import { UserDetailsCard } from "@/layouts/UserDetailsCard";
import { P } from "@/components/Type/Paragraph";

export const FixturaAppShell = (props) => {
  const { params, accountBasic } = props;
  const URLParams = useParams();

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
      <Container size={"xl"}>
        <Grid>
          <Grid.Col span={12} sm={4} md={3}>
            <UserDetailsCard accountBasic={accountBasic} />
           
          </Grid.Col>
          <Grid.Col span={12} sm={8} md={9}>
            <main>{props.children}</main>
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell>
  ));

  return <Content />;
};
