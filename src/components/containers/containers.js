"use client";
import { FindAccountLogo } from "@/utils/actions";
import { BackgroundImage, Box, Container } from "@mantine/core";

export const FixturaContainer = (props) => {
  const { children, my = 10, mx = 0, p = 0 } = props;
  return (
    <Container my={my} mx={mx} p={p} fluid={true}>
      {children}
    </Container>
  );
};

export const FixturaVideoContainer = (props) => {
  return (
    <Container my={0} mx={0} size={`xs`}>
      {props.children}
    </Container>
  );
};

export const FixturaComponent = (props) => {
  return (
    <Container mb={50} fluid={true} p={0}>
      {props.children}
    </Container>
  );
};

export const FixturaHero = (props) => {
  const { children, account } = props;
  const Logo = FindAccountLogo(account);

  return (
    <Container my={0} mx={0} p={0} fluid={true}>
      <Box
        py={60}
        sx={(theme) => ({
          background: theme.fn.linearGradient(
            45,
            theme.colors.gray[1],
            theme.colors.blue[0]
          ),
        })}
      >
        {children}
      </Box>
    </Container>
  );
};
