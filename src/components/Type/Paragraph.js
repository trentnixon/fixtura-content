"use client";
import { Text, useMantineTheme } from "@mantine/core";

export const P = (props) => {
  const {
    fw = 400,
    fs = "normal",
    fz='md',
    tt = "",
    c = "",
    ta = "left",
    lh = "1.2",
  } = props;
  return (
    <Text fz={fz} fw={fw} fs={fs} tt={tt} c={c} ta={ta} lh={lh}>
      {props.children}
    </Text>
  );
};

export const S = (props) => {
  const { fw = 200, fs = "normal", tt = "", c = "", ta = "left" } = props;
  return (
    <Text fz="sm" fw={fw} fs={fs} tt={tt} c={c} ta={ta}>
      {props.children}
    </Text>
  );
};

export const XS = (props) => {
  const { fw = 200, fs = "normal", tt = "", c = "", ta = "left" } = props;
  return (
    <Text fz="xs" fw={fw} fs={fs} tt={tt} c={c} ta={ta}>
      {props.children}
    </Text>
  );
};

export const N = (props) => {
  const { fw = 400, fs = "normal", tt = "", c = "red", ta = "left" } = props;
  return (
    <Text fz="md" fw={fw} fs={fs} tt={tt} c={c} ta={ta}>
      {props.children}
    </Text>
  );
};

export const C = (props) =>{
  const {shade=5, fw='400'}= props
  const theme = useMantineTheme()
  return(
    <span style={{ color:theme.colors.blue[shade], fontWeight:fw }}>{props.children}</span>
  )
} ;
