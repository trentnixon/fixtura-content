"use client";
import { Image } from "@mantine/core";

export const FixturaHeaderLogo = (props) => {
  const { Logo, AccountLabel, width=40,height=40 } = props;
  return (
    <Image src={Logo} width={width} height={height} fit="contain" alt={AccountLabel} />
  );
};

export const FixturaAccountLogo = (props) => {
  const { Logo, AccountLabel } = props;
  return (
    <Image
      src={Logo}
      width={120}
      alt={AccountLabel}
      height={120}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[2],
        textAlign: "center",
        borderRadius: "100%",
      })}
      fit="contain"
    />
  );
};

export const AssetImage = ({ URL }) => {
  return (
    <Image
      src={URL}
      width={'100%'}
      alt={"Asset"}
      height={'auto'}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[2],
        textAlign: "center",
        
      })}
      fit="contain"
    />
  );
};
