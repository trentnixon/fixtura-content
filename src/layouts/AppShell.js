import { FixturaAppShell } from "@/components/containers/AppShell";

export const ContentShell = (props) => {
  const { children, params, accountBasic } = props;
  return (
    <FixturaAppShell params={params} accountBasic={accountBasic}>
      <main>{children}</main>
    </FixturaAppShell>
  );
};
