"use client";
import { Image } from "@mantine/core";
import { DefaultLogo } from "@/components/UI/svg";
export const FixturaHeaderLogo = (props) => {
  const { Logo, AccountLabel, width = 40, height = 40 } = props;
  return (
    <Image
      src={Logo}
      width={width}
      height={height}
      fit="cover"
      alt={AccountLabel}
      radius={100}
    />
  );
};

export const FixturaAccountLogo = (props) => {
  const { Logo, AccountLabel } = props;
  return Logo === undefined ? (
    <div style={{ width: "120px", height: "120px" }}>
      <DefaultLogo />
    </div>
  ) : (
    <Image
      src={Logo}
      fit="cover" 
      radius={100}
      width={120}
      alt={AccountLabel}
      height={120}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        textAlign: "center",
        borderRadius: "100%",
      })}
    
    />
  );
};

export const AssetImage = ({ URL }) => {
  return (
    <Image
      src={URL}
      width={"100%"}
      alt={"Asset"}
      height={"auto"}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[2],
        textAlign: "center",
      })}
      fit="contain"
    />
  );
};
