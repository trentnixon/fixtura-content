import { FixturaAppShell } from "@/components/containers/AppShell";

export const ContentShell = (props) => {
  const { children, OBJ } = props;
  return (
    <FixturaAppShell OBJ={OBJ}>
      <main>{children}</main>
    </FixturaAppShell>
  );
};
 