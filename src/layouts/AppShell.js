import { FixturaAppShell } from "@/components/containers/AppShell";

export const ContentShell = (props) => {
  const { children } = props;
  return (
    <FixturaAppShell>
      <main>{children}</main>
    </FixturaAppShell>
  );
};
