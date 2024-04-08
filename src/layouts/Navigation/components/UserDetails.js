import { Avatar, Text } from "@mantine/core";
import {
  FindAccountLabel,
  FindAccountLogo,
  FindAccountType,
} from "@/utils/actions";
export const AccountDetails = ({ accountBasic }) => {
  if (!accountBasic) {
    throw new Error("accountBasic is null or undefined");
  }
  return (
    <>
      <Avatar
        src={FindAccountLogo(accountBasic) || ""}
        size={100}
        radius={100}
        mx="auto"
        mt={-30}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {FindAccountLabel(accountBasic) || ""}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {FindAccountType(accountBasic) || ""}
      </Text>
    </>
  );
};
