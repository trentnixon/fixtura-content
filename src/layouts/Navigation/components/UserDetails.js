import { Avatar, Text } from "@mantine/core";

export const AccountDetails = ({ accountBasic }) => {
  if (!accountBasic) {
    throw new Error("accountBasic is null or undefined");
  }
  const { accountLogo, accountLabel, account_type } = accountBasic;
  return (
    <>
      <Avatar
        src={accountLogo || ""}
        size={100}
        radius={100}
        mx="auto"
        mt={-30}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {accountLabel || ""}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {account_type || ""}
      </Text>
    </>
  );
};
