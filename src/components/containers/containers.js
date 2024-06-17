"use client";
import { FindAccountLogo } from "@/utils/actions";
import { Box, Container } from "@mantine/core";

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
        py={20}
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


const sectionStyles = (theme) => ({
  backgroundColor: theme.colors.gray[1],
  fontFamily: theme.fontFamily,
  borderRadius: '0.5rem',
  borderBottom: `1px solid ${theme.colors.gray[3]}`,
  width: '100%',
});


const innerSectionStyles = (theme) => ({
  backgroundColor: "white",
  fontFamily: theme.fontFamily,
  borderRadius: "0.5rem",
  borderBottom: `1px solid ${theme.colors.gray[3]}`,
  width: "100%",
});``
export const RoundedSectionContainer = (props) => {
  const { title, topContent, bottomContent } = props;

  return (
    <>
      {title}
      <Container p={3} fluid sx={sectionStyles}>
      <Container size="xl" p={0}>
        <Wrapper px="xl">{topContent}</Wrapper>
        <RoundedBottomSection content={bottomContent} />
      </Container>
      </Container>
    </>
  );
};


const Wrapper = (props) => {
  const { px = "sm", py = "xs" } = props;
  return (
    <Container size={"lg"} px={px} py={py}>
      {props.children}
    </Container>
  );
};
const RoundedBottomSection = ({ content, className }) => (
  <Container p="xl" fluid sx={innerSectionStyles} className={className}>
    <Container size="xl" p={0}>
      {content}
    </Container>
  </Container>
);
